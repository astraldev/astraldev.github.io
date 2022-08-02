<template>
  <div class="w-full flex flex-col md:grid gap-y-4 md:px-6 grid-cols-2 md:gap-x-2">
    <div class="webcard" v-for="(work, index) in workDescriptions" :key="index">
      <div class="overflow-hidden rounded-md relative">
        {{ getImage(work) }}
        <img :src="work.image" :alt="work.name" class="h-36 aspect-video">
        <div :class="`image-overlay ${isDefaultImage(work) ? 'opacity-90' : 'opacity-0'}`">
          <span class="text-white font-ubuntu-mono font-bold text-center capitalize text-sm">
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
  @apply bg-white/70 grid place-items-center rounded-lg select-none h-52 shadow-lg px-10 py-6
  &:nth-child(even) .image-overlay
    @apply bg-cyan/70
  &:nth-child(odd)  .image-overlay
    @apply bg-green/40
    
.image-overlay
  @apply absolute inset-0 flex hover:opacity-100 items-center justify-center transition-opacity duration-300 backdrop-blur-sm
</style>