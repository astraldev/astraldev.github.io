<template>
  <div class="flex flex-col relative gap-y-0.5">
    <label :for="id || '__text_input'" class="text-sm px-px text-gray-600 font-bold font-asap">
      {{label}}
    </label>
    <input @input="$emit('input', $event.currentTarget.value)" :placeholder="placeholder || ''" :type="type || 'text'" id="__text_input" :class="styles + ' px-3 py-1.5 font-ubuntu-mono text-sm text-gray-700 placeholder:text-gray-400 border pr-6 h-9 border-gray-300 overflow-hidden rounded'">
    <div class="absolute right-1 bottom-1.5 text-gray-400 h-6 w-6 ml-auto">
      <slot name="icon"></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: ["type", 'label', "id", 'styles', 'placeholder'],
  emits: ["input"]
}
</script>