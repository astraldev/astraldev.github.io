<template>
  <nav :class="`sticky top-0 z-30 rounded-b-md shadow-md overflow-hidden`">
    <div
      class="md:flex md:flex-nowrap dark:bg-white/20 md:dark:bg-white/10 bg-white/40 backdrop-blur-md"
    >
      <div
        class="py-3 w-full overflow-y-hidden px-6 md:pr-0 items-center flex text-gray-700 dark:text-white"
      >
        <div
          id="nav-title"
          class="flex-grow relative flex h-9 overflow-y-hidden flex-col mr-auto"
        >
          <logo class="text-gray-500 dark:text-gray-200 w-max" />
        </div>
        <theme-switcher />
        <button
          class="flex-grow-0 md:hidden"
          @click="active = !active"
          :aria-label="active ? 'Close menu' : 'Open menu'"
        >
          <font-awesome-icon icon="fa-solid fa-xmark" class="h-4 w-4" v-if="active" />
          <font-awesome-icon icon="fa-solid fa-bars" class="h-4 w-4" v-else />
        </button>
      </div>
      <div
        :class="`overflow-hidden nav-list max-h-0 md:max-h-[15rem] ${
          active ? 'h-fit' : '!border-transparent'
        }`"
        ref="navlist"
      >
        <ul>
          <li>
            <a href="#about" @click="active = false" v-smooth-scroll>About me</a>
          </li>
          <li class="hidden md:flex">
            <a href="#works" @click="active = false" v-smooth-scroll>Works</a>
          </li>
          <li class="md:hidden flex">
            <a href="#work-seperate" @click="active = false" v-smooth-scroll>Works</a>
          </li>
          <li class="flex md:hidden">
            <a href="#projects" @click="active = false" v-smooth-scroll>Projects</a>
          </li>
          <li class="hidden md:flex">
            <a href="#works" @click="active = false" v-smooth-scroll>Projects</a>
          </li>
          <li>
            <a href="#skills" @click="active = false" v-smooth-scroll>Skills</a>
          </li>
          <li>
            <a href="#contact" @click="active = false" v-smooth-scroll>Contact</a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import anime from "animejs";
import ThemeSwitcher from "./theme-switcher.vue";
import Logo from "../assets/astraldev.svg";

export default {
  components: { ThemeSwitcher, Logo },
  data() {
    return { active: false };
  },
  mounted() {
    this.$el.style.opacity = 0;
    document.addEventListener("scroll", () => {
      if (Math.abs(this.$el.offsetTop - window.scrollY) < 5) {
        if (this.$el.style.opacity == 0) {
          anime({
            targets: this.$el,
            opacity: [0, 1],
            easing: "linear",
            duration: 150,
          });
        }
      } else {
        if (this.$el.style.opacity == 1 || this.$el.style.opacity == "1") {
          anime({
            targets: this.$el,
            opacity: [1, 0],
            easing: "linear",
            duration: 150,
          });
        }
      }
    });
  },
  watch: {
    active(val) {
      // if (window.visualViewport.width >= 768) return
      if (!val) {
        anime({
          targets: this.$refs.navlist,
          keyframes: [
            {
              maxHeight: "100dvh",
              delay: 0,
              duration: 0,
            },
            {
              maxHeight: 0,
              delay: 100,
              duration: 200,
              easing: "easeOutCubic",
            },
          ],
        });
      } else {
        anime({
          targets: this.$refs.navlist,
          keyframes: [
            {
              maxHeight: 0,
              delay: 0,
              duration: 0,
            },
            {
              maxHeight: "100vh",
              delay: 100,
              duration: 200,
              easing: "easeOutCubic",
            },
          ],
        });
      }
    },
  },
};
</script>

<style lang="sass" scoped>

div#nav-title > h1
  text-shadow: 2px 2px #fff6
.nav-list
  // small screens
  & > ul
    @apply p-4 md:py-0 flex md:flex-row flex-col gap-y-4 md:h-full md:items-center md:pl-1 md:pr-6 md:w-max md:gap-x-3 font-comfortaa md:mt-1
  @apply md:h-full flex-shrink-0 md:my-auto border-t-2 border-white/10 md:border-t-0 md:w-fit w-full flex justify-between flex-col

  &> ul > li
    @apply font-comfortaa text-sm text-gray-700 dark:text-white
    &.active
      @apply text-gray-900
</style>
