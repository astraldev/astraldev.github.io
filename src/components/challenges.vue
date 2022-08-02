<template>
  <div v-for="(challenge, index) in challengeList" :key="index" class="challenge-list">
    <span class="h-full w-[10%] m-auto flex flex-grow-0 items-end text-lg font-comfortaa font-bold text-cyan">{{ getIndex(index + 1) }}</span>
    <a class="flex-grow" :href="challenge.link" target="_blank">
      <h2 class="font-asap text-gray-800 text-lg">{{ challenge.title }}</h2>
    </a>
    <a :href="challenge.url" target="_blank" class="flex-grow-0 pl-5 border-l border-l-gray-400">
      <font-awesome-icon icon="fa-solid fa-arrow-up-right-from-square" class="text-gray-500"/>
    </a>
  </div>
</template>
<script>
import { challenges } from '../data.json'
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
    }
  }
}
</script>

<style lang="sass" scoped>
.challenge-list
  @apply w-11/12 px-4 py-2 bg-white/70 hover:bg-white/90 transition-colors duration-300 flex rounded-md my-1
  &>a
    @apply flex my-auto flex-col
    &>span
      @apply text-xs text-gray-700
</style>