<template>
  <div @click="emitSelect()" class="card">
    <h1>{{ props.label }}</h1>
    <!-- <p>Type: {{ props.type }}</p> -->
    <p v-if="props.icon">Icon: {{ props.icon }}</p>

    <FlapiIcon
      v-if="props.icon"
      color="#fff"
      :height="24"
      mode="stroke"
      :name="props.icon"
      viewBox="0 0 24 24"
      :width="24"
    />
  </div>
</template>

<script lang="ts" setup>
/**
 * @description
 * This is the model value for the select field.
 * @property {string} label - The label of the component.
 * @property {string} type - The type of the component.
 * @property {string} [icon] - The icon of the component.
 */
type FlapiComponentCardProps = {
  label: string
  type: string
  icon?: string
}

const props: FlapiComponentCardProps = defineProps({
  label: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  icon: {
    type: String,
    default: '',
  },
})

const emit: (event: 'select', ...args: any[]) => void = defineEmits(['select'])

/**
 * @description
 * This function is used to emit the click event.
 */
const emitSelect: () => void = () => {
  emit('select', props.type)
}
</script>
