export type Props = Record<string, unknown> & {
	children?: ReactNode
}

export type HTMLElementType = keyof HTMLElementTagNameMap

export type ReactElement = {
	type: HTMLElementType
	props: Props
}

export type ReactNode = ReactElement | string
