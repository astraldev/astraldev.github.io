<template>
  <section class="w-full mt-5 md:min-h-[100dvh] about-me snap-start" id="about">
    <div class="illustration">
      <coding-illustration
        ref="illustration"
        :class="`aspect-square`"
        v-intersect="{
          callback: illustrationIntersect,
          once: true,
          options: { threshold: 0.6 },
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
      </div>
    </div>
    <div
      class="p-4 flex items-center flex-col -mt-20 md:mt-0 rounded-t-2xl bg-gradient-to-b from-cst-cyan dark:from-cst-cyan/40 dark:to-cst-cyan/20 to-cst-cyan/50 md:bg-none justify-center"
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
      </div>
      <div class="flex flex-col w-full" id="works">
        <div
          class="flex justify-between pb-4 px-1 items-center text-white md:title-colors"
        >
          <h2 class="text-lg md:text-2xl font-bold font-comfortaa">My Works</h2>
          <font-awesome-icon icon="fa-solid fa-link" class="heading-icon" />
        </div>
        <timeline />
      </div>
    </div>
  </section>
</template>

<script>
import CodingIllustration from "../assets/coding-illustration.svg?component";
import anime from "animejs";
import Timeline from "./timeline.vue";

export default {
  components: { CodingIllustration, Timeline },
  mounted() {
    const el = this.$el.querySelector(".illustration");
    el.style.opacity = 0;
  },
  methods: {
    illustrationIntersect(el) {
      const svg = this.$el.querySelector(".illustration");
      svg.style.opacity = 1;
      const timeline = anime.timeline({
        easing: "spring(1,80,10,0)",
        duration: 1500,
      });
      timeline.add({
        targets: [
          el.querySelector("g#backdrop"),
          el.querySelector("g#person"),
          el.querySelector("g#bottom-obj"),
          el.querySelector("g#top-obj"),
        ],
        keyframes: [
          {
            translateY: "-15%",
            delay: 0,
            duration: 0,
          },
          {
            opacity: 1,
            translateY: 0,
            delay: anime.stagger(250, { start: 150 }),
          },
        ],
      });
    },
  },
};
</script>
<style lang="sass" scoped>
.heading-icon
  @apply text-slate-200 md:text-current cursor-pointer hover:text-slate-50
.see-more
  @apply underline mx-auto underline-offset-4 hover:text-slate-100 text-center decoration-dotted font-ubuntu-mono text-slate-300

.about-me
  @apply flex flex-col

  &>.illustration
    @apply w-full flex flex-row items-center

    &>svg
      @apply order-1 w-full md:w-1/3 z-10 flex-grow
</style>
