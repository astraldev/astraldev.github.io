<template>
  <landing />
  <navbar />
  <about-me />
  <skills />
  <contact />
  <custom-footer />
</template>
<script>
import navbar from './components/navbar.vue'
import landing from './components/landing.vue'
import skills from './components/skills.vue'
import AboutMe from './components/AboutMe.vue'
import contact from './components/contact.vue'
import CustomFooter from './components/custom-footer.vue'
export default {
  components: { navbar, landing, AboutMe, skills, contact, CustomFooter },
  methods: {
    toggleTheme(){
      if(localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia("(prefers-color-scheme: dark)"))){
        document.documentElement.classList.remove("dark")
        return true
      }else {
        document.documentElement.classList.add("dark")
        return false
      }
    },
  }
}
</script>
<style>
</style>