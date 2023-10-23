<template>
  <section
    class="flex flex-col h-[calc(100dvh_-_3.6rem)] relative pt-[3rem] md:flex-row w-full items-center snap-center justify-center"
  >
    <div
      ref="logo"
      class="aspect-square my-2 h-1/3 md:h-auto md:-mt-12 md:w-1/3 grid place-items-center md:mr-10"
    >
      <round-logo class="aspect-square md:h-72" />
    </div>
    <div class="flex flex-col gap-y-2 md:mt-[5vmax]">
      <div class="h-fit flex flex-col">
        <h2
          ref="header"
          class="text-heading lg:text-6xl overflow-clip md:my-0 md:h-full md:block inline text-center dark:text-white"
        >
          Web & Software Developer
        </h2>
      </div>
      <div
        ref="caption"
        class="h-[calc((0.875rem_+_1.25rem)*2)] text-center mx-4 text-gray-500 dark:text-gray-300 p-2"
      >
        <span class="inline text-sm">
          <span class="font-ubuntu-mono inline" v-typed="typedOptions"></span>
        </span>
      </div>
      <a
        ref="getInTouch2"
        href="#work-seperate"
        class="get-in-touch mx-auto font-comfortaa font-bold lowercase inline md:hidden"
        v-smooth-scroll
      >
        <font-awesome-icon icon="fa-solid fa-down-long" /> My Works
        <font-awesome-icon icon="fa-solid fa-down-long" />
      </a>
      <a
        ref="getInTouch1"
        href="#works"
        class="get-in-touch mx-auto font-comfortaa font-bold lowercase hidden md:inline"
        v-smooth-scroll
      >
        <font-awesome-icon icon="fa-solid fa-down-long" /> My Works
        <font-awesome-icon icon="fa-solid fa-down-long" />
      </a>
    </div>
    <div ref="theme-switcher" class="floating-theme-switcher" style="opacity: 0">
      <theme-switcher class="theme-switcher-control" />
    </div>
  </section>
  <navbar @showed="hideThemeSwitcher" @hidden="showThemeSwitcher" />
</template>
<script>
import RoundLogo from "../assets/logo.svg";
import Navbar from "./navbar.vue";
import { screens } from "tailwindcss/defaultTheme";
import anime from "animejs";
import { thingsIDo } from "../data.json";
import ThemeSwitcher from "./theme-switcher.vue";
import { getPercentVisible, onSizeChange } from "../utils/document";

export default {
  components: { RoundLogo, Navbar, ThemeSwitcher },
  data() {
    return {
      typedOptions: {
        strings: thingsIDo,
        loop: true,
        typeSpeed: 50,
        backSpeed: 60,
        backDelay: 1000,
        startDelay: 2600,
      },
      isNavbarHidden: false,
    };
  },
  mounted() {
    const timeline = anime.timeline({ easing: "easeInOutCubic", delay: 150 });
    timeline.add({
      targets: this.$refs.logo,
      keyframes: [
        {
          translateY: "5%",
          scale: 2,
          opacity: 0.4,
          duration: 200,
        },
        {
          translateY: 0,
          opacity: 1,
          scale: 1,
          duration: 600,
        },
      ],
      easing: "easeOutQuad",
    });
    timeline.add(
      {
        targets: this.$refs.header,
        keyframes: [
          {
            maxHeight: 0,
            opacity: 0,
            duration: 0,
            delay: 0,
          },
          {
            opacity: 1,
            maxHeight: "8rem",
            duration: 1200,
          },
        ],
      },
      "-=300"
    );
    timeline.add(
      {
        targets: this.$refs.caption,
        keyframes: [
          {
            translateX: "50%",
            opacity: 0,
            delay: 0,
            duration: 0,
          },
          {
            translateX: 0,
            opacity: 1,
            duration: 600,
          },
        ],
        easing: "easeOutElastic(2,.6)",
      },
      "+=100"
    );
    timeline.add(
      {
        targets: [this.$refs.getInTouch1, this.$refs.getInTouch2],
        keyframes: [
          {
            opacity: 0,
            delay: 0,
          },
          {
            opacity: 1,
            duration: 400,
          },
        ],
        complete: () => this.landingAnimationComplete(),
      },
      "-=100"
    );

    onSizeChange(this.autoColorThemeSwitcher);
  },
  methods: {
    landingAnimationComplete() {
      setTimeout(this.showThemeSwitcher, 100);
    },
    autoColorThemeSwitcher() {
      const el = document.querySelector(".floating-theme-switcher > button");
      const scrolled = getPercentVisible("#about > #about-bg");

      if (scrolled === 0) return;

      if (this.$root.getTheme() === "light" && !this.isNavbarHidden) {
        if (scrolled < 24 && window.innerWidth < parseInt(screens.md))
          el.classList.add("over-colored");
        else {
          el.classList.remove("over-colored");
        }
      }
    },
    hideThemeSwitcher() {
      const el = this.$refs["theme-switcher"];
      if (el) {
        anime({
          targets: el,
          translateX: [0, "-5px"],
          translateY: [0, "-150px"],
          // easing: "easeInOutElastic(1, .6)",
          delay: 0,
          opacity: [1, 0],
        });
      }

      this.isNavbarHidden = true;
    },
    showThemeSwitcher() {
      const el = this.$refs["theme-switcher"];
      if (el) {
        anime({
          targets: el,
          translateX: ["-5px", 0],
          translateY: ["-150px", 0],
          // easing: "easeInOutElastic(1, .6)",
          opacity: [0, 1],
        });
      }

      this.isNavbarHidden = false;
    },
  },
};
</script>
<style lang="sass" scoped>
.floating-theme-switcher
  @apply fixed right-4 md:right-14 lg:right-24 bottom-4 p-3 backdrop-blur-sm z-50 grid place-items-center aspect-square rounded-full border shadow
  @apply bg-gray-200/30 dark:bg-gray-400/20 border-gray-200/80 dark:border-gray-400/30 dark:md:bg-gray-800/30 dark:md:border-gray-800/60

.theme-switcher-control
  @apply text-gray-400 dark:text-white transition-colors duration-100
  &.over-colored
    @apply text-white

.get-in-touch
  &>svg
    @apply animate-bounce -mb-0.5 mx-0.5 text-current
  @apply opacity-0 text-gray-400 dark:text-gray-300 text-sm underline underline-offset-2 decoration-dotted hover:text-cst-cyan/70
</style>
