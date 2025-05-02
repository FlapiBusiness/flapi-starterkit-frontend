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
import type { FlapiCmsComponent } from '@/stores/flapiCmsComponentStore'
import { componentDisplayMap } from '@/components/sections/componentDisplayMap'

const flapiCmsComponents: Ref<FlapiCmsComponent[]> = ref([])

onMounted(() => {
  if (typeof window !== 'undefined') {
    flapiCmsComponents.value = localStorage.getItem('flapiCmsComponents')
      ? JSON.parse(localStorage.getItem('flapiCmsComponents') as string)
      : []
  }
})
</script>
