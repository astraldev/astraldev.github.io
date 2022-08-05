<template>
  <div class="flex flex-col w-full pb-5">
    <div class="mx-auto w-11/12 flex items-center justify-center">
      <contact-illustration class="illustration aspect-square mx-auto w-full" v-intersect="{ callback: animateIllustration }" />
    </div>
    <div class="w-11/12 mx-auto" ref="languages">
      <h3 class="text-heading mx-auto text-center -my-5 pb-10">
        Contact me
      </h3>
      <form class="flex gap-y-4 flex-col">
        <custom-input label="Name" placeholder="How do I address you?"/>
        <custom-input label="Email" placeholder="How do I get to you?">
          <template #icon>
            <font-awesome-icon icon="fa-solid fa-at" />
          </template>
        </custom-input>
        <custom-textarea label="Your message" />
        <button class="send-button">
          <span>Send a mail</span>
          <font-awesome-icon icon="fa-solid fa-paper-plane" />
        </button>
      </form>
      <div class="mt-4">
        <div class="flex gap-x-5 items-center">
          <div class="w-auto flex-grow h-0 border-t border-gray-300"></div>
          <h4 class="text-lg text-gray-700">OR</h4>
          <div class="w-auto flex-grow h-0 border-t border-gray-300"></div>
        </div>
        <div class="social-links">
          <div class="after:bg-transparent hover:after:bg-black/25">
            <font-awesome-icon icon="fa-brands fa-github" />
            <span>GitHub</span>
          </div>
          <div class="hover:after:bg-[#4285F4]/25 after:bg-transparent">
            <font-awesome-icon icon="fa-brands fa-google" />
            <span>Google</span>
          </div>
          <div class="after:bg-transparent hover:after:bg-[#FD1D1D]/25">
            <font-awesome-icon icon="fa-brands fa-instagram" />
            <span>Instagram</span>
          </div>
          <div class="after:bg-transparent hover:after:bg-[#25D366]/25">
            <font-awesome-icon icon="fa-brands fa-whatsapp" />
            <span>WhatsApp</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContactIllustration from '../assets/contact-illustration.svg'
import anime from 'animejs'
import CustomInput from './form-components/custom-input.vue'
import CustomTextarea from './form-components/custom-textarea.vue'
export default {
  components: { ContactIllustration, CustomInput, CustomTextarea },
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
.send-button
  @apply h-10 bg-cyan font-bold font-asap flex items-center justify-center gap-x-4 relative rounded after:absolute after:inset-0 after:bg-transparent hover:after:bg-white/10 text-white
.illustration 
  &>.objects, &>g#person, &>g#background, &>g#plant, &>g#laptop, &>g#table
    @apply opacity-0

.social-links
  @apply grid grid-cols-2 gap-4

  &>div
    @apply after:absolute after:transition-colors overflow-hidden after:duration-500 after:inset-0 relative cursor-pointer bg-white border border-gray-50 shadow p-4 gap-y-2 flex flex-col items-center justify-center rounded-md

    &>svg
      @apply h-7 w-7
    &>span
      @apply w-fit mx-auto font-ubuntu-mono
</style>