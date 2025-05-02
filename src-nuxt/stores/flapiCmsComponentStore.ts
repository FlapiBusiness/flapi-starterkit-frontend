import { defineStore } from 'pinia'

/**
 * FlapiCmsComponent interface.
 * @interface
 */
export interface FlapiCmsComponent {
  type: string
  order: number
  data: Record<string, unknown>
  page_slug: string
}

/**
 * FlapiCmsComponent store.
 */
interface FlapiCmsComponentState {
  components: FlapiCmsComponent[]
}
/**
 * FlapiCmsComponent actions.
 * @interface
 */
interface FlapiCmsComponentActions {
  setFlapiCmsComponents(components: FlapiCmsComponent[]): void
  addFlapiCmsComponent(component: FlapiCmsComponent): void
  publishFlapiCmsComponents(): void
}

/**
 * FlapiCmsComponent store.
 * @type {import('pinia').DefineStore<'FlapiCmsComponentStore', FlapiCmsComponentState, {}, FlapiCmsComponentActions>}
 * @returns {import('pinia').StoreWithoutState<import('pinia').DefineStoreOptions<'FlapiCmsComponentStore', FlapiCmsComponentState, {}, FlapiCmsComponentActions>>}
 */
export const useFlapiCmsComponentStore: ReturnType<
  typeof defineStore<'flapiCmsComponentStore', FlapiCmsComponentState, {}, FlapiCmsComponentActions>
> = defineStore<'flapiCmsComponentStore', FlapiCmsComponentState, {}, FlapiCmsComponentActions>(
  'flapiCmsComponentStore',
  {
    /**
     * FlapiCmsComponent store state.
     * @returns {FlapiCmsComponentState} The state of the components store.
     */
    state: (): FlapiCmsComponentState => ({
      components: [],
    }),
    actions: {
      /**
       * Set the components
       * @param {FlapiCmsComponent[]} components - The components.
       * @returns {void}
       */
      setFlapiCmsComponents(components: FlapiCmsComponent[]): void {
        this.components = components
      },
      /**
       * Add a component
       * @param {FlapiCmsComponent} component - The component.
       * @returns {void}
       */
      addFlapiCmsComponent(component: FlapiCmsComponent): void {
        this.components.push(component)
      },

      /**
       * Publish the components
       * @returns {void}
       */
      publishFlapiCmsComponents(): void {
        // save the components to lacal storage
        localStorage.setItem('flapiCmsComponents', JSON.stringify(this.components))
      },
    },
  },
)
