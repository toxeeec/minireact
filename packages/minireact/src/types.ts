export type ReactNode =
	| ReactElement
	| Array<ReactNode>
	| boolean
	| number
	| bigint
	| string
	| null
	| undefined

export interface Props extends Record<string, unknown> {
	children?: ReactNode
}

export interface HostComponentProps<TElement extends HTMLElement = HTMLElement>
	extends Props,
		EventListeners<TElement> {}

export type HTMLElementType = keyof HTMLElementTagNameMap

export type ReactElement = {
	type: HTMLElementType
	props: HostComponentProps
}

type Head<T extends string> = T extends `${infer Head}${string}` ? Head : never
type Tail<T extends string> = T extends `${string}${infer Tail}` ? Tail : never

type EventListener<TEvent extends Event, TElement extends HTMLElement> = (
	e: TEvent & {
		target: TEvent["target"] & HTMLElement
		currentTarget: TEvent["currentTarget"] & TElement
	},
) => void

type EventListeners<TElement extends HTMLElement> = {
	[K in keyof HTMLElementEventMap as `on${Uppercase<Head<K>>}${Tail<K>}`]?: EventListener<
		HTMLElementEventMap[K],
		TElement
	>
}
