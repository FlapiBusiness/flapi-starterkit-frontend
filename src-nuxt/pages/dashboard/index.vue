<template>
  <div>
    <component
      v-for="(component, index) in flapiCmsComponents"
      :key="index"
      :is="componentDisplayMap[component.type]"
      v-bind="component.data"
    />
  </div>
</template>

<script lang="ts" setup>
import { useFlapiCmsComponentStore } from '@/stores/flapiCmsComponentStore'
import type { FlapiCmsComponent } from '@/stores/flapiCmsComponentStore'
import { componentDisplayMap } from '@/components/sections/componentDisplayMap'

import type { Ref } from 'vue'
import { ref } from 'vue'

definePageMeta({
  layout: 'cms',
})

const flapiCmsComponentStore: ReturnType<typeof useFlapiCmsComponentStore> = useFlapiCmsComponentStore()
const flapiCmsComponents: Ref<FlapiCmsComponent[]> = ref(flapiCmsComponentStore.components)

onMounted(() => {
  const published: FlapiCmsComponent[] = localStorage.getItem('flapiCmsComponents')
    ? JSON.parse(localStorage.getItem('flapiCmsComponents') as string)
    : []

  console.log('Published components:', published)

  flapiCmsComponentStore.setFlapiCmsComponents(published)
  flapiCmsComponents.value = published
})
</script>
