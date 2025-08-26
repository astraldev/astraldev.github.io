import type { Timeline, TextSplitter, AnimationParams } from "animejs";
import { createTimeline, text, stagger } from "animejs";

export type TypedSplitOptions = {
  strings: string[] | string
  typeDuration?: number
  deleteDuration?: number
  pauseBetween?: number
  backspace?: boolean
  initialDelay?: number
  autoPlay?: boolean
  loop?: boolean
};

export function useTyped(
  target: MaybeRef<HTMLElement | null>,
  options: TypedSplitOptions,
) {
  const opts = {
    strings: Array.isArray(options.strings) ? options.strings : [options.strings],
    typeDuration: options.typeDuration ?? 600,
    deleteDuration: options.deleteDuration ?? 400,
    pauseBetween: options.pauseBetween ?? 800,
    backspace: options.backspace ?? true,
    loop: options.loop ?? true,
    autoPlay: options.autoPlay ?? true,
    initialDelay: options.initialDelay ?? 0,
  };

  let destroyed = false;

  let activeTl: Timeline;
  let activeSplit: TextSplitter;

  const isRunning = ref(false);

  async function typeBackspacePhrase(target: HTMLElement) {
    const tl = createTimeline();

    const split = text.split(target, { chars: true });
    const chars = split.chars;

    const enterAnimation: AnimationParams = {
      z: 0,
      opacity: { from: 0 },
      filter: { from: "blur(2px)" },
      x: [10, -10, 0],
      ease: "outSine",
    };
    const leaveAnimation: AnimationParams = {
      z: 0,
      opacity: { to: 0 },
      filter: { to: "blur(2px)" },
      x: [0, 10],
      ease: "outBounce",
    };

    // Typing in (fade in chars)
    tl.add(chars, enterAnimation, stagger(opts.typeDuration / chars.length));

    // Pause
    tl.add({}, {}, opts.typeDuration + opts.pauseBetween);

    // Backspace (fade out if desired)
    if (opts.backspace) {
      tl.add(chars, leaveAnimation, stagger(opts.deleteDuration / chars.length, { from: "last" }));
    }

    tl.init();

    activeTl = tl;
    activeSplit = split;

    return tl.then().then(() => split.revert());
  }

  async function runLoop() {
    const elm = unref(target);
    if (!elm) return;

    isRunning.value = true;
    const stringSeq = Array.isArray(options.strings) ? options.strings : [options.strings];

    if (opts.initialDelay)
      await waitTime(opts.initialDelay);

    do {
      for (const phrase of stringSeq) {
        if (destroyed) return;
        elm.innerHTML = phrase;
        await typeBackspacePhrase(elm).catch();
      }
    } while (opts.loop && !destroyed);
    isRunning.value = false;
  }

  async function start() {
    await nextTick();
    if (!unref(target) || isRunning.value) return;
    destroyed = false;
    runLoop();
  }

  function stop() {
    activeTl && activeTl.revert();
    activeSplit && activeSplit.revert();
    destroyed = true;
  }

  if (options.autoPlay) {
    watch(
      () => unref(target),
      () => {
        stop();
        start();
      },
    );
  }

  onBeforeUnmount(stop);

  return { start, stop, isRunning };
}
