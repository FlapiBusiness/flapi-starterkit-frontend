/**
 * FlapiCmsComponent interface definition
 * @description This interface defines the structure of a component's metadata in the Flapi system.
 * It includes properties such as name, description, props, category, slots, and events.
 * @property {string} name - The name of the component.
 * @property {string} description - A brief description of the component.
 * @property {Prop[]} [props] - An optional array of properties (props) that the component accepts.
 * @property {string} category - The category to which the component belongs.
 * @property {Slot[]} [slots] - An optional array of slots that the component can use.
 * @property {Event[]} [events] - An optional array of events that the component can emit.
 */
export type FlapiCmsComponent = {
  name: string
  description: string
  props?: Prop[]
  category: string
  slots?: Slot[]
  events?: Event[]
}

/**
 * Type definition for a component's property (prop).
 * @description This type defines the structure of a prop in a component's metadata.
 * It includes properties such as name, type, defaultValue, and whether it is required.
 * @property {string} name - The name of the prop.
 * @property {Type} type - The type of the prop.
 * @property {DefaultValue} [defaultValue] - An optional default value for the prop.
 * @property {boolean} [required] - An optional flag indicating if the prop is required.
 */
export type Prop = {
  name: string
  type: Type
  defaultValue?: DefaultValue
  required?: boolean
}

/**
 * Type definition for a component's default value.
 * @description This type defines the structure of a default value for a prop in a component's metadata.
 * It includes properties such as func (indicating if the default value is a function) and value (the actual default value).
 * @property {boolean} func - Indicates if the default value is a function.
 * @property {string} value - The actual default value of the prop.
 */
export type DefaultValue = {
  func: boolean
  value: string
}

/**
 * Type definition for a component's slot.
 * @description This type defines the structure of a slot in a component's metadata.
 * It includes properties such as name, scoped (indicating if the slot is scoped), and bindings (an array of bindings for the slot).
 * @property {string} name - The name of the slot.
 * @property {boolean} [scoped] - An optional flag indicating if the slot is scoped.
 * @property {Binding[]} [bindings] - An optional array of bindings associated with the slot.
 */
export type Slot = {
  name: string
  scoped?: boolean
  bindings?: Binding[]
}

/**
 * Type definition for a component's binding.
 * @description This type defines the structure of a binding in a component's metadata.
 * It includes properties such as name and title.
 * @property {string} name - The name of the binding.
 * @property {string} title - The title of the binding.
 */
export type Binding = {
  name: string
  title: string
}

/**
 * Type definition for a component's event.
 * @description This type defines the structure of an event in a component's metadata.
 * It includes properties such as name and type (which can have multiple names and optional elements).
 * @property {string} name - The name of the event.
 * @property {Type} [type] - An optional type definition for the event.
 */
export type Event = {
  name: string
  type?: Type
}

/**
 * Type definition for a component's type.
 * @description This type defines the structure of a type in a component's metadata.
 * It includes properties such as names (an array of strings) and optional elements (an array of Element).
 * @property {string[]} names - An array of names representing the type.
 * @property {Element[]} [elements] - An optional array of elements associated with the type.
 */
export type Type = {
  names: string[]
  elements?: Element[]
}

/**
 * Type definition for an element in a component's type.
 * @description This type defines the structure of an element in a component's type.
 * It includes properties such as name.
 * @property {string} name - The name of the element.
 */
export type Element = {
  name: string
}
