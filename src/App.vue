<template>
  <landing />
  <about-me />
  <skills />
</template>
<script>
import navbar from './components/navbar.vue'
import landing from './components/landing.vue'
import skills from './components/skills.vue'
import AboutMe from './components/AboutMe.vue'
export default {
  components: { navbar, landing, AboutMe, skills }
}
</script>
<style>
</style>