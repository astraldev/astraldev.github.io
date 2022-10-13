<template>
  <div class="w-full flex flex-col md:flex-row place-items-center md:px-6 md:gap-x-2" id="challenges">
    <div v-for="(challenge, index) in challengeList" :key="index" class="challenge-list"
      v-intersect="{ callback: slideIn, once: true, threshold: 0.99 }">
      <span
        class="h-full col-span-1 flex border-r border-gray-400 items-center text-lg font-comfortaa font-bold text-cyan">{{
            getIndex(index + 1)
        }}</span>
      <a class="flex-grow ml-1 col-span-8" :href="challenge.link" target="_blank">
        <h2 class="font-asap title-colors dark:text-gray-900 text-lg">{{ challenge.title }}</h2>
      </a>
      <a :href="challenge.url" target="_blank"
        class="pl-1 h-full flex items-center justify-center place-self-stretch col-span-1 border-l border-l-gray-400">
        <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" class="text-gray-500" />
      </a>
    </div>
  </div>
</template>
<script>
import { challenges } from '../data.json'
import anime from 'animejs'
export default {
  props: ['count'],
  data() {
    return {
      challengeList: challenges.slice(0, this.count || -1) || []
    }
  },
  methods: {
    getIndex(i) {
      if (i < 10) return `${i}`.padStart(2, '0')
      else return i
    },
    slideIn(el) {
      const parent = el.parentNode
      const direction = Array.prototype.indexOf.call(parent.children, el) % 2 == 0 ? -1 : 1

      anime({
        targets: el,
        keyframes: [
          {
            opacity: 0,
            translateX: direction > 0 ? "5%" : "-5%",
            duration: 0,
            delay: 0
          },
          {
            opacity: 1,
            translateX: 0,
            delay: 100,
            duration: 1000,
            easing: 'spring(1,80,20,0)'
          }
        ]
      })
    }
  }
}
</script>

<style lang="sass" scoped>
.challenge-list
  @apply w-full px-4 py-2 shadow-md bg-white/70 hover:bg-white/90 transition-colors duration-300 grid grid-cols-10 rounded-md my-1 opacity-0
  &>a
    @apply flex my-auto flex-col
    &>span
      @apply text-xs text-gray-700
</style>