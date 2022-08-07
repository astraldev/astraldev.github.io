
<template>
  <section class="flex flex-col h-[calc(100vh_-_3rem)] w-full items-center justify-center">
    <div ref="logo" class="aspect-square h-1/4 ">
      <round-logo class="aspect-square" />
    </div>
    <div class="h-[calc(2.25rem_+_2.5rem)] flex flex-col mt-2">
      <h2 ref="header" class="text-heading overflow-clip my-auto inline text-center dark:text-white">Web & Software Developer</h2>
    </div>
    <div ref="caption" class="h-[calc((0.875rem_+_1.25rem)*2)] text-center mx-4 text-gray-500 dark:text-gray-300 p-2">
      <span class="inline text-sm">
        <span class=" font-ubuntu-mono inline" v-typed="typedOptions"></span>
      </span>
    </div>
    <a ref="getInTouch" href="#works" class="get-in-touch font-comfortaa font-bold lowercase" v-smooth-scroll="{offset: -16}">
      <font-awesome-icon icon="fa-solid fa-down-long" /> My Works <font-awesome-icon icon="fa-solid fa-down-long" />
    </a>
  </section>
</template>
<script>
import CodingIllustration from '../assets/coding-illustration.svg?component'
import RoundLogo from '../assets/logo.svg'
import anime from 'animejs'

export default {
  components: { RoundLogo, CodingIllustration },
  data(){
    return {
      typedOptions: {
        strings: [
          "I <b>love</b> to create and design intuitive <b>websites</b>^400  &amp;^400 linux desktop <b>applications</b>.",
          "Freelancer and <b>UI/UX designer</b>."
        ],
        loop: true,
        typeSpeed: 50,
        backSpeed: 60,
        backDelay: 500,
        startDelay: 2300
      },
    }
  },
  mounted(){
    const timeline = anime.timeline({easing: 'easeInOutCubic'})
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
          height: "80px",
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
    @apply animate-bounce -mb-0.5 mx-0.5
  @apply opacity-0 text-gray-400 dark:text-gray-300 text-sm underline underline-offset-2 decoration-dotted hover:text-cyan/70
</style>