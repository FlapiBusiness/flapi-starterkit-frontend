<template>
  <nav class="flex h-full text-sm">
    <!-- Sidebar -->
    <div class="relative h-full w-[400px] bg-gray-500 shadow-md">
      <div class="h-full w-full">
        <!-- Sidebar Content -->
        <div class="flex h-full flex-col justify-between">
          <!-- Footer logout button -->
          <div class="m-4 grid grid-cols-2 items-center gap-4">
            <FlapiComponentCard
              v-for="component in flapiComponents"
              :key="component.type"
              :label="component.label"
              :type="component.type"
              :imageUrl="component.imageUrl"
              @select="emit('select', component)"
            />
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" setup>
import FlapiComponentCard from '@/components/card/ComponentCard.vue'
import type { FlapiComponentCardProps } from '@/components/card/ComponentCard.vue'

const flapiComponents: FlapiComponentCardProps[] = [
  {
    label: 'Section',
    type: 'FlapiHeroSection',
  },
  {
    label: 'Footer',
    type: 'FlapiFooterSection',
  },
]

const emit: (event: 'select', component: FlapiComponentCardProps) => void = defineEmits<{
  (event: 'select', component: FlapiComponentCardProps): void
}>()
</script>
