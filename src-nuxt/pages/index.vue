<template>
  <div v-if="flapiCmsComponents.length">
    <FlapiHeroComponent
      v-for="component in flapiCmsComponents"
      :title="component.data.title as string"
      :content="component.data.content as string"
      :imageUrl="component.data.imageUrl as string"
      :showImage="component.data.showImage as boolean"
      :showButton="component.data.showButton as boolean"
      :buttonLabel="component.data.buttonLabel as string"
    ></FlapiHeroComponent>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { FlapiCmsComponent } from '@/stores/flapiCmsComponentStore'
import FlapiHeroComponent from '@/components/sections/FlapiHeroSection.vue'

const flapiCmsComponents: Ref<FlapiCmsComponent[]> = ref([])

onMounted(() => {
  if (typeof window !== 'undefined') {
    flapiCmsComponents.value = localStorage.getItem('flapiCmsComponents')
      ? JSON.parse(localStorage.getItem('flapiCmsComponents') as string)
      : []
  }
})
</script>
