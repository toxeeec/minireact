import { commitRoot, Container, Fiber, FiberRoot, performUnitOfWork } from "./fiber"
import { HostComponentProps, HTMLElementType, ReactElement, ReactNode } from "./types"

class ReactDOMRoot {
	#internalRoot: FiberRoot

	constructor(internalRoot: FiberRoot) {
		this.#internalRoot = internalRoot
	}

	render(children: ReactNode) {
		const { current } = this.#internalRoot
		current.props = { children }
		let workInProgress: Fiber | null = this.#internalRoot.current
		while (workInProgress) {
			workInProgress = performUnitOfWork(workInProgress)
		}
		commitRoot(this.#internalRoot)
	}
}

export function createRoot(container: Container): ReactDOMRoot {
	const fiber: Fiber = {
		tag: "HOST_ROOT",
		props: null,
		stateNode: null as unknown as FiberRoot,
		parent: null,
		child: null,
		sibling: null,
	}
	const fiberRoot: FiberRoot = { container, current: fiber }
	fiber.stateNode = fiberRoot
	return new ReactDOMRoot(fiberRoot)
}

export function jsx<TElementType extends HTMLElementType>(
	type: TElementType,
	props: HostComponentProps<HTMLElementTagNameMap[TElementType]>,
): ReactElement {
	return { type, props: props as HostComponentProps }
}
