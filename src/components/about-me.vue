<template>
  <section class="w-full pt-3 md:h-[100dvh] md:-mt-18 lg:-mt-24 about-me relative snap-start" id="about">
    <div class="illustration my-auto">
      <coding-illustration
        ref="illustration"
        class="aspect-square"
        v-intersect="{
          callback: illustrationIntersect,
          once: true,
          options: { threshold: 0.8 },
        }"
      />
      <div class="flex-col pb-4 -mt-8 w-2/3 hidden md:flex text-left">
        <h2
          class="font-bold title-colors text-5xl pt-16 px-4 py-2 font-comfortaa"
        >
          Hello, I am AstralDev
        </h2>
        <span class="py-8 px-4 font-asap md:subtitle-colors">
          Fueled by a passion for web development, I am propelled by over
          <b>4</b> years of expertise in <b>full-stack development</b> and
          crafting <b>desktop applications</b> tailored for Linux.
        </span>
        <div class="px-4 md:-mt-3">
          <button
            class="border rounded-md py-2 px-4 shadow-sm flex gap-x-2 items-center text-gray-100 md:text-gray-600 dark:text-cyan-500 hover:dark:text-cyan-400 hover:dark:border-cyan-300/40 shadow-cyan-300/5 font-asap glass-border dark:border-cyan-300/20"
          >
            <font-awesome-icon icon="fa-solid fa-cloud-arrow-down" />
            My Resume
          </button>
        </div>
      </div>
    </div>
    <div
      class="p-4 flex items-center flex-col -mt-20 md:mt-0 rounded-t-2xl bg-gradient-to-b from-cst-cyan to-cst-cyan/75 dark:from-cst-cyan/40 dark:to-cst-cyan/[.35] md:bg-none justify-center"
    >
      <div class="flex flex-col pb-4 md:hidden text-center">
        <h2
          class="font-bold text-2xl pt-16 px-4 py-2 text-white font-comfortaa"
        >
          Hello, I am AstralDev
        </h2>
        <span class="py-8 px-4 font-asap text-slate-200 md:subtitle-colors">
          Fueled by a passion for web development, I am propelled by over
          <b>4</b> years of expertise in <b>full-stack development</b> and
          crafting <b>desktop applications</b> tailored for Linux.
        </span>
        <div class="mx-auto">
          <button
            class="border rounded-md py-2 px-4 shadow-sm flex gap-x-2 items-center text-gray-300 border-gray-400 hover:text-gray-100 hover:border-gray-300/80 md:text-gray-600 md:hover:text-gray-400 shadow-gray-300/10 font-asap dark:border-gray-200/50"
          >
            <font-awesome-icon icon="fa-solid fa-cloud-arrow-down" />
            My Resume
          </button>
        </div>
      </div>
    </div>
    <div class="absolute border flex md:hidden rounded-full inset-x-6 bottom-1 h-px opacity-90 border-dashed border-gray-300/20 dark:glass-border"></div>
  </section>
</template>

<script>

import CodingIllustration from "../assets/coding-illustration.svg?component";
import anime from "animejs";

export default {
  components: { CodingIllustration },
  mounted() {
    const el = this.$el.querySelector(".illustration");
    el.style.opacity = 0;
  },
  methods: {
    illustrationIntersect() {
      const svg = this.$el.querySelector(".illustration");
      svg.style.opacity = 1;

      const timeline = anime.timeline({
        easing: "spring(1,80,10,0)",
        duration: 1500,
      });
      timeline.add({
        targets: [
          svg.querySelector("g#backdrop"),
          svg.querySelector("g#person"),
          svg.querySelector("g#bottom-obj"),
          svg.querySelector("g#top-obj"),
        ],
        keyframes: [
          {
            translateY: "-5%",
            delay: 0,
            opacity: 0,
            duration: 0,
          },
          {
            opacity: 1,
            translateY: 0,
            delay: anime.stagger(250, { start: 100 }),
          },
        ],
      });
    },
  },
};
</script>
<style lang="sass" scoped>
.see-more
  @apply underline mx-auto underline-offset-4 hover:text-slate-100 text-center decoration-dotted font-ubuntu-mono text-slate-300

.about-me
  @apply flex flex-col

  &>.illustration
    @apply w-full flex flex-row items-center

    &>svg
      @apply order-1 w-full md:w-1/3 z-10 flex-grow
</style>
