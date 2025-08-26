<template>
  <section
    class="flex flex-col h-[calc(100dvh_-_3.6rem)] relative pt-[3rem] md:flex-row w-full items-center snap-center justify-center"
  >
    <div
      ref="logo"
      class="aspect-square my-2 h-1/3 md:h-auto md:-mt-12 md:w-1/3 grid place-items-center"
    >
      <Logo class="aspect-square h-44 md:h-72 w-full" />
    </div>
    <div class="flex flex-col md:mt-[5vmax] px-4">
      <div class="h-fit flex flex-col">
        <h2
          ref="header"
          class="text-heading text-6xl lg:text-7xl 2xl:text-8xl lg:leading-none overflow-clip md:my-0 md:h-fit md:block inline text-center dark:text-white mb-5 origin-top"
        >
          Web & Software Developer
        </h2>
      </div>

      <div
        ref="caption"
        class="h-[calc((0.875rem_+_1.25rem)*2)] text-center lg:text-xl mx-4 text-gray-500 dark:text-gray-300 p-2 relative"
      >
        <span class="inline absolute top-0 w-full right-0">
          <span
            v-once
            ref="typed"
            class="font-mono inline"
          />
        </span>
      </div>

      <div>
        <a
          href="#work-seperate"
          class="get-in-touch"
        >
          Blog
        </a>
        <a
          href="#work-seperate"
          class="get-in-touch"
        >
          My Works
        </a>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Logo from "~/assets/icons/logo.svg";
import { createTimeline } from "animejs";
import { thingsIDo } from "~/data/data.json";

const logoRef = useTemplateRef("logo");
const headerRef = useTemplateRef("header");
const captionRef = useTemplateRef("caption");

useTyped(
  useTemplateRef("typed"),
  {
    strings: thingsIDo,
    initialDelay: 2600,
    backspace: true,
    deleteDuration: 2000,
    typeDuration: 1000,
    pauseBetween: 3500,
    autoPlay: true,
    loop: true,
  },
);

const sequenceAnimation = async () => {
  await nextTick();

  const targets = {
    logo: logoRef.value,
    header: headerRef.value,
    caption: captionRef.value,
  };

  const timeline = createTimeline({
    playbackEase: "outQuad",
    duration: 5,
  });

  targets.logo
  && timeline.add(targets.logo, {
    y: { from: "50%", to: 0 },
    scale: { from: 1.75, to: 1 },
    opacity: { from: 0.35, to: 1 },
    ease: "out",
  });

  targets.header
  && timeline.add(targets.header, {
    scaleY: { from: "0" },
    opacity: [0, 1],
  });

  targets.caption
  && timeline.add(targets.caption, {
    translateX: ["50%", 0],
    opacity: [0, 1],
  });

  timeline.add(".get-in-touch", {
    opacity: [0, 1],
  });

  timeline.play();
};

onMounted(sequenceAnimation);
</script>

<style lang="css" scoped>
@reference "~/assets/css/tailwind.css";

.floating-theme-switcher {
  @apply fixed right-4 md:right-14 lg:right-24 bottom-4 p-3 backdrop-blur-sm z-50 grid place-items-center aspect-square rounded-full border shadow;
  @apply bg-gray-200/30 dark:bg-gray-400/20 border-gray-200/80 dark:border-gray-400/30 dark:md:bg-gray-800/30 dark:md:border-gray-800/60;
}

.theme-switcher-control {
  @apply text-gray-400 dark:text-white transition-colors duration-100;
}

.theme-switcher-control.over-colored {
  @apply text-white;
}

.get-in-touch {
  @apply opacity-0 text-gray-400 dark:text-gray-300 px-5;
  @apply mx-auto font-zain font-extrabold uppercase relative py-3;

  @apply after:absolute after:border after:bg-white/5 after:inset-0 after:glass-border after:rounded-xl;
  @apply hover:after:blur-none after:transition-all after:scale-y-0 hover:after:scale-y-100 after:duration-300;
}
</style>
