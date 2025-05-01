<template>
  <FlapiSelect
    id="select-field"
    label="Select an Option"
    :modelValue="modelValue"
    :options="options"
    :required="false"
  />
</template>

<script lang="ts" setup>
import type { SelectOption } from '@flapi/cms-designsystem/core'
/**
 * @description
 * This is the model value for the select field.
 */
export type ModelValue = {
  label: string
  value: string
}

const modelValue: ModelValue = { label: 'Option 1', value: 'option1' }

const options: SelectOption[] = [
  {
    label: 'Option 1',
    value: 'option1',
  },
  {
    label: 'Option 2',
    value: 'option2',
  },
  {
    label: 'Option 3',
    value: 'option3',
  },
]
</script>
