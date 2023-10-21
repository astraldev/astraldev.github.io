<template>
  <section
    class="flex flex-col md:w-fit md:min-w-[350px] md:order-1 w-full p-4 md:bg-none bg-gradient-to-b from-cst-cyan/75 to-cst-cyan/60 dark:from-cst-cyan/[.35] dark:to-cst-cyan/30"
    :id="noId !== undefined ? '' : 'work-seperate'"
  >
    <div
      class="flex justify-between pb-4 px-1 top-0 items-center text-white md:title-colors"
    >
      <h2 class="text-lg md:text-2xl font-bold font-comfortaa">My Works</h2>
      <font-awesome-icon icon="fa-solid fa-link" class="heading-icon" />
    </div>
    <div class="works-container max-h-[100%] no-scrollbar">
      <a
        v-for="(work, index) in workDescriptions"
        class="h-auto md:h-fit flex gap-x-2 ml-0 flex-row opacity-0 group snap-center"
        :key="index"
        v-intersect="{
          callback: slideIn,
          once: true,
          options: { threshold: 0.3 },
        }"
      >
        <div class="h-auto w-fit py-0 px-2 md:hidden flex flex-col items-center gap-2">
          <span class="h-3 w-0.5 glass-line"></span>
          <span class="h-2 w-2 aspect-square rounded-full glass-line"></span>
          <span class="w-0.5 h-full glass-line"></span>
        </div>
        <div
          class="work-description-container pb-4 pt-2 px-4 flex flex-col lg:pt-4 bg-gray-300/10 md:bg-gray-300/30 dark:bg-gray-600/10 rounded-md w-full"
        >
          <div class="work-description flex flex-col justify-start">
            <span
              >{{ work.description }} at <span class="role">{{ work.name }}</span></span
            >
          </div>
          <img
            :src="work.image"
            :alt="work.name"
            class="w-full max-h-48 aspect-video dark:mix-blend-darken rounded-md mt-2 lg:mt-0 object-cover"
          />
        </div>
      </a>
    </div>
  </section>
</template>
<script>
import { works } from "../data.json";
import anime from "animejs";

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ["noId"],
  data() {
    return {
      workDescriptions: works instanceof Array ? works : [],
    };
  },
  methods: {
    slideIn(el) {
      const index = Array.prototype.slice.call(el.parentNode.children).indexOf(el) + 1;
      anime({
        targets: el,
        keyframes: [
          {
            opacity: 0,
            translateY: "100%",
            duration: 0,
            delay: 0,
          },
          {
            opacity: 1,
            translateY: 0,
            delay: index * 120,
            duration: 530,
            easing: "easeOutElastic(1, .6)",
          },
        ],
      });
    },
  },
};
</script>
<style lang="sass" scoped>
.works-container
  @apply  lg:[grid-template-columns:repeat(auto-fill,minmax(280px,500px))]
  @apply flex lg:grid flex-col gap-2 snap-y snap-mandatory md:rounded-md overflow-x-hidden md:overflow-y-auto md:overflow-x-auto
.work-description
  @apply text-sm font-asap px-1 mb-2 lg:text-center text-gray-200 md:text-gray-500 dark:text-gray-300
</style>
