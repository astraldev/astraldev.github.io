<template>
  <div class="bg-gradient-to-t from-cyan/70 bg-cyan/60 rounded-t-2xl md:rounded-t-lg mt-10 flex items-center justify-between flex-col">
    <div class="flex pt-6 pb-5 px-6 gap-y-4 items-center md:flex-row md:gap-x-10 flex-col justify-start">
      <logo-round class="h-16 w-16"/>
      <h4 class="text-white font-comfortaa md:text-6xl font-bold mx-auto text-3xl h-auto align-text-bottom self-end">AstralDev</h4>
    </div>
    <span class="text-gray-300 text-sm font-asap mx-auto md:hidden pb-2">Copyright &copy; 2022 AstralCO</span>
  </div>
</template>
<script>
import LogoRound from '../assets/logo-round.svg'
export default {
  components: { LogoRound }
}
</script>