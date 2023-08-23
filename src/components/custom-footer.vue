<template>
  <div class="bg-gradient-to-t md:mt-20 md:from-gray-100 md:dark:bg-none md:to-gray-50 md:dark:bg-gray-900/10 from-cyan/70 to-cyan/50 rounded-t-2xl md:rounded-t-lg mt-10 flex items-center justify-between flex-col">
    <div class="flex pt-6 pb-3 md:py-3 md:pb-1 px-6 gap-y-4 items-center md:flex-row md:gap-x-10 flex-col justify-start">
      <logo-round class="h-9 w-9 md:hidden"/>
      <h4 class="text-white md:dark:text-white md:text-gray-700 font-comfortaa font-bold mx-auto text-2xl h-auto align-text-bottom self-end">AstralDev</h4>
    </div>
    <span class="text-gray-300 md:dark:text-gray-300 md:text-gray-900 text-xs font-comfortaa mx-auto pb-2">Copyright &copy; 2022 AstralCO</span>
  </div>
</template>
<script>
import LogoRound from '../assets/logo-round.svg'
export default {
  components: { LogoRound }
}
</script>