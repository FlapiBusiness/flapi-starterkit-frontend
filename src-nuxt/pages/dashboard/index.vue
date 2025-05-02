<template>
  <div>
    <FlapiHeroSection
      v-for="component in flapiCmsComponents"
      :key="component.order"
      :title="component.data.title as string"
      :content="component.data.content as string"
      :imageUrl="component.data.imageUrl as string"
      :showImage="component.data.showImage as boolean"
      :showButton="component.data.showButton as boolean"
      :buttonLabel="component.data.buttonLabel as string"
    ></FlapiHeroSection>
  </div>
</template>

<script lang="ts" setup>
import { useFlapiCmsComponentStore } from '@/stores/flapiCmsComponentStore'
import type { FlapiCmsComponent } from '@/stores/flapiCmsComponentStore'
import FlapiHeroSection from '@/components/sections/FlapiHeroSection.vue'

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
