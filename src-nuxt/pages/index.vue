<template>
  <div>
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
import type { FlapiCmsComponent } from '@/stores/flapiCmsComponentStore'
import FlapiHeroComponent from '@/components/sections/FlapiHeroSection.vue'

const flapiCmsComponents: FlapiCmsComponent[] = localStorage.getItem('flapiCmsComponents')
  ? JSON.parse(localStorage.getItem('flapiCmsComponents') as string)
  : []
</script>
