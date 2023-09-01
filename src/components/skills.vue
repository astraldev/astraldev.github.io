<template>
  <section
    class="flex flex-col md:mt-10 w-full pb-5 md:grid md:grid-cols-2 md:h-[70vh] items-start md:gap-x-10 place-items-center"
    id="skills"
  >
    <div
      class="bg-gradient-to-b from-cst-cyan/50 dark:from-cst-cyan/20 md:bg-none h-full flex w-full flex-col gap-y-10 md:w-full"
    >
      <h2
        class="text-heading hidden title-colors ml-4 md:flex justify-between items-center"
      >
        Languages I speak
        <font-awesome-icon
          icon="fa-solid fa-link"
          class="text-slate-200 md:text-current cursor-pointer hover:text-slate-50 h-6 w-6"
        />
      </h2>
      <div class="relative">
        <programming-illustration
          class="programming aspect-square mix-blend-darken dark:mix-blend-difference -mt-4 md:-mt-14 md:w-[35vmax] z-[-1] inset-0 -right-[5vh]"
          v-intersect="{
            callback: animateIllustration,
            once: true,
            options: { threshold: 0.5 },
          }"
        />
      </div>
    </div>
    <div
      class="w-11/12 self-start mb-auto md:justify-between mx-auto md:mr-0 md:w-full"
      ref="languages"
    >
      <h3
        class="text-heading md:hidden mx-auto text-center -mt-10 pb-10 dark:text-white"
      >
        Languages I Speak
      </h3>
      <div
        v-for="(title, index) in Object.keys(languageUsed)"
        :key="index"
        class="language-details"
      >
        <details>
          <summary @click.prevent="detailToggled" @keyup.space="detailToggled">
            <div>
              <font-awesome-icon :icon="`${languageUsed[title]['icon']}`" />
              <h2>{{ title }}</h2>
              <font-awesome-icon
                icon="fa-solid fa-caret-down"
                class="ml-auto"
              />
            </div>
          </summary>
          <ul>
            <li
              v-for="(name, index) in languageUsed[title]['language']"
              :key="index"
            >
              {{ name }}
            </li>
          </ul>
        </details>
      </div>
    </div>
  </section>
</template>
<script>
import ProgrammingIllustration from "../assets/programming-language.svg";
import anime from "animejs";
import { languages } from "../data.json";
export default {
  components: { ProgrammingIllustration },
  data() {
    return {
      languageUsed: languages,
    };
  },
  mounted() {
    this.$el.querySelector("g#background").style.transformOrigin = "center";
    const details = [...this.$el.querySelectorAll("details")];
    details.slice(0, 2).forEach((dt) => (dt.open = true));
    const el = this.$el.querySelector("svg.programming");
    el.style.opacity = 0;
  },
  methods: {
    closeDetail(el) {
      const ul = el.querySelector("ul");
      const childrenCount = ul.children.length;
      anime({
        targets: ul,
        height: 0,
        duration:
          childrenCount > 3 ? 3500 / childrenCount : 1000 / childrenCount,
        delay: 100 / childrenCount,
        easing: "easeInOutQuad",
        complete: () => {
          el.open = false;
        },
      });
    },
    openDetail(el) {
      const ul = el.querySelector("ul");
      ul.style.height = 0;
      const childrenCount = ul.children.length;
      el.open = true;
      anime({
        targets: ul,
        keyframes: [
          {
            height: 0,
            delay: 0,
            duration: 0,
          },
          {
            height: `${1.75 * childrenCount}rem`,
            duration: 1000 / childrenCount,
            easing: "easeOutCubic",
            delay: 100 / childrenCount,
          },
        ],
      });
    },
    closeOtherDetails(keep) {
      const details = this.$el.querySelectorAll(".language-details > details");
      details.forEach((dt) => {
        if (dt != keep) this.closeDetail(dt);
      });
    },
    detailToggled(ev) {
      const detail_el = ev.currentTarget.parentNode;
      //NOTE: Not used due to UI effects.
      //Dear Future Me: Uncomment this line to enable closing of other details
      // this.closeOtherDetails(detail_el)
      if (!detail_el.open) this.openDetail(detail_el);
      else this.closeDetail(detail_el);
    },

    animateIllustration() {
      const el = this.$el.querySelector("svg.programming");
      el.style.opacity = 1;
      const timeline = anime.timeline({
        easing: "spring(1,80,10,0)",
        delay: 100,
      });
      timeline.add({
        targets: "g#background",
        keyframes: [
          {
            translateY: "-5%",
            scale: 1.5,
            opacity: 0,
            delay: 0,
            duration: 0,
          },
          {
            translateY: 0,
            opacity: 0.3,
            scale: 1,
            duration: 800,
          },
        ],
        delay: 0,
      });
      timeline.add(
        {
          targets: "g.leafs",
          keyframes: [
            {
              translateY: "-2%",
              opacity: 0,
              delay: 0,
              duration: 0,
            },
            {
              translateY: 0,
              opacity: 1,
              delay: anime.stagger(100, { start: 0 }),
              duration: 500,
            },
          ],
        },
        "-=200"
      );
      timeline.add({
        targets: "g#pc-screen",
        keyframes: [
          {
            translateY: "-5%",
            opacity: 0,
            delay: 0,
            duration: 0,
          },
          {
            translateY: 0,
            opacity: 1,
            delay: anime.stagger(200, { start: 0 }),
            duration: 800,
          },
        ],
      });
      timeline.add(
        {
          targets: "g.screen-item",
          keyframes: [
            {
              translateY: "-10%",
              opacity: 0,
              delay: 0,
              duration: 0,
            },
            {
              translateY: 0,
              opacity: 1,
              delay: anime.stagger(100, { start: 0 }),
              duration: 600,
            },
          ],
          complete: () => {
            anime({
              targets: "g.screen-item",
              translateY: ["0px", "-1%"],
              loop: true,
              easing: "linear",
              duration: 650,
              direction: "alternate",
              delay: anime.stagger(350, { start: 0 }),
            });
          },
        },
        "-=600"
      );
    },
  },
};
</script>
<style lang="sass" scoped>

details
  @apply border dark:border-zinc-400/20 border-gray-300 rounded-md my-4 first:mt-0
  &[open]>summary
    @apply border-b-2 border-gray-200 dark:border-zinc-400/20
  &>summary
    @apply flex px-6 py-2 cursor-pointer
    &::-webkit-details-marker, &::marker
      display: none
    &>div
      @apply flex items-center w-full text-gray-700 gap-x-4 dark:text-gray-300
  &>ul
    @apply flex flex-col divide-y divide-gray-200 dark:divide-zinc-400/10 overflow-y-clip
    &>li
      @apply w-full px-6 hover:bg-gray-50 dark:hover:bg-white/5 cursor-pointer text-xs text-gray-500 dark:text-gray-400 font-comfortaa py-1.5

g.screen-item, g#pc-screen, g#background, g.leafs
  @apply opacity-0
</style>
