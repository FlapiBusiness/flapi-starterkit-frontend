<template>
  <div class="grid min-h-screen w-full grid-cols-[auto,1fr] overflow-x-hidden">
    <FlapiCmsSidebar @select="triggerFlapiCmsComponent($event)" />

    <div class="px-4">
      <slot />
    </div>

    <BaseModal v-model="isModalOpen">
      <component
        :is="activeFormComponent"
        v-if="activeFormComponent"
        :component="currentComponent"
        @submit="addFlapiCmsComponent"
      />
    </BaseModal>

    <div class="fixed right-8 top-8 z-50">
      <FlapiButton @click="publishCmsComponentStores"> Publier la page </FlapiButton>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import type { Ref, ComputedRef } from 'vue'

// Store
import { useCmsComponentStore } from '~/stores/cmsComponentStore'
import type { CmsComponentStore } from '~/stores/cmsComponentStore'

// Components
import FlapiCmsSidebar from '@/components/siderbar/FlapiCmsSidebar.vue'
import HeroSectionForm from '~/components/froms/HeroSectionForm.vue'
import FooterSectionForm from '~/components/froms/FooterSectionForm.vue'
import FlapiComponentForm from '~/components/froms/FlapiComponentForm.vue'
import BaseModal from '@/components/ui/BaseModal.vue'
import type { FlapiCmsComponentCardProps } from '@/components/card/FlapiCmsComponentCard.vue'
import type { HeroSectionPayload } from '~/components/froms/HeroSectionForm.vue'
import type { FlapiComponentCardProps } from '~/components/card/ComponentCard.vue'

// Store
const flapiCmsComponentStore: ReturnType<typeof useCmsComponentStore> = useCmsComponentStore()

// Ref
const isModalOpen: Ref<boolean> = ref(false)
const currentComponent: Ref<FlapiCmsComponentCardProps | FlapiComponentCardProps | CmsComponentStore | null> = ref(null)

const componentFormMap: Record<string, any> = {
  FlapiHeroSection: HeroSectionForm,
  FlapiFooterSection: FooterSectionForm,
  // add more types here
}

const activeFormComponent: ComputedRef = computed(() => {
  // TODO: Add more component forms as needed
  if (currentComponent.value && !componentFormMap[currentComponent.value.name]) {
    return FlapiComponentForm
  }
  return currentComponent.value?.name ? componentFormMap[currentComponent.value.name] : null
})

/**
 * This function triggers the Flapi CMS component modal.
 * @returns {void}
 * @param {FlapiCmsComponentCardProps | FlapiComponentCardProps | CmsComponentStore} component - The component to trigger.
 */
const triggerFlapiCmsComponent: (
  component: FlapiCmsComponentCardProps | FlapiComponentCardProps | CmsComponentStore,
) => void = (component: FlapiCmsComponentCardProps | FlapiComponentCardProps | CmsComponentStore): void => {
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
  const flapiCmsComponents: CmsComponentStore[] = flapiCmsComponentStore.components

  flapiCmsComponentStore.addCmsComponentStore({
    name: currentComponent.value.name,
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
const publishCmsComponentStores: () => void = (): void => {
  flapiCmsComponentStore.publishCmsComponentStores()
}
</script>
