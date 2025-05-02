// src/components/sections/componentDisplayMap.ts
import FlapiHeroComponent from './FlapiHeroSection.vue'
import FlapiFooterComponent from './FlapiFooterSection.vue'
// ajoute d'autres composants ici

export const componentDisplayMap: Record<string, any> = {
  FlapiHeroSection: FlapiHeroComponent,
  FlapiFooterSection: FlapiFooterComponent,
}
