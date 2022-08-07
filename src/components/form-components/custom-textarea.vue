<template>
  <div class="flex flex-col relative gap-y-0.5">
    <label :for="id || '__text_area'" class="text-sm px-px text-gray-600 dark:text-gray-300 font-bold font-asap">
      {{label}}
    </label>
    <textarea @input="$emit('input', $event.currentTarget.value)" :placeholder="placeholder || ''" :type="type || 'text'" id="__text_input" :class="styles?styles:'' + ' h-28 px-3 py-1.5 font-ubuntu-mono text-sm text-gray-700 bg-white/5 dark:text-gray-300 placeholder:text-gray-400 border pr-6 border-gray-300 dark:border-gray-700 overflow-hidden rounded'">
    </textarea>
  </div>
</template>
<script>
export default {
  props: ["type", 'label', "id", 'styles', 'placeholder'],
  emits: ["input"]
}
</script>