<template>
  <nav class="border-b-2 border-gray-200 bg-white/5 before:absolute backdrop-blur-md before:bg-white/5 before:inset-0 before:z-[-1] relative dark:border-gray-800">
    <img src="/favicon.png" alt="astraldev logo" class="h-9 w-9">
    <h2 class="text-2xl text-left mr-auto ml-4 md:self-center inline self-end text-gray-500 dark:text-white">
      AstralCO
    </h2>
    <ul :class="`${active ? 'active' : ''} ${window.innerWidth < parseInt(screens.md.replace('px', '')) ? 'hidden' : ''}`" ref="navigation">
      <button class="menu-button py-2 mt-2 mb-3" @click="active = false">
        <font-awesome-icon icon="fa-solid fa-xmark" class="w-full h-full"/>
      </button>
      <li class="active">
        <a href="" aria-label="">Home</a>
      </li>
      <li>
        <a href="" aria-label="">About me</a>
      </li>
      <li>
        <a href="" aria-label="">My works</a>
      </li>
      <li class="get-in-touch">
        <a href="" aria-label="">Get in touch</a>
      </li>
    </ul>
    <button class="menu-button" @click="active = true">
      <font-awesome-icon icon="fa-solid fa-bars" class="h-full w-full"/>
    </button>
  </nav>
</template>

<script>
import Logo from '../assets/logo.svg'
import anime from 'animejs/lib/anime'
import { boxShadow, screens } from 'tailwindcss/defaultTheme'
export default {
  data(){
    return {
      active: false,
      screens: screens,
      window: window,
    }
  },
  methods: {},
  watch : {
    active(val){
      const navigation = this.$refs.navigation;
      this.$refs.navigation.style = ""

      if(window.innerWidth > parseInt(screens.md.replace('px', ""))) return;

      if(val){
        navigation.style.transform = "translateX(-100%)"
        anime({
          targets: navigation,
          keyframes: [
            {translateX: '100%', duration: 0},
            {translateX: '0', duration: 400},
          ],
          easing: 'easeInOutExpo'
        })
      }else {
        navigation.style.position = "fixed"
        navigation.style.display = "flex"
        navigation.style.boxShadow = boxShadow.sm;
        anime({
          targets: navigation,
          keyframes: [
            {translateX: '0%', duration: 0},
            {translateX: '100%', duration: 400},
          ],
          easing: 'easeInOutExpo',
          complete: ()=>{
            navigation.style = ""
          },
        })
      }
    }
  },
  components: { Logo }
}
</script>

<style lang="sass" scoped>
nav
  @apply flex items-center px-4 py-2 justify-between

  button.menu-button
    @apply grid place-items-center h-5 w-5 text-gray-400 hover:text-green/90 md:hidden

  &>ul 
    @apply hidden md:relative shadow-sm w-48 h-full md:shadow-none md:h-auto md:border-l-0 border-l-2 md:w-auto md:flex gap-x-4 inset-y-0 right-0 ml-auto pr-5 md:py-2 pl-10 items-end md:flex-row md:items-center flex-col bg-white md:px-4 md:border-l-0 md:gap-y-4 md:w-auto md:shadow-none
    &.active
      @apply flex fixed md:relative bg-white

    &>li
      &.get-in-touch
        @apply bg-cyan text-white rounded-full w-full md:w-36 md:mt-0 text-center mt-2 relative after:inset-0 after:absolute after:bg-transparent after:pointer-events-none hover:after:bg-white/20
        &>a:hover
          @apply text-white

      @apply p-2 text-sm font-bold text-gray-500
      &:not(.get-in-touch)>a:hover
        @apply hover:text-green/70
      &.active
        @apply text-green/90
</style>