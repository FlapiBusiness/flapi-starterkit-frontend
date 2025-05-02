<template>
  <FlapiFooter :items="items" />
</template>

<script lang="ts" setup>
import FlapiFooter from '@/components/sections/FlapiFooter.vue'
import type { FooterItem } from '@/components/sections/FlapiFooter.vue'

const items: FooterItem[] = [
  {
    title: 'SERVICES',
    'sub-items': [
      { link: '/services', 'sub-title': 'Nos services' },
      { link: '/pricing', 'sub-title': 'Tarifs' },
      { link: '/blog', 'sub-title': 'Blog' },
      { link: '/faq', 'sub-title': 'FAQ' },
      { link: '/support', 'sub-title': 'Support' },
    ],
  },
  {
    title: 'À PROPOS',
    'sub-items': [
      { link: '/our-story', 'sub-title': 'Notre histoire' },
      { link: '/about', 'sub-title': 'À propos' },
      { link: '/contact', 'sub-title': 'Contact' },
      { link: '/terms', 'sub-title': 'Mentions légales' },
    ],
  },
  {
    title: 'SUIVEZ-NOUS',
    'sub-items': [
      { link: '/twitter', 'sub-title': 'Twitter' },
      { link: '/github', 'sub-title': 'GitHub' },
      { link: '/linkedin', 'sub-title': 'LinkedIn' },
      { link: '/youtube', 'sub-title': 'YouTube' },
      { link: '/instagram', 'sub-title': 'Instagram' },
      { link: '/facebook', 'sub-title': 'Facebook' },
    ],
  },
]
</script>
