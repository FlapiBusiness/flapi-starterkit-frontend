<template>
  <component v-for="(block, idx) in componentsList" :key="idx" :is="getComponentName(block.type)" v-bind="block.data" />
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'

// const pageSlug: string = 'home'
const componentsList: Ref = ref<
  {
    type: 'hero-section' | 'image-left-text-right' | 'cta'
    order: number
    data: Record<string, any>
    page_slug: string
  }[]
>([])

/**
 * @description This function is used to get the component name based on the type.
 * @param {string} type - The type of the component.
 * @returns {string} The name of the component.
 */
const getComponentName: (type: string) => void = (type: string) => {
  const mapping: Record<string, string> = {
    'hero-section': 'HeroSection',
    'image-left-text-right': 'ImageLeftTextRightSection',
    cta: 'CtaSection',
  }
  return mapping[type]
}
</script>
