
<template>
  <section class="flex flex-col h-[calc(100dvh_-_3rem)] pt-[3rem] md:flex-row w-full items-center justify-center">
    <div ref="logo" class="aspect-square my-2 h-1/3 md:w-1/3 grid place-items-center md:mr-14 md:mb-[4.5vmax]">
      <round-logo class="aspect-square" />
    </div>
    <div class="flex flex-col gap-y-2 md:mt-[5vmax]">
      <div class="h-[calc(2.25rem_+_2.5rem)] lg:h-[calc(3.75rem_*_2)] flex flex-col">
        <h2 ref="header" class="text-heading lg:text-6xl overflow-clip md:my-0 md:h-full md:block inline text-center dark:text-white">Web & Software
          Developer</h2>
      </div>
      <div ref="caption" class="h-[calc((0.875rem_+_1.25rem)*2)] text-center mx-4 text-gray-500 dark:text-gray-300 p-2">
        <span class="inline text-sm">
          <span class=" font-ubuntu-mono inline" v-typed="typedOptions"></span>
        </span>
      </div>
      <a ref="getInTouch" href="#works" class="get-in-touch mx-auto font-comfortaa font-bold lowercase"
        v-smooth-scroll="{ offset: -16 }">
        <font-awesome-icon icon="fa-solid fa-down-long" /> My Works
        <font-awesome-icon icon="fa-solid fa-down-long" />
      </a>
    </div>
  </section>
  <navbar />
</template>
<script>
import CodingIllustration from '../assets/coding-illustration.svg?component'
import RoundLogo from '../assets/logo.svg'
import Navbar from "./navbar.vue"
import anime from 'animejs'

export default {
  components: { RoundLogo, CodingIllustration, Navbar },
  data() {
    return {
      typedOptions: {
        strings: [
          "I <b>love</b> creating intuitive <b>websites</b>",
          "I <b>love</b> creating desktop <b>applications</b> for linux.",
          "Freelancer and <b>Software developer</b>."
        ],
        loop: true,
        typeSpeed: 50,
        backSpeed: 60,
        backDelay: 500,
        startDelay: 2300
      },
    }
  },
  mounted() {
    const timeline = anime.timeline({ easing: 'easeInOutCubic', delay: 150 })
    timeline.add({
      targets: this.$refs.logo,
      keyframes: [
        {
          translateY: '5%',
          scale: 1.7,
          duration: 200
        },
        {
          translateY: 0,
          scale: 1,
          duration: 700
        }
      ],
      easing: 'easeInOutQuad'
    })
    timeline.add({
      targets: this.$refs.header,
      keyframes: [
        {
          height: 0,
          opacity: 0,
          duration: 0,
          delay: 0
        },
        {
          opacity: 1,
          height: window.innerWidth > 768 ? "8rem" : "80px",
          duration: 1300
        }
      ],
    }, "-=1000")
    timeline.add({
      targets: this.$refs.caption,
      keyframes: [
        {
          translateX: '100%',
          opacity: 0,
          delay: 0,
          duration: 0
        },
        {
          translateX: 0,
          opacity: 1,
          duration: 600,
        }
      ],
      easing: 'easeOutElastic(1,.8)'
    })
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
        }
      ]
    })
  }
}
</script>
<style lang="sass" scoped>
.get-in-touch
  &>svg
    @apply animate-bounce -mb-0.5 mx-0.5 text-current
  @apply opacity-0 text-gray-400 dark:text-gray-300 text-sm underline underline-offset-2 decoration-dotted hover:text-cst-cyan/70
</style>