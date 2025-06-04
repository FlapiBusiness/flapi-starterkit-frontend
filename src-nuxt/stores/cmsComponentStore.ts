import { defineStore } from 'pinia'

/**
 * CmsComponentStore interface.
 * @interface
 */
export interface CmsComponentStore {
  name: string
  order: number
  data: Record<string, unknown>
  page_slug: string
}

/**
 * CmsComponentStore store.
 */
interface CmsComponentStoreState {
  components: CmsComponentStore[]
}
/**
 * CmsComponentStore actions.
 * @interface
 */
interface CmsComponentStoreActions {
  setCmsComponentStores(components: CmsComponentStore[]): void
  addCmsComponentStore(component: CmsComponentStore): void
  publishCmsComponentStores(): void
}

/**
 * CmsComponentStore store.
 * @type {import('pinia').DefineStore<'CmsComponentStoreStore', CmsComponentStoreState, {}, CmsComponentStoreActions>}
 * @returns {import('pinia').StoreWithoutState<import('pinia').DefineStoreOptions<'CmsComponentStoreStore', CmsComponentStoreState, {}, CmsComponentStoreActions>>}
 */
export const useCmsComponentStore: ReturnType<
  typeof defineStore<'CmsComponentStoreStore', CmsComponentStoreState, {}, CmsComponentStoreActions>
> = defineStore<'CmsComponentStoreStore', CmsComponentStoreState, {}, CmsComponentStoreActions>(
  'CmsComponentStoreStore',
  {
    /**
     * CmsComponentStore store state.
     * @returns {CmsComponentStoreState} The state of the components store.
     */
    state: (): CmsComponentStoreState => ({
      components: [],
    }),
    actions: {
      /**
       * Set the components
       * @param {CmsComponentStore[]} components - The components.
       * @returns {void}
       */
      setCmsComponentStores(components: CmsComponentStore[]): void {
        this.components = components
      },
      /**
       * Add a component
       * @param {CmsComponentStore} component - The component.
       * @returns {void}
       */
      addCmsComponentStore(component: CmsComponentStore): void {
        this.components.push(component)
      },

      /**
       * Publish the components
       * @returns {void}
       */
      publishCmsComponentStores(): void {
        // save the components to lacal storage
        if (typeof window !== 'undefined') {
          localStorage.setItem('CmsComponentStores', JSON.stringify(this.components))
        }
      },
    },
  },
)
