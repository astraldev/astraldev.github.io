
<template>
  <div class="md:hidden flex flex-col h-screen w-full items-center justify-center">
    <div ref="logo" class="aspect-square h-1/4 ">
      <round-logo class="aspect-square" />
    </div>
    <div class="h-[calc(2.25rem_+_2.5rem)] flex flex-col mt-2">
      <h2 ref="header" class="text-4xl overflow-clip my-auto font-comfortaa inline font-bold text-gray-600 text-center">Web & Software Developer</h2>
    </div>
    <div ref="caption" class="h-[calc((0.875rem_+_1.25rem)*2)] text-center mx-4 p-2">
      <span class="inline text-sm">
        <span class="text-gray-500 font-ubuntu-mono inline" v-typed="typedOptions">
        </span>
      </span>
    </div>
    <button ref="getInTouch" class="get-in-touch font-asap font-bold uppercase">
      <font-awesome-icon icon="fa-solid fa-down-long" /> My Works <font-awesome-icon icon="fa-solid fa-down-long" />
    </button>
  </div>
</template>
<script>
import CodingIllustration from '../assets/coding-illustration.svg'
import RoundLogo from '../assets/logo-round.svg'
import anime from 'animejs'

export default {
  components: { RoundLogo, CodingIllustration },
  data(){
    return {
      typedOptions: {
        strings: [
          "I <b>love</b> to create and design intuitive <b>websites</b>^800  &amp;^1000 linux desktop <b>applications</b>.",
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
          duration: 900
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
          duration: 1500
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
          duration: 800,
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
          duration: 600,
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
  @apply opacity-0 text-gray-400 text-sm underline underline-offset-2 decoration-dotted hover:text-cyan/70
</style>