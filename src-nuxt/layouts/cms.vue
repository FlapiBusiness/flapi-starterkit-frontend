<template>
  <div class="grid min-h-screen w-full grid-cols-[auto,1fr] overflow-x-hidden">
    <FlapiCmsSidebar @select="triggerFlapiCmsComponent($event)" />

    <div class="px-4">
      <slot />
    </div>

    <BaseModal v-model="isModalOpen">
      <component :is="activeFormComponent" v-if="activeFormComponent" @submit="addFlapiCmsComponent" />
    </BaseModal>

    <div class="fixed right-8 top-8 z-50">
      <FlapiButton @click="publishFlapiCmsComponents"> Publier la page </FlapiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref, ComputedRef } from 'vue'

// Store
import { useFlapiCmsComponentStore } from '@/stores/flapiCmsComponentStore'
import type { FlapiCmsComponent } from '@/stores/flapiCmsComponentStore'

// Components
import FlapiCmsSidebar from '@/components/siderbar/FlapiCmsSidebar.vue'
import HeroSectionForm from '~/components/froms/HeroSectionForm.vue'
import FooterSectionForm from '~/components/froms/FooterSectionForm.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import type { FlapiComponentCardProps } from '@/components/card/ComponentCard.vue'
import type { HeroSectionPayload } from '~/components/froms/HeroSectionForm.vue'

// Store
const flapiCmsComponentStore: ReturnType<typeof useFlapiCmsComponentStore> = useFlapiCmsComponentStore()

// Ref
const isModalOpen: Ref<boolean> = ref(false)
const currentComponent: Ref<FlapiComponentCardProps | null> = ref(null)

const componentFormMap: Record<string, any> = {
  FlapiHeroSection: HeroSectionForm,
  FlapiFooterSection: FooterSectionForm,
  // add more types here
}

const activeFormComponent: ComputedRef = computed(() => {
  return currentComponent.value?.type ? componentFormMap[currentComponent.value.type] : null
})

/**
 * This function triggers the Flapi CMS component modal.
 * @returns {void}
 * @param {FlapiComponentCardProps} component - The component to add.
 */
const triggerFlapiCmsComponent: (component: FlapiComponentCardProps) => void = (
  component: FlapiComponentCardProps,
): void => {
  currentComponent.value = component
  isModalOpen.value = true
}

/**
 * This function adds a component to the CMS layout.
 * @param {HeroSectionPayload} component - The component to add.
 * @returns {void}
 */
const addFlapiCmsComponent: (component: HeroSectionPayload) => void = (component: HeroSectionPayload): void => {
  if (!currentComponent.value) {
    return
  }
  console.log('Component added:', currentComponent.value)
  const flapiCmsComponents: FlapiCmsComponent[] = flapiCmsComponentStore.components

  flapiCmsComponentStore.addFlapiCmsComponent({
    type: currentComponent.value.type,
    order: flapiCmsComponents.length + 1,
    data: {
      ...component,
    },
    page_slug: '/',
  })

  isModalOpen.value = false
  currentComponent.value = null
}

/**
 * This function adds a component to the CMS layout.
 * @returns {void}
 */
const publishFlapiCmsComponents: () => void = (): void => {
  flapiCmsComponentStore.publishFlapiCmsComponents()
}
</script>
