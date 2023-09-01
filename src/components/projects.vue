<template>
  <div
    class="flex flex-col md:grid grid-cols-3 md:gap-x-2 md:gap-0 gap-2 no-scrollbar"
  >
    <div
      v-for="(project, index) in projects"
      class="project flex gap-x-2 w-full h-full ml-0 flex-row md:flex-col opacity-0 group"
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
        <span class="h-3 w-0.5 md:w-[15%] md:h-0.5 glass-line"></span>
        <span class="h-2 w-2 aspect-square rounded-full glass-line"></span>
        <span class="w-0.5 h-full md:w-full md:h-0.5 glass-line"></span>
      </div>
      <a
        :href="project.link"
        class="p-4 pt-2 after:blur-sm bg-gray-300/10 justify-between flex flex-col h-full after:absolute relative overflow-hidden after:inset-0 after:-z-[1] group-hover:bg-gray-300/20 transition-colors duration-200 md:group-hover:bg-gray-300/40 md:dark:group-hover:bg-gray-600/20 md:bg-gray-300/30 dark:bg-gray-600/10 rounded-md w-full md:w-auto"
      >
        <div class="flex flex-col">
          <span
            class="text-sm font-semibold flex justify-between items-center font-comfortaa px-1 pt-1 text-white md:text-gray-500 dark:text-gray-300"
            >{{ project.name }}
            <span v-for="language in project.languages" class="">
              <i v-if="language === 'csharp'">
                <CSharp class="h-6 w-6" />
              </i>
              <font-awesome-icon v-else :icon="`${language}`" class="h-6 w-6"/>
            </span>
          </span>
          <span
            class="text-sm flex font-asap px-1 text-gray-100 pt-1 md:text-gray-400 dark:text-gray-300"
            >{{ project.description }}</span
          >
        </div>
      </a>
    </div>
  </div>
</template>
<script>
import { projects } from "../data.json";
import anime from "animejs";
import CSharp from "../assets/csharp.svg"

export default {
  data() {
    return {
      projects: projects instanceof Array ? projects : [],
    };
  },
  components: { CSharp },
  methods: {
    slideIn(el) {
      const index =
        Array.prototype.slice.call(el.parentNode.children).indexOf(el) + 1;
      anime({
        targets: el,
        keyframes: [
          {
            opacity: 0,
            translateY: "50%",
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
div.project
    &:nth-child(odd) > a::after
        @apply bg-gradient-to-tr from-transparent to-transparent via-cst-green/5
    &:nth-child(even) > a::after
        @apply bg-gradient-to-tr from-transparent to-transparent via-cst-cyan/5
</style>
