<template>
  <section
    id="about"
    class="w-full pt-3 md:h-[63dvh] md:mb-44 md:-mt-18 lg:-mt-24 about-me relative snap-center"
  >
    <div
      ref="illustration"
      class="illustration my-auto"
    >
      <CodingIllustration
        v-intersect="{
          callback: animationSequence,
          once: true,
          options: { threshold: 0.8 },
        }"
        class="aspect-square"
      />

      <div class="flex-col pb-4 -mt-8 md:w-2/3 md:flex text-left">
        <h1 class="font-bold title-colors text-5xl pt-16 py-2 font-zain">
          Hello, I am AstralDev
        </h1>
        <p
          class="py-4 font-comfortaa subtitle-colors"
          v-html="aboutMeText"
        />
        <div class="md:mt-4">
          <button
            class="border rounded-md py-2 px-4 shadow-sm flex gap-x-2 items-center text-gray-600 dark:text-cyan-500 hover:dark:text-cyan-400 hover:dark:border-cyan-300/40 shadow-cyan-300/5 font-asap glass-border dark:border-cyan-300/20"
          >
            My Resume
          </button>
        </div>
      </div>
    </div>

    <div
      class="absolute border flex md:hidden rounded-full inset-x-6 bottom-1 h-px opacity-90 border-dashed border-gray-300/20 dark:glass-border"
    />
  </section>
</template>

<script setup lang="ts">
import { createTimeline, stagger } from "animejs";
import CodingIllustration from "~/assets/illustrations/programming.svg";
import { about as aboutMeText } from "~/data/data.json";
import { useTemplateRef } from "vue";

const illustrationElm = useTemplateRef("illustration");

const animationSequence = () => {
  const timeline = createTimeline({
    playbackEase: "outExpo",
    duration: 1750,
  });

  const svg = illustrationElm.value;
  if (!svg) return;

  const targets = [
    svg.querySelector("g#backdrop"),
    svg.querySelector("g#person"),
    svg.querySelector("g#bottom-obj"),
    svg.querySelector("g#top-obj"),
  ];

  timeline.add(targets, {
    opacity: [0, 1],
    translateY: ["5%", "0%"],
    ease: "out(3)",
  }, stagger(500, { start: 250 }));
};
</script>

<style lang="css" scoped>
@reference "~/assets/css/tailwind.css";

.see-more {
  @apply underline mx-auto underline-offset-4 hover:text-slate-100 text-center;
  @apply decoration-dotted font-mono text-slate-300;
}

.about-me {
  @apply flex flex-col max-w-7xl mx-auto;

  >.illustration {
    @apply w-full flex flex-col md:flex-row items-center;
  }
}

:deep(svg) {
  @apply md:order-1 w-full md:w-1/3 z-10 flex-grow;

  >g {
    opacity: 0;
  }
}
</style>
