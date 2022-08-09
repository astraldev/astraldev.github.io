<template>
  <section class="flex flex-col w-full pb-5 md:mt-24" id="contact">
    <div class="flex md:flex-row flex-col gap-x-10">
      <div class="mx-auto w-11/12 md:w-1/2 md:order-1 flex items-center justify-center">
        <contact-illustration class="illustration aspect-square mx-auto w-full"
          v-intersect="{ callback: animateIllustration, once: true, threshold: 0.99 }" />
      </div>
      <div class="w-11/12 mx-auto md:w-1/2" ref="languages">
        <h3 class="text-heading mx-auto text-center -my-5 pb-10 dark:text-white">
          Contact me
        </h3>
        <form class="flex gap-y-4 flex-col">
          <custom-input label="Name" placeholder="How do I address you?" @input="updateFormName(text)" />
          <custom-input label="Email" placeholder="How do I get to you?" @input="updateFormText(text)">
            <template #icon>
              <font-awesome-icon icon="fa-solid fa-at" />
            </template>
          </custom-input>
          <custom-textarea label="Your message" />
          <button class="send-button" @click="sendMail">
            <span>Send a mail</span>
            <font-awesome-icon icon="fa-solid fa-paper-plane" />
          </button>
        </form>
      </div>
    </div>
    <div class="mt-4 md:mt-0">
      <div class="flex gap-x-5 mb-4 mt-3 md:-mt-5 items-center">
        <div class="w-auto flex-grow h-0 border-t border-gray-300"></div>
        <h4 class="text-lg text-gray-700 dark:text-gray-200">OR</h4>
        <div class="w-auto flex-grow h-0 border-t border-gray-300"></div>
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
  &>.objects, &>g#person, &>g#background, &>g#plant, &>g#laptop, &>g#table
    @apply opacity-0

.social-links
  @apply grid grid-cols-2 gap-4 md:grid-cols-4

  &>a
    @apply after:absolute dark:bg-white/5 dark:text-gray-300 after:transition-colors overflow-hidden after:duration-500 after:inset-0 relative cursor-pointer bg-white shadow p-4 gap-y-2 flex flex-col items-center justify-center rounded-md

    &>svg
      @apply h-7 w-7
    &>span
      @apply w-fit mx-auto font-ubuntu-mono
</style>