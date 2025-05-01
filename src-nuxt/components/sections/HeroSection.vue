<template>
  <section>
    <div>
      <div>
        <h1>{{ props.title }}</h1>
        <p>{{ props.content }}</p>
        <a v-if="props.showButton" :href="props.buttonLink">{{ props.buttonLabel }}</a>
      </div>
      <img v-if="props.showImage" :src="props.imageUrl" alt="Hero Image" />
    </div>
  </section>
</template>

<script lang="ts" setup>
/**
 * @description
 */
type FlapiHeroSectionProps = {
  title: string
  content: string
  imageUrl: string
  showImage: boolean
  showButton: boolean
  buttonLabel: string
  buttonLink: string
}

const props: FlapiHeroSectionProps = defineProps({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  showImage: {
    type: Boolean,
    default: true,
  },
  showButton: {
    type: Boolean,
    default: true,
  },
  buttonLabel: {
    type: String,
    default: 'Learn More',
  },
  buttonLink: {
    type: String,
    default: '#',
  },
})
</script>
