export type ReactNode =
	| ReactElement
	| Array<ReactNode>
	| boolean
	| number
	| bigint
	| string
	| null
	| undefined

export type Props = Record<string, unknown> & {
	children?: ReactNode
}

export type HTMLElementType = keyof HTMLElementTagNameMap

export type ReactElement = {
	type: HTMLElementType
	props: Props
}
