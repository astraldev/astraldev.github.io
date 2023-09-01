<template>
  <section
    class="flex flex-col w-full p-4 col-start-1 row-start-1 md:bg-none bg-gradient-to-b from-cst-cyan/50 to-cst-cyan/40 dark:from-cst-cyan/30 dark:to-cst-cyan/[.25]"
    id="projects"
  >
    <div
      class="flex justify-between pb-4 px-1 items-center text-white md:title-colors"
    >
      <h2 class="text-lg md:text-2xl font-bold font-comfortaa">Projects</h2>
      <font-awesome-icon icon="fa-solid fa-link" class="heading-icon" />
    </div>
    <div
      class="flex flex-col gap-2 no-scrollbar"
    >
      <div
        v-for="(project, index) in projects"
        class="project flex gap-x-2 w-full h-full ml-0 flex-row opacity-0 group"
        :key="index"
        v-intersect="{
          callback: slideIn,
          once: true,
          options: { threshold: 0.3 },
        }"
      >
        <div
          class="h-auto w-fit py-0 px-2 flex flex-col items-center gap-2"
        >
          <span class="h-3 w-0.5 glass-line"></span>
          <span class="h-2 aspect-square rounded-full glass-line"></span>
          <span class="w-0.5 h-full glass-line"></span>
        </div>
        <a
          :href="project.link"
          class="p-4 pt-2 after:blur-sm bg-gray-300/10 justify-between flex flex-col h-full after:absolute relative overflow-hidden after:inset-0 after:-z-[1] group-hover:bg-gray-300/20 transition-colors duration-200 md:group-hover:bg-gray-300/40 md:dark:group-hover:bg-gray-600/20 md:bg-gray-300/30 dark:bg-gray-600/10 rounded-md w-full"
        >
          <div class="flex flex-col">
            <span
              class="text-sm font-semibold flex justify-between items-center font-comfortaa px-1 pt-1 text-white md:text-gray-500 dark:text-gray-300"
              >{{ project.name }}
              <span v-for="language in project.languages" class="">
                <i v-if="language === 'csharp'">
                  <CSharp class="h-6 w-6" />
                </i>
                <font-awesome-icon
                  v-else
                  :icon="`${language}`"
                  class="h-6 w-6"
                />
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
  </section>
</template>
<script>
import { projects } from "../data.json";
import anime from "animejs";
import CSharp from "../assets/csharp.svg";

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
