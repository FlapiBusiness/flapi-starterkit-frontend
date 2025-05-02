<template>
  <Transition name="fade">
    <div v-if="modelValue" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="relative w-full max-w-lg rounded-2xl bg-gray-700 p-6 shadow-xl" @click.stop>
        <button
          @click="$emit('update:modelValue', false)"
          class="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
        >
          <span class="sr-only">Close modal</span>
          ✕
        </button>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
defineProps<{
  modelValue: boolean
}>()
defineEmits(['update:modelValue'])
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
