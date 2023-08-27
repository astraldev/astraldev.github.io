<template>
  <div class="w-full flex flex-col md:grid gap-y-4 grid-cols-2 md:gap-x-2" id="works">
    <div class="webcard [&:nth-child(even)_.image-overlay]:bg-cst-cyan/70 [&:nth-child(odd)_.image-overlay]:bg-cst-green/40 bg-white/70 md:bg-gray-100 dark:md:bg-gray-900" v-for="(work, index) in workDescriptions" :key="index">
      <div class="overflow-hidden rounded-md relative">
        {{ getImage(work) }}
        <img :src="work.image" :alt="work.name" class="h-36 aspect-video">
        <div :class="`image-overlay ${isDefaultImage(work) ? 'opacity-90' : 'opacity-0'}`">
          <span class="text-white font-comfortaa font-bold text-center capitalize text-sm">
            {{ `${work.role}` }} <br /> {{ `${work.role ? '@' : ''} ${work.name}` }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { works } from '../data.json'
export default {
  data() {
    return {
      workDescriptions: works instanceof Array ? works : []
    }
  },
  methods: {
    getImage(work) {
      if (!work.image) work.image = '/images/website-layout.jpg'
      fetch(work.image).then(res => {
        if (!(res.status <= 200)) {
          work.image = '/images/website-layout.jpg'
        }
      })
    },
    isDefaultImage(work) {
      if (work.image == '/images/website-layout.jpg') return true;
      else false;
    }
  }
}
</script>
<style lang="sass" scoped>
.webcard
  @apply md:shadow-sm grid place-items-center rounded-lg select-none h-52 shadow-lg px-10 py-6
    
.image-overlay
  @apply absolute inset-0 flex hover:opacity-100 items-center justify-center transition-opacity duration-700 backdrop-blur-sm
</style>