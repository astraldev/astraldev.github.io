<template>
  <landing />
  <about-me />
  <skills />
  <contact />
</template>
<script>
import navbar from './components/navbar.vue'
import landing from './components/landing.vue'
import skills from './components/skills.vue'
import AboutMe from './components/AboutMe.vue'
import contact from './components/contact.vue'
export default {
  components: { navbar, landing, AboutMe, skills, contact }
}
</script>
<style>
</style>