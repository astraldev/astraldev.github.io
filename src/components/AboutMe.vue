<template>
  <div class="w-full -mt-5 about-me">
    <div ref="illustration" class="illustration">
      <coding-illustration class="w-full" v-intersect="{callback: illustrationIntersect}"/>
    </div>
    <div class="p-4 flex items-center bg-cyan -mt-20 justify-center">
      <div>
        <h2 class="font-bold text-2xl text-center px-4 py-2 mt-20 text-white font-comfortaa">Hi, I'm AstralDEV, nice to meet you</h2>
      </div>
    </div>
  </div>
</template>

<script>
import CodingIllustration from '../assets/coding-illustration.svg'
import anime from 'animejs'
export default {
  components: { CodingIllustration },
  methods: {
    illustrationIntersect(){
      const timeline = anime.timeline({easing: 'easeInOutElastic(1,.4)'})
      this.$refs.illustration.style.opacity = 1
      timeline.add({
        targets: '.illustration > svg',
        keyframes: [
          {
            opacity: 0,
            translateY: "-10%"
          },
          {
            opacity: 1,
            translateY: 0,
            duration: 1000,
          }
        ],
        delay: anime.stagger(400)
      })
    }
  }
}
</script>
<style lang="sass" scoped>
div.illustration
  @apply opacity-0
</style>