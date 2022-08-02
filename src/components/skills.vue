<template>
  <div class="flex flex-col w-full">
    <div class="bg-gradient-to-b from-cyan/50">
      <programming-illustration class="aspect-square h-11/12" v-intersect="{ callback: animateIllustration }" />
    </div>
    <div>
      <h3 class="text-heading w-11/12 mx-auto text-center -mt-10 pb-10">
        Languages I Speak
      </h3>
    </div>
  </div>
</template>
<script>
import ProgrammingIllustration from '../assets/programming-language.svg'
import anime from 'animejs'
export default {
  components: { ProgrammingIllustration },
  mounted() {
    document.querySelector("g#background").style.transformOrigin = "center"
  },
  methods: {
    animateIllustration() {
      const timeline = anime.timeline({ easing: "spring(1,80,10,10)", dekay: 100 })
      timeline.add({
        targets: "g#background",
        keyframes: [
          {
            translateY: '-5%',
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
          }
        ]
      })
      timeline.add({
        targets: "g.leafs",
        keyframes: [
          {
            translateY: '-2%',
            opacity: 0,
            delay: 0,
            duration: 0,
          },
          {
            translateY: 0,
            opacity: 1,
            delay: anime.stagger(100, { start: 0 }),
            duration: 500,
          }
        ]
      })
      timeline.add({
        targets: "g#pc-screen",
        keyframes: [
          {
            translateY: '-5%',
            opacity: 0,
            delay: 0,
            duration: 0,
          },
          {
            translateY: 0,
            opacity: 1,
            delay: anime.stagger(200, { start: 0 }),
            duration: 800,
          }
        ]
      })
      timeline.add({
        targets: "g.screen-item",
        keyframes: [
          {
            translateY: '-10%',
            opacity: 0,
            delay: 0,
            duration: 0,
          },
          {
            translateY: 0,
            opacity: 1,
            delay: anime.stagger(100, { start: 0 }),
            duration: 600,
          }
        ]
      }, "-=600")
    }
  }
}
</script>
<style lang="sass" scoped>

g.screen-item, g#pc-screen, g#background, g.leafs
  @apply opacity-0
</style>