<template>
  <div class="bg-gradient-to-t md:mt-20 md:from-gray-100 md:dark:bg-none md:to-gray-50 py-4 md:dark:bg-gray-900/10 from-cst-cyan/70 to-cst-cyan/50 rounded-t-2xl md:rounded-t-lg mt-10 flex items-center justify-between flex-col">
    <logo class="text-white md:dark:text-white md:text-gray-700 w-32"/>
    <span class="text-gray-300 md:dark:text-gray-300 md:text-gray-900 mt-2 text-xs font-comfortaa mx-auto">Copyright &copy; 2022</span>
  </div>
</template>
<script>
import Logo from '../assets/astraldev.svg'
export default {
  components: { Logo }
}
</script>