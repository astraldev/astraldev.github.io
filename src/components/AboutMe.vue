<template>
  <div class="w-full about-me">
    <div ref="illustration" class="illustration">
      <coding-illustration :class="`w-full -mt-4`" v-intersect="{callback: illustrationIntersect, once: true}"/>
    </div>
    <div class="p-4 flex items-center flex-col -mt-20 rounded-t-2xl bg-gradient-to-b from-cyan to-cyan/60 justify-center">
      <div class="flex flex-col pb-4">
        <h2 class="font-bold text-2xl text-center pt-16 px-4 py-2 text-white font-comfortaa">Hello, I am AstralDev</h2>
        <span class="py-8 px-4 font-asap text-gray-200 text-center">
          With a spark for web development, I soar with more than <b>4</b> years of experience with 
          <b>frontend development</b> and <b>UI</b> designing and creation of applications & software for desktop.
        </span>
      </div>
      <div class="flex flex-col w-11/12" id="works">
        <div class="flex justify-between pb-4 px-1 items-center text-white">
          <h2 class="text-lg font-bold font-comfortaa">My Works</h2>
          <font-awesome-icon icon="fa-solid fa-link" class="heading-icon" />
        </div>
      </div>
      <works />
      <div class="my-2">
        <a href="" class="see-more">See more</a>
      </div>
      <div class="flex flex-col w-11/12" id="challenges">
        <div class="flex justify-between py-4 px-1 items-center text-white">
          <h2 class="text-lg font-bold font-comfortaa">Frontend Challenges</h2>
          <font-awesome-icon icon="fa-solid fa-link" class="heading-icon" />
        </div>
      </div>
      <challenges :count="2" />
      <div class="my-2">
        <a href="" class="see-more">See more</a>
      </div>
    </div>
  </div>
</template>

<script>
import CodingIllustration from '../assets/coding-illustration.svg?component'
import anime from 'animejs'
import Works from './works.vue';
import Challenges from './challenges.vue';
export default {
  components: { CodingIllustration, Works, Challenges },
  mounted(){
    document.querySelectorAll('.illustration > svg g').forEach(el => {el.style.opacity = 0})
  },
  data(){
    return {
      intersected: false
    }
  },
  methods: {
    illustrationIntersect(){
      this.intersected = true;
      const timeline = anime.timeline({easing: 'spring(1,80,10,10)'})
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
            duration: 800,
            delay: anime.stagger(400, {start: 0})
          }
        ],
      })
    }
  }
}
</script>
<style lang="sass" scoped>
  .heading-icon
    @apply text-gray-200 cursor-pointer hover:text-gray-50
  .see-more
    @apply underline underline-offset-4 hover:text-gray-100 text-center decoration-dotted font-ubuntu-mono text-gray-300
</style>