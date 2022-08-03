<template>
  <div class="flex flex-col w-full pb-5">
    <div class="bg-gradient-to-b from-cyan/50">
      <programming-illustration class="aspect-square -mt-4 h-11/12" v-intersect="{ callback: animateIllustration }" />
    </div>
    <div class="w-11/12 mx-auto" ref="languages">
      <h3 class="text-heading mx-auto text-center -mt-10 pb-10">
        Languages I Speak
      </h3>
      <div v-for="(title, index) in Object.keys(languageUsed)" :key="index" class="language-details">
        <details>
          <summary @click.prevent="detailToggled" @keyup.space="detailToggled">
            <div>
              <font-awesome-icon :icon="`${languageUsed[title]['icon']}`" />
              <h2>{{title}}</h2>
              <font-awesome-icon icon="fa-solid fa-caret-down" class="ml-auto"/>
            </div>
          </summary>
          <ul>
            <li v-for="(name,index) in languageUsed[title]['language']" :key="index">
              {{name}}
            </li>
          </ul>
        </details>
      </div>
    </div>
  </div>
</template>
<script>
import ProgrammingIllustration from '../assets/programming-language.svg'
import anime from 'animejs'
import { languages } from "../data.json"
export default {
  components: { ProgrammingIllustration },
  data(){
    console.log(languages)
    return {
      languageUsed: languages,
    }
  },
  mounted() {
    document.querySelector("g#background").style.transformOrigin = "center"
    this.$el.querySelector("details").open = true
  },
  methods: {
    closeDetail(el){
      const ul = el.querySelector("ul")
      const childrenCount = ul.children.length
      anime({
        targets: ul,
        height: 0,
        duration: 100*childrenCount,
        delay: 100,
        easing: "easeInOutQuad",
        complete: () => {
          el.open = false;
        }
      })
    },
    openDetail(el){
      const ul = el.querySelector("ul")
      ul.style.height = 0
      const childrenCount = ul.children.length
      el.open = true;
      anime({
        targets: ul,
        keyframes: [
          {
            height: 0,
            delay: 0,
            duration: 0,
          },
          {
            height: `${2.05*childrenCount}rem`,
            duration: 100*childrenCount,
            easing: "easeOutCubic",
            delay: 50,
          }
        ]
      })
    },
    detailToggled(ev){
      const detail_el = ev.currentTarget.parentNode;
      if(!detail_el.open) this.openDetail(detail_el)
      else this.closeDetail(detail_el)
    },
    animateIllustration() {
      const timeline = anime.timeline({ easing: "spring(1,80,10,10)", dekay: 100 })
      timeline.add({
        targets: "g#background",
        keyframes: [
          {
            translateY: '-5%',
            scale: 1.5,
            opacity: 0,
            delay: 0,
            duration: 0,
          },
          {
            translateY: 0,
            opacity: 0.3,
            scale: 1,
            duration: 800,
          }
        ]
      })
      timeline.add({
        targets: "g.leafs",
        keyframes: [
          {
            translateY: '-2%',
            opacity: 0,
            delay: 0,
            duration: 0,
          },
          {
            translateY: 0,
            opacity: 1,
            delay: anime.stagger(100, { start: 0 }),
            duration: 500,
          }
        ]
      })
      timeline.add({
        targets: "g#pc-screen",
        keyframes: [
          {
            translateY: '-5%',
            opacity: 0,
            delay: 0,
            duration: 0,
          },
          {
            translateY: 0,
            opacity: 1,
            delay: anime.stagger(200, { start: 0 }),
            duration: 800,
          }
        ]
      })
      timeline.add({
        targets: "g.screen-item",
        keyframes: [
          {
            translateY: '-10%',
            opacity: 0,
            delay: 0,
            duration: 0,
          },
          {
            translateY: 0,
            opacity: 1,
            delay: anime.stagger(100, { start: 0 }),
            duration: 600,
          }
        ]
      }, "-=600")
    }
  }
}
</script>
<style lang="sass" scoped>

details 
  @apply border border-gray-300 rounded-md my-4 first:mt-0
  &[open]>summary
    @apply border-b-2 border-gray-200
  &>summary 
    @apply flex px-6 py-2 cursor-pointer
    &::-webkit-details-marker, &::marker
      display: none
    &>div
      @apply flex items-center w-full text-gray-700 gap-x-4
  &>ul 
    @apply flex flex-col divide-y divide-gray-200 overflow-y-clip
    &>li 
      @apply w-full px-6 hover:bg-gray-50 cursor-pointer text-sm text-gray-500 font-ubuntu-mono font-bold py-1.5

g.screen-item, g#pc-screen, g#background, g.leafs
  @apply opacity-0
</style>