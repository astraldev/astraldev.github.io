<template>
  <nav :class="`sticky top-0 z-40 rounded-bl-lg ${active ? '' : 'rounded-br-lg'}`" ref="navigation">
    <div class="w-full shadow-md py-3 overflow-y-hidden dark:bg-base/70 bg-white/40 px-6 items-center flex text-gray-700 dark:text-white  backdrop-blur">
      <div ref="title" id="nav-title" class="flex-grow relative flex h-9 overflow-y-hidden flex-col">
        <h1 class="text-2xl font-asap font-bold">About me</h1>
      </div>
      <theme-switcher />
      <button class="flex-grow-0" @click="active = !active">
        <font-awesome-icon icon="fa-solid fa-xmark" class="h-4 w-4" v-if="active"/>
        <font-awesome-icon icon="fa-solid fa-bars" class="h-4 w-4" v-else/>
      </button>
    </div>
    <ul class="nav-list translate-x-full" ref="navlist">
      <li>
        <a @click="active = false" id="nav-link-anchor" href="#about" v-smooth-scroll="{offset:-35}">About me</a>
      </li>
      <li>
        <a @click="active = false" id="nav-link-anchor" href="#works" v-smooth-scroll="{offset:-55}">My works</a>
      </li>
      <li>
        <a @click="active = false" id="nav-link-anchor" href="#challenges" v-smooth-scroll="{offset:-55}">Challenges</a>
      </li>
      <li>
        <a @click="active = false" id="nav-link-anchor" href="#skills" v-smooth-scroll="{offset:-55}">My Skills</a>
      </li>
      <li>
        <a @click="active = false"  id="nav-link-anchor" href="#contact" v-smooth-scroll="{offset:-55}">Contact</a>
      </li>
    </ul>
  </nav>
</template>

<script>
import anime from 'animejs'
import ThemeSwitcher from './theme-switcher.vue';
export default {
  methods: {
    changeTitle(text){
      const newH1 = document.createElement("h1");
      newH1.classList.add("text-2xl");
      newH1.classList.add("font-asap");
      newH1.classList.add("font-bold");
      newH1.innerText = text;
      newH1.style.transform = "translateY(50%)"
      newH1.style.textShadow = '2px 2px #fff6'
      const timeline = anime.timeline()

      timeline.add({
        targets: this.$refs.title.querySelector('h1'),
        translateY: [0, "-1000%"],
        // opacity: [1,0],
        delay: 0,
        easing: "linear",
        duration: 150,
        complete: ()=>{
          while(this.$refs.title.firstChild) this.$refs.title.removeChild(this.$refs.title.lastChild);
          this.$refs.title.appendChild(newH1);
        }
      })
      timeline.add({
        targets: newH1,
        opacity: [0,1],
        translateY: ["10%", "0%"],
        delay: 0,
        duration: 150,
        easing: "linear"
      })
    }
  },
  data(){
    return {
      active: false
    }
  },
  components: { ThemeSwitcher },
  mounted(){
    this.$el.style.opacity = 0
    this.$el.style.overflowY = "hidden"
    document.addEventListener("scroll", ()=>{
      if(Math.abs(this.$el.offsetTop - window.scrollY) < 5){
        if(this.$el.style.opacity == 0){
          anime({targets:this.$el,opacity:[0,1],easing:'linear',duration:250})
        }
      }else{
        if(this.$el.style.opacity == 1 || this.$el.style.opacity == '1'){
          anime({targets:this.$el,opacity:[1,0],easing:'linear',duration:250})
        }
      }

      const watchList = ["#about","#works","#challenges","#skills","#contact"]
      watchList.reverse()

      for(const el in watchList){
        const elm = document.querySelector(watchList[el]),
              title = this.$el.querySelector("#nav-title"),
              text = this.$el.querySelector(`a#nav-link-anchor[href='${watchList[el]}']`).innerText;

        if(Math.abs(elm.offsetTop - window.scrollY) <= 55){
          if(title.querySelector("h1").innerText.toLowerCase() != text.toLowerCase()){
            this.changeTitle(text)
            break;
          }
        }
        
      }
    })
  },
  watch: {
    active(val){
      if(val){
        anime({
          targets: this.$refs.navlist,
          keyframes: [
            {
              translateX: "100%",
              opactity: 0,
              delay: 0,
              duration: 0,
            },
            {
              translateX: 0,
              opactity: 1,
              delay: 100,
              duration: 200,
              easing: 'easeOutCubic'
            }
          ]
        })
      }else{
        anime({
          targets: this.$refs.navlist,
          keyframes: [
            {
              translateX: "0%",
              opactity: 1,
              delay: 0,
              duration: 0,
            },
            {
              translateX: "100%",
              opactity: 0,
              delay: 100,
              duration: 200,
              easing: 'easeOutCubic'
            }
          ]
        })
      }
    }
  }
}
</script>

<style lang="sass" scoped>
  nav *
    @apply duration-150

  div#nav-title > h1
    text-shadow: 2px 2px #fff6
  .nav-list
    @apply flex flex-col z-30 fixed h-screen gap-y-4 right-0 w-44 top-14 mt-1 p-4 bg-white/40 dark:bg-base/70 backdrop-blur-md shadow-md

    &>li
      @apply font-ubuntu-mono text-lg text-gray-700 dark:text-white
      &.active
        @apply text-gray-900
</style>