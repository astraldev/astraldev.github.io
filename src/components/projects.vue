<template>
  <section
    class="flex flex-col w-full p-4 col-start-1 row-start-1 md:bg-none bg-gradient-to-b from-cst-cyan/60 to-cst-cyan/50 dark:from-cst-cyan/30 dark:to-cst-cyan/[.25]"
    :id="noId !== undefined ? '' : 'projects'"
  >
    <div class="flex justify-between pb-4 px-1 items-center text-white md:title-colors">
      <h2 class="text-lg md:text-2xl font-bold font-comfortaa">Projects</h2>
      <font-awesome-icon icon="fa-solid fa-link" class="heading-icon" />
    </div>
    <div class="flex flex-col gap-2 no-scrollbar">
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
        <div class="h-auto w-fit py-0 px-2 flex flex-col items-center gap-2">
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
              <span class="flex ml-auto gap-3">
                <span
                  v-for="(language, languageIndex) in project.languages"
                  :key="`project--language-${language}--index-${languageIndex}`"
                >
                  <i v-if="language === 'csharp'">
                    <CSharp class="h-6 w-6" />
                  </i>
                  <font-awesome-icon
                    v-else
                    :icon="`${language}`"
                    :flip="
                      project.featured && languageIndex === project.languages.length - 1
                    "
                    class="h-6 w-6"
                  />
                </span>
              </span>
            </span>
            <span
              class="text-sm flex font-asap px-1 text-gray-100 pt-1 md:text-gray-400 dark:text-gray-300"
              >{{ project.description }}</span
            >
          </div>
          <span
            class="featured-project"
            v-if="project.featured"
            v-anime="getFeaturedAnimationOptions"
          ></span>
        </a>
      </div>
    </div>

    <div
      class="p-2 mx-auto mt-3 gap-2 flex items-center text-gray-200 md:text-gray-500 dark:text-gray-200 hover:text-gray-100 md:mr-0"
    >
      <a href="https://github.com/astraldev?tab=repositories">
        <font-awesome-icon :icon="['fab', 'github']" /> See more at GitHub
      </a>
    </div>
  </section>
</template>
<script>
import { projects } from "../data.json";
import anime from "animejs";
import CSharp from "../assets/csharp.svg";

export default {
  // eslint-disable-next-line vue/require-prop-types
  props: ["noId"],
  data() {
    let projects_ = projects instanceof Array ? projects : [];
    projects_ = projects_.slice().reverse();

    return {
      projects: projects_,
      startAnimation: false,

      featuredCount: 0,
    };
  },
  components: { CSharp },
  computed: {
    getFeaturedAnimationOptions() {
      const featuredAnimationOptions = {
        keyframes: [{ left: "-10%" }, { left: "125%" }],
        delay: this.featuredCount * 150,
        duration: 1550,
        endDelay: 1000,
        direction: "normal",
        easing: "linear",
        loop: true,
      };

      this.updateFeaturedCount();

      return featuredAnimationOptions;
    },
  },
  methods: {
    updateFeaturedCount() {
      this.featuredCount += 1;
    },
    slideIn(el) {
      const index = Array.prototype.slice.call(el.parentNode.children).indexOf(el) + 1;
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

.featured-project
  background: linear-gradient(to right, transparent 0%, rgba(255, 255, 255, 0.1) 45%, rgba(255, 255, 255, 0.2) 50%, rgba(255, 255, 255, 0.1) 55%, transparent 100%)
  @apply absolute w-20 -inset-y-2 -skew-x-[30deg] -translate-x-[65px] -left-[10%] opacity-30
</style>
