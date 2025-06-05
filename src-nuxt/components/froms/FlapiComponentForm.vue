<template>
  <div class="flex max-h-[80vh] w-full min-w-[1200px] max-w-2xl flex-col gap-4 overflow-y-auto">
    <div class="mb-6 flex items-start justify-between">
      <div>
        <h2 class="text-xl font-bold text-gray-800">{{ component.name }}</h2>
        <p v-if="component.description" class="mt-1 text-gray-600">{{ component.description }}</p>
      </div>
      <span class="text-xs rounded bg-indigo-100 px-2 py-1 font-medium text-indigo-800">
        {{ component.category }}
      </span>
    </div>

    <form @submit.prevent="handleSubmit" class="space-y-6">
      <!-- Props Section -->
      <div v-if="component.props?.length" class="space-y-4">
        <h3 class="text-sm font-medium text-gray-700">Propriétés</h3>

        <div v-for="(prop, index) in component.props" :key="index" class="space-y-2">
          <div class="flex items-center justify-between">
            <label class="block text-sm font-medium capitalize text-gray-700">
              {{ prop.name }}
              <span v-if="prop.required" class="text-red-500">*</span>
            </label>
            <span v-if="prop.type.names?.length" class="text-xs text-gray-500">
              {{ prop.type.names.join(' | ') }}
            </span>
          </div>

          <!-- String Input -->
          <FlapiInput
            v-if="prop.type.names?.includes('string')"
            v-model:value="formValues[prop.name]"
            :label="prop.name"
            :placeholder="prop.defaultValue ? getDefaultValue(prop.defaultValue) : ''"
            type="text"
          />

          <!-- Number Input -->
          <FlapiInput
            v-else-if="prop.type.names?.includes('number')"
            v-model:value="formValues[prop.name]"
            :label="prop.name"
            :placeholder="prop.defaultValue ? getDefaultValue(prop.defaultValue) : ''"
            type="number"
          />

          <!-- Boolean Checkbox -->
          <div v-else-if="prop.type.names?.includes('boolean')" class="flex items-center">
            <FlapiCheckbox v-model:checked="formValues[prop.name]" :label="prop.name" />
          </div>

          <!-- Color Picker -->
          <div v-else-if="prop.name.includes('Color')" class="flex items-center gap-2">
            <FlapiColorPicker v-model:value="formValues[prop.name]" :label="prop.name" />
          </div>

          <!-- Enum Select -->
          <FlapiSelect
            v-else-if="prop.type.elements?.length"
            v-model:value="formValues[prop.name]"
            :label="prop.name"
            :options="prop.type.elements.map((el) => ({ value: el.name, label: el.name }))"
          />

          <!-- Unsupported Type -->
          <div v-else class="rounded bg-gray-50 p-2 text-sm text-gray-500">
            Type non géré : {{ prop.type.names?.join(', ') || 'Inconnu' }}
          </div>

          <p v-if="prop.defaultValue" class="text-xs text-gray-500">
            Valeur par défaut : {{ getDefaultValue(prop.defaultValue) }}
          </p>
        </div>
      </div>

      <!-- Slots Section -->
      <div v-if="component.slots?.length" class="border-t border-gray-200 pt-4">
        <h3 class="mb-2 text-sm font-medium text-gray-700">Slots</h3>
        <div v-for="(slot, index) in component.slots" :key="`slot-${index}`" class="mb-2">
          <div class="flex items-center justify-between">
            <label class="text-sm text-gray-600">{{ slot.name }}</label>
            <span v-if="slot.scoped" class="text-xs rounded bg-yellow-100 px-2 py-1 text-yellow-800"> Scoped </span>
          </div>
          <div v-if="slot.bindings?.length" class="ml-4 mt-1">
            <div v-for="(binding, bIndex) in slot.bindings" :key="`binding-${bIndex}`" class="text-xs text-gray-500">
              {{ binding.name }} ({{ binding.title }})
            </div>
          </div>
        </div>
      </div>

      <!-- Events Section -->
      <div v-if="component.events?.length" class="border-t border-gray-200 pt-4">
        <h3 class="mb-2 text-sm font-medium text-gray-700">Événements</h3>
        <div
          v-for="(event, index) in component.events"
          :key="`event-${index}`"
          class="mb-1 flex items-center justify-between"
        >
          <span class="text-sm text-gray-600">{{ event.name }}</span>
          <span v-if="event.type" class="text-xs text-gray-500">
            {{ event.type.names?.join(' | ') || 'Inconnu' }}
          </span>
        </div>
      </div>

      <div class="border-t border-gray-200 pt-4">
        <FlapiButton type="submit" variant="primary" size="md" class="w-full"> Générer le composant </FlapiButton>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import type { Prop, DefaultValue, FlapiCmsComponent } from '~/composables/type/FlapiCmsComponent'
/**
 * @description
 * This is the model value for the Flapi CMS component form.
 * @property {string} name - The name of the component.
 */
export type FlapiFormProps = {
  component: FlapiCmsComponent
}

const props: FlapiFormProps = defineProps({
  component: {
    type: Object as () => FlapiCmsComponent,
    required: true,
  },
})

const formValues: Ref = ref<Record<string, any>>({})

/**
 * @description
 * This function retrieves the default value for a prop.
 * It handles different types of default values such as strings, booleans, and numbers.
 * @param {DefaultValue} defaultValue - The default value object containing func and value.
 * @returns {any} The processed default value.
 */
const getDefaultValue: (defaultValue: DefaultValue) => any = (defaultValue: DefaultValue) => {
  if (defaultValue.func) return null

  // Supprimer les quotes pour les strings
  if (defaultValue.value.startsWith("'") && defaultValue.value.endsWith("'")) {
    return defaultValue.value.slice(1, -1)
  }

  // Convertir les boolean strings en boolean
  if (defaultValue.value === 'true') return true
  if (defaultValue.value === 'false') return false

  // Convertir les nombres
  if (!isNaN(Number(defaultValue.value))) {
    return Number(defaultValue.value)
  }

  return defaultValue.value
}

const emit: (event: 'submit', values: Record<string, any>) => void = defineEmits<{
  (event: 'submit', value: Record<string, any>): void
}>()

/**
 * @description
 * This function handles the form submission.
 * It validates the form values and emits the 'submit' event with the values.
 */
const handleSubmit: () => void = () => {
  for (const key in formValues.value) {
    if (formValues.value[key] === undefined || formValues.value[key] === null) {
      formValues.value[key] = ''
    }
  }

  emit('submit', formValues.value)
}

onMounted(() => {
  console.log('FlapiComponentForm mounted with props:', props)

  props.component.props?.forEach((prop: Prop) => {
    if (prop.defaultValue) {
      console.log('Initializing prop:', prop.name, 'with default value:', getDefaultValue(prop.defaultValue))
    } else {
      console.log('No default value for prop:', prop.name)
    }
  })
})
</script>
