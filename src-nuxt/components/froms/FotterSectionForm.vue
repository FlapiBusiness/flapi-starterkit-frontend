<template>
  <div class="flex flex-col gap-4">
    <FlapiInput v-model:value="values.title" label="Titre de la section" placeholder="Flapi CMS" type="text" />

    <div v-for="(item, index) in values.items" :key="index" class="border-t pt-4">
      <FlapiInput v-model:value="item.title" label="Titre de la colonne" placeholder="Par ex. Services" type="text" />

      <div v-for="(sub, subIndex) in item['sub-items']" :key="subIndex" class="ml-4 mt-2 flex flex-col gap-2">
        <FlapiInput v-model:value="sub['sub-title']" label="Nom du lien" placeholder="Ex: Blog" type="text" />
        <FlapiInput v-model:value="sub.link" label="Lien" placeholder="/blog" type="text" />
        <FlapiButton variant="ghost" class="text-red-500 w-fit" size="sm" @click="removeSubItem(index, subIndex)">
          Supprimer le lien
        </FlapiButton>
      </div>

      <FlapiButton variant="outline" class="mt-2 w-fit" size="sm" @click="addSubItem(index)">
        Ajouter un lien
      </FlapiButton>

      <FlapiButton variant="ghost" class="text-red-500 mt-2 w-fit" size="sm" @click="removeItem(index)">
        Supprimer la colonne
      </FlapiButton>
    </div>

    <FlapiButton variant="outline" class="mt-2 w-fit" size="sm" @click="addItem"> Ajouter une colonne </FlapiButton>

    <FlapiButton
      class="mt-4"
      :disabled="!formIsValid"
      variant="primary"
      size="lg"
      type="button"
      :loading="false"
      @click="submit"
    >
      Enregistrer le footer
    </FlapiButton>

    <FlapiAlert v-if="errorMessage" :message="errorMessage" variant="error" dismissible />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, type ComputedRef } from 'vue'

/**
 * @description
 * FooterSubItem represents a sub-item in the footer with a link and title.
 */
type FooterSubItem = {
  link: string
  'sub-title': string
}

/**
 * @description
 * FooterItem represents a sub-item in the footer with a link and title.
 */
type FooterItem = {
  title: string
  'sub-items': FooterSubItem[]
}

/**
 * @description
 * FlapiFooterPayload represents the payload for the footer section.
 */
type FlapiFooterPayload = {
  title: string
  items: FooterItem[]
}

const values: Ref<FlapiFooterPayload> = ref<FlapiFooterPayload>({
  title: 'Flapi CMS',
  items: [
    {
      title: 'Services',
      'sub-items': [{ link: '/blog', 'sub-title': 'Blog' }],
    },
  ],
})

const emit: (event: 'submit', values: FlapiFooterPayload) => void = defineEmits<{
  (event: 'submit', value: FlapiFooterPayload): void
}>()

const errorMessage: Ref<string | null> = ref<string | null>(null)

const formIsValid: ComputedRef<boolean> = computed(() => {
  return (
    values.value.title.trim() !== '' &&
    values.value.items.every(
      (item: FooterItem) =>
        item.title.trim() !== '' &&
        item['sub-items'].every((sub: FooterSubItem) => sub.link.trim() !== '' && sub['sub-title'].trim() !== ''),
    )
  )
})

/**
 * @description
 * submit emits the submit event with the form values.
 */
const submit: () => void = () => {
  if (formIsValid.value) {
    emit('submit', values.value)
    errorMessage.value = null // Réinitialiser le message d'erreur
  } else {
    errorMessage.value = 'Tous les champs doivent être remplis.'
  }
}

/**
 * @description
 * addItem adds a new item to the footer section.
 */
const addItem: () => void = () => {
  values.value.items.push({ title: '', 'sub-items': [] })
}

/**
 * @param {number} index - The index of the item in the items array.
 */
const removeItem: (index: number) => void = (index: number) => {
  if (index >= 0 && index < values.value.items.length) {
    values.value.items.splice(index, 1)
  }
}

/**
 * @param {number} index - The index of the item in the items array.
 */
const addSubItem: (index: number) => void = (index: number) => {
  if (index >= 0 && index < values.value.items.length) {
    values.value.items[index]['sub-items'].push({ link: '', 'sub-title': '' })
  }
}

/**
 * @param {number} itemIndex - The index of the item in the items array.
 * @param {number} subIndex - The index of the sub-item in the 'sub-items' array.
 * @description
 */
const removeSubItem: (itemIndex: number, subIndex: number) => void = (itemIndex: number, subIndex: number) => {
  if (
    itemIndex >= 0 &&
    itemIndex < values.value.items.length &&
    subIndex >= 0 &&
    subIndex < values.value.items[itemIndex]['sub-items'].length
  ) {
    values.value.items[itemIndex]['sub-items'].splice(subIndex, 1)
  }
}
</script>
