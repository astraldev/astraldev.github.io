import type { ScrambleTextParams } from "animejs";

export type TypedSplitOptions = {
  strings: string[] | string
  /** Characters cycled while a glyph is still scrambling. Named animejs sets: 'blocks', 'shades', 'braille', ... */
  chars?: ScrambleTextParams["chars"]
  /** Where the reveal wave starts from. */
  from?: ScrambleTextParams["from"]
  /** Characters per second entering the active zone. */
  revealRate?: number
  /** Time in ms each character spends scrambling before settling. */
  settleDuration?: number
  /** How many times per second scramble characters cycle. */
  settleRate?: number
  /** Random timing offset per character, for a less mechanical reveal. */
  perturbation?: number
  /** Idle time in ms on a settled phrase before moving to the next. */
  pauseBetween?: number
  initialDelay?: number
  autoPlay?: boolean
  loop?: boolean
};

export function useTyped(
  target: MaybeRef<HTMLElement | null>,
  options: TypedSplitOptions,
) {
  const strings = Array.isArray(options.strings) ? options.strings : [options.strings];

  const opts = {
    chars: options.chars ?? "shades",
    from: options.from ?? "left",
    revealRate: options.revealRate ?? 34,
    settleDuration: options.settleDuration ?? 420,
    settleRate: options.settleRate ?? 24,
    perturbation: options.perturbation ?? 0.7,
    pauseBetween: options.pauseBetween ?? 1600,
    initialDelay: options.initialDelay ?? 0,
    loop: options.loop ?? true,
  };

  const index = ref(0);
  const isRunning = ref(options.autoPlay ?? true);

  let queued: ReturnType<typeof setTimeout> | undefined;

  function clearQueued() {
    if (queued) clearTimeout(queued);
    queued = undefined;
  }

  function advance() {
    const last = index.value === strings.length - 1;
    if (last && !opts.loop) {
      isRunning.value = false;
      return;
    }
    index.value = (index.value + 1) % strings.length;
  }

  const animation = useScrambleText(
    () => (isRunning.value ? unref(target) : null),
    () => ({
      // Only the very first phrase waits; later ones are paced by `pauseBetween`.
      delay: index.value === 0 ? opts.initialDelay : 0,
      onComplete: () => {
        clearQueued();
        queued = setTimeout(advance, opts.pauseBetween);
      },
    }),
    () => ({
      text: strings[index.value],
      chars: opts.chars,
      from: opts.from,
      revealRate: opts.revealRate,
      settleDuration: opts.settleDuration,
      settleRate: opts.settleRate,
      perturbation: opts.perturbation,
    }),
  );

  function start() {
    isRunning.value = true;
  }

  function stop() {
    clearQueued();
    isRunning.value = false;
  }

  tryOnScopeDispose(clearQueued);

  return { start, stop, isRunning, animation };
}
