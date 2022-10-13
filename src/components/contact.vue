<template>
  <section class="flex w-full pb-5 md:mt-24" id="contact">
    <div class="flex md:grid grid-cols-2 w-full md:flex-row flex-col gap-x-10">
      <div class="mx-auto w-11/12 md:w-1/2 relative md:order-1 flex items-center justify-center">
        <contact-illustration class="illustration aspect-square md:mx-0 mx-auto"
          v-intersect="{ callback: animateIllustration, once: true, threshold: 0.99 }" />
      </div>
      <div class="social-links">
        <a target="_blank" href="https://github.com/astraldev" class="after:bg-transparent hover:after:bg-black/25">
          <font-awesome-icon icon="fa-brands fa-github" />
          <span>GitHub</span>
        </a>
        <a target="_blank" href="https://t.me/+2349049821801?text=Hello%2C%20I%20am%20"
          class="hover:after:bg-[#4285F4]/25 after:bg-transparent">
          <font-awesome-icon icon="fa-brands fa-telegram" />
          <span>Telegram</span>
        </a>
        <a target="_blank" href="https://instagram.com/just_ekure"
          class="after:bg-transparent hover:after:bg-[#FD1D1D]/25">
          <font-awesome-icon icon="fa-brands fa-instagram" />
          <span>Instagram</span>
        </a>
        <a target="_blank" href="https://wa.me/2349049821801?text=Hello%2C%20I%20am%20"
          class="after:bg-transparent hover:after:bg-[#25D366]/25">
          <font-awesome-icon icon="fa-brands fa-whatsapp" />
          <span>WhatsApp</span>
        </a>
      </div>
    </div>
  </section>
</template>
<script>
import ContactIllustration from '../assets/contact-illustration.svg'
import anime from 'animejs'
import CustomInput from './form-components/custom-input.vue'
import CustomTextarea from './form-components/custom-textarea.vue'
export default {
  components: { ContactIllustration, CustomInput, CustomTextarea },
  mounted() {
    this.$el.querySelectorAll("svg>g>g").forEach((el) => el.style.opacity = 0)
  },
  methods: {
    animateIllustration(el) {
      const timeline = anime.timeline({ easing: 'spring(1,80,10,0)' })
      timeline.add({
        targets: [el.querySelector("g#table"), el.querySelector("g#plant"), el.querySelector("g#laptop")],
        translateY: ['-9%', 0],
        scale: [1.1, 1],
        opacity: [0, 1],
        duration: 100,
        delay: anime.stagger(200, { start: 0 })
      })
      timeline.add({
        targets: [el.querySelector("g#background"), el.querySelector("g#person")],
        scale: [1.3, 1],
        opacity: [0, 1],
        duration: 50,
        delay: anime.stagger(350, { start: 0 })
      }, "-=1400")
      timeline.add({
        targets: el.querySelectorAll("g.objects"),
        translateY: ["-3%", 0],
        opacity: [0, 1],
        duration: 100,
        delay: anime.stagger(150, { start: 0 })
      }, "-=1000")
    },
    updateFormName(text) { },
    updateFormText(text) { },
    sendMail() { },
  }
}
</script>
<style lang="sass" scoped>
.send-button
  @apply h-10 bg-cyan font-bold font-asap flex items-center justify-center gap-x-4 relative rounded after:absolute after:inset-0 after:bg-transparent hover:after:bg-white/10 text-white
.illustration 
  @apply md:absolute md:h-[35vmax]
  &>.objects, &>g#person, &>g#background, &>g#plant, &>g#laptop, &>g#table
    @apply opacity-0

.social-links
  @apply grid grid-cols-2 gap-4 md:grid-cols-2 mx-4

  &>a
    @apply after:absolute dark:bg-white/5 dark:text-gray-300 after:transition-colors overflow-hidden after:duration-500 after:inset-0 relative cursor-pointer bg-white shadow p-4 gap-y-2 flex flex-col items-center justify-center rounded-md

    &>svg
      @apply h-7 w-7
    &>span
      @apply w-fit mx-auto font-ubuntu-mono
</style>