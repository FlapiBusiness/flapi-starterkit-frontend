<template>
  <div class="grid min-h-screen w-full grid-cols-[auto,1fr] overflow-x-hidden">
    <FlapiCmsSidebar @select="triggerFlapiCmsComponent($event)" />
    <div class="px-4">
      <slot />
    </div>

    <BaseModal v-model="isFooterSectionOpen">
      <FotterSectionForm @submit="" />
    </BaseModal>

    <BaseModal v-model="isHeroSectionOpen">
      <HeroSectionForm @submit="addFlapiCmsComponent($event)" />
    </BaseModal>

    <!-- Flapi CMS Publish Button -->
    <div class="fixed right-8 top-8 z-50">
      <FlapiButton @click="publishFlapiCmsComponents"> Publier la page </FlapiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import FlapiCmsSidebar from '@/components/siderbar/FlapiCmsSidebar.vue'
import type { FlapiComponentCardProps } from '@/components/card/ComponentCard.vue'
import { useFlapiCmsComponentStore } from '@/stores/flapiCmsComponentStore'
import type { FlapiCmsComponent } from '@/stores/flapiCmsComponentStore'
import HeroSectionForm from '~/components/froms/HeroSectionForm.vue'
import FotterSectionForm from '~/components/froms/FotterSectionForm.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { HeroSectionPayload } from '~/components/froms/HeroSectionForm.vue'

// const isOpen: Ref<boolean> = ref(false)
const isHeroSectionOpen: Ref<boolean> = ref(false)
const isFooterSectionOpen: Ref<boolean> = ref(false)
const currentComponent: Ref<FlapiComponentCardProps | null> = ref(null)

const flapiCmsComponentStore: ReturnType<typeof useFlapiCmsComponentStore> = useFlapiCmsComponentStore()
/**
 * This function triggers the Flapi CMS component modal.
 * @returns {void}
 * @param {FlapiComponentCardProps} component - The component to add.
 */
const triggerFlapiCmsComponent: (component: FlapiComponentCardProps) => void = (
  component: FlapiComponentCardProps,
): void => {
  currentComponent.value = component

  switch (component.type) {
    case 'FlapiHeroSection':
      isHeroSectionOpen.value = true
      break
    case 'FlapiFooterSection':
      isFooterSectionOpen.value = true
      break
    default:
      console.warn('Unknown component type:', component.type)
  }
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

  isHeroSectionOpen.value = false
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
