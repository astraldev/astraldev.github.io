<template>
  <div
    class="flex flex-col md:flex-row gap-2 no-scrollbar md:overflow-y-hidden md:overflow-x-auto"
  >
    <a
      v-for="(work, index) in workDescriptions"
      class="flex gap-x-2 ml-2 md:ml-0 flex-row md:flex-col opacity-0 group"
      :key="index"
      v-intersect="{
        callback: slideIn,
        once: true,
        options: { threshold: 0.3 },
      }"
    >
      <div
        class="h-auto w-fit py-0 px-2 md:px-0 flex flex-col items-center md:h-fit md:w-full md:py-1 gap-2 md:flex-row"
      >
        <span class="h-[15%] w-0.5 md:w-[15%] md:h-0.5 glass-line"></span>
        <span class="h-2 w-2 aspect-square rounded-full glass-line"></span>
        <span class="w-0.5 h-full md:w-full md:h-0.5 glass-line"></span>
      </div>
      <div
        class="pb-4 pt-2 px-4 bg-gray-300/10 md:bg-gray-300/30 dark:bg-gray-600/10 rounded-md w-full md:w-fit"
      >
        <span
          class="text-sm font-asap px-1 text-gray-200 md:text-gray-500 dark:text-gray-300"
          >{{ work.description }} at
          <span class="role">{{ work.name }}</span></span
        >
        <img
          :src="work.image"
          :alt="work.name"
          class="h-40 aspect-video rounded-md mt-2"
        />
      </div>
    </a>
  </div>
</template>
<script>
import { works } from "../data.json";
import anime from "animejs";

export default {
  data() {
    return {
      workDescriptions: works instanceof Array ? works : [],
    };
  },
  methods: {
    slideIn(el) {
      const index =
        Array.prototype.slice.call(el.parentNode.children).indexOf(el) + 1;
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
