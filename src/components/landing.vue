<template>
  <section
    class="flex flex-col h-[calc(100dvh_-_3.6rem)] pt-[3rem] md:flex-row w-full items-center snap-center justify-center"
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
        ref="getInTouch"
        href="#works"
        class="get-in-touch mx-auto font-comfortaa font-bold lowercase"
        v-smooth-scroll="{ offset: -16 }"
      >
        <font-awesome-icon icon="fa-solid fa-down-long" /> My Works
        <font-awesome-icon icon="fa-solid fa-down-long" />
      </a>
    </div>
  </section>
  <navbar />
</template>
<script>
import RoundLogo from "../assets/logo.svg";
import Navbar from "./navbar.vue";
import anime from "animejs";

export default {
  components: { RoundLogo, Navbar },
  data() {
    return {
      typedOptions: {
        strings: [
          "I <b>love</b> creating intuitive <b>websites</b>",
          "I <b>love</b> creating desktop <b>applications</b> for linux.",
          "Freelancer and <b>Software developer</b>.",
        ],
        loop: true,
        typeSpeed: 50,
        backSpeed: 60,
        backDelay: 500,
        startDelay: 2600,
      },
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
      "-=300",
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
      "+=100",
    );
    timeline.add({
      targets: this.$refs.getInTouch,
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
    });
  },
};
</script>
<style lang="sass" scoped>
.get-in-touch
  &>svg
    @apply animate-bounce -mb-0.5 mx-0.5 text-current
  @apply opacity-0 text-gray-400 dark:text-gray-300 text-sm underline underline-offset-2 decoration-dotted hover:text-cst-cyan/70
</style>
