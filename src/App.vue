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
  components: { navbar, landing, AboutMe, skills, contact, CustomFooter }
}
</script>
<style>
</style>