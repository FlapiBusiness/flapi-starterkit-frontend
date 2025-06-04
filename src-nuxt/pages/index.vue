<template>
  <div>
    <component
      v-for="(component, index) in flapiCmsComponents"
      :key="index"
      :is="componentDisplayMap[component.name]"
      v-bind="component.data"
    />
  </div>
</template>

<script lang="ts" setup>
import type { CmsComponentStore } from '~/stores/cmsComponentStore'
import { componentDisplayMap } from '@/components/sections/componentDisplayMap'

const flapiCmsComponents: Ref<CmsComponentStore[]> = ref([])

onMounted(() => {
  if (typeof window !== 'undefined') {
    flapiCmsComponents.value = localStorage.getItem('flapiCmsComponents')
      ? JSON.parse(localStorage.getItem('flapiCmsComponents') as string)
      : []
  }
})
</script>
