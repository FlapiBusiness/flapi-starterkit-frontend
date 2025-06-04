<template>
  <div
    v-for="(component, index) in cmsComponents"
    :key="index"
    draggable="true"
    @dragstart="onDragStart(index)"
    @dragover.prevent
    @dragleave="onDragLeave"
    @drop="onDrop(index)"
    :class="[
      'group relative mb-2 bg-gray-100 p-1 transition',
      hoveredIndex === index ? 'border-2 border-blue-500' : 'border border-transparent',
    ]"
  >
    <FlapiSquareButton
      variant="outline"
      class="absolute right-2 top-2 hidden transition-opacity duration-300 group-hover:block"
      :size="48"
      backgroundColor="#EC364B"
      backgroundHoverColor="#C0172A"
      @click="removeComponent(index)"
    >
      <FlapiIcon color="#fff" :height="24" mode="stroke" name="Trash2" viewBox="0 0 24 24" :width="24" />
    </FlapiSquareButton>

    <component :is="componentDisplayMap[component.name]" v-bind="component.data" />
  </div>
</template>

<script lang="ts" setup>
import { useCmsComponentStore } from '~/stores/cmsComponentStore'
import type { CmsComponentStore } from '~/stores/cmsComponentStore'
import { componentDisplayMap } from '@/components/sections/componentDisplayMap'

import type { Ref } from 'vue'
import { ref } from 'vue'

definePageMeta({
  layout: 'cms',
})

const cmsComponentStore: ReturnType<typeof useCmsComponentStore> = useCmsComponentStore()
const cmsComponents: Ref<CmsComponentStore[]> = ref(cmsComponentStore.components)
const hoveredIndex: Ref<number | null> = ref(null)
let draggedIndex: number = -1

onMounted(() => {
  const published: CmsComponentStore[] = localStorage.getItem('cmsComponents')
    ? JSON.parse(localStorage.getItem('cmsComponents') as string)
    : []

  console.log('Published components:', published)

  cmsComponentStore.setCmsComponentStores(published)
  cmsComponents.value = published
})
/**
 * @param {number} index - The index of the component being dragged.
 * @returns {void}
 * @description This function sets the components in the store and local storage.
 */
const onDragStart: (index: number) => void = (index: number): void => {
  draggedIndex = index
}

/**
 * @param {number} dropIndex - The index where the component is dropped.
 * @returns {void}
 * @description This function handles the drop event and reorders the components.
 */
const onDrop: (dropIndex: number) => void = (dropIndex: number): void => {
  const items: CmsComponentStore[] = [...cmsComponents.value]
  const draggedItem: CmsComponentStore = items.splice(draggedIndex, 1)[0]
  items.splice(dropIndex, 0, draggedItem)

  // Réaffecte les ordres
  items.forEach((item: CmsComponentStore, index: number) => (item.order = index + 1))
  cmsComponents.value = items
  cmsComponentStore.setCmsComponentStores(items)

  hoveredIndex.value = null
}

/**
 * @returns {void}
 */
const onDragLeave: () => void = (): void => {
  hoveredIndex.value = null
}

/**
 * @param {number} index - The index of the component being dragged over.
 * @returns {void}
 */
const removeComponent: (index: number) => void = (index: number): void => {
  cmsComponents.value.splice(index, 1)
  cmsComponents.value.forEach((item: CmsComponentStore, i: number) => (item.order = i + 1))
  cmsComponentStore.setCmsComponentStores(cmsComponents.value)
}
</script>
