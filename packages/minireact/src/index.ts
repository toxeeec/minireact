import { commitRoot, Container, Fiber, FiberRoot, performUnitOfWork } from "./fiber"
import { HTMLElementType, Props, ReactElement } from "./types"

class ReactDOMRoot {
	#internalRoot: FiberRoot

	constructor(internalRoot: FiberRoot) {
		this.#internalRoot = internalRoot
	}

	render(children: ReactElement) {
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
	}
	const fiberRoot: FiberRoot = { container, current: fiber }
	fiber.stateNode = fiberRoot
	return new ReactDOMRoot(fiberRoot)
}

export function jsx(type: HTMLElementType, props: Props): ReactElement {
	return { type, props }
}
