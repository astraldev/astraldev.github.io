<template>
  <div class="flex flex-col w-full pb-5">
    <div class="mx-auto w-11/12 flex items-center justify-center">
      <contact-illustration class="illustration aspect-square mx-auto w-full" v-intersect="{ callback: animateIllustration }" />
    </div>
    <div class="w-11/12 mx-auto" ref="languages">
      <h3 class="text-heading mx-auto text-center -mt-5 pb-10">
        Contact me
      </h3>
    </div>
  </div>
</template>
<script>
import ContactIllustration from '../assets/contact-illustration.svg'
import anime from 'animejs'
export default {
  components: { ContactIllustration },
  mounted(){
    this.$el.querySelectorAll("svg>g>g").forEach((el) => el.style.opacity = 0)
  },
  methods: {
    animateIllustration(el){
      const timeline = anime.timeline({ easing: 'spring(1,80,10,0)' })
      timeline.add({
        targets: [el.querySelector("g#table"),el.querySelector("g#plant"),el.querySelector("g#laptop")],
        translateY: ['-9%', 0],
        scale: [1.1, 1],
        opacity: [0,1],
        duration: 100,
        delay: anime.stagger(200, {start: 0})
      })
      timeline.add({
        targets: [el.querySelector("g#background"),el.querySelector("g#person")],
        scale: [1.3, 1],
        opacity: [0,1],
        duration: 50,
        delay: anime.stagger(350, {start: 0})
      }, "-=1400")
      timeline.add({
        targets: el.querySelectorAll("g.objects"),
        translateY: ["-3%", 0], 
        opacity: [0,1],
        duration: 100,
        delay: anime.stagger(150, {start: 0})
      }, "-=1000")
    }
  }
}
</script>
<style lang="sass" scoped>
.illustration 
  &>.objects, &>g#person, &>g#background, &>g#plant, &>g#laptop, &>g#table
    @apply opacity-0
</style>