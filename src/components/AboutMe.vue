<template>
  <div class="w-full about-me">
    <div ref="illustration" class="illustration">
      <coding-illustration :class="`w-full -mt-4`" v-intersect="{callback: illustrationIntersect, once: true}"/>
    </div>
    <div class="p-4 flex items-center flex-col -mt-20 rounded-t-2xl bg-gradient-to-b from-cyan to-cyan/70 justify-center">
      <div class="flex flex-col pb-4">
        <h2 class="font-bold text-2xl text-center pt-16 px-4 py-2 text-white font-comfortaa">Hello, I am AstralDev</h2>
        <span class="py-8 px-4 font-asap text-gray-200 text-center">
          With a spark for web development, I soar with more than <b>4</b> years of experience with 
          <b>frontend development</b> and <b>UI</b> designing and creation of applications & software for desktop.
        </span>
      </div>
      <div class="flex flex-col w-full" id="works">
        <div class="flex justify-between px-10 items-center text-white">
          <h2 class="text-lg font-bold font-comfortaa">My Works</h2>
          <font-awesome-icon icon="fa-solid fa-link" class="text-gray-200 cursor-pointer hover:text-gray-50" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CodingIllustration from '../assets/coding-illustration.svg?component'
import anime from 'animejs'
export default {
  components: { CodingIllustration },
  data(){
    return {
      intersected: false
    }
  },
  methods: {
    illustrationIntersect(){
      this.intersected = true;
      const timeline = anime.timeline({easing: 'easeInOutElastic(1,.9)'})
      timeline.add({
        targets: [".illustration > svg g"],
        keyframes: [
          {
            opacity: 0,
            translateY: "-15%",
            delay: 0,
            duration: 0
          },
          {
            opacity: 1,
            translateY: 0,
            duration: 600,
            delay: anime.stagger(300, {start: 0})
          }
        ],
      })
    }
  }
}
</script>
<style lang="sass" scoped>
  .illustration > svg g 
    @apply opacity-0
</style>