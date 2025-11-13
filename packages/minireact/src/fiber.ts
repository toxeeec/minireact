import { HTMLElementType, Props, ReactNode } from "./types"

export type Container = Element | Document | DocumentFragment

export type FiberRoot = {
	container: Container
	current: Fiber
}

export type Fiber = (
	| { tag: "HOST_ROOT"; props: Props | null; stateNode: FiberRoot }
	| {
			tag: "HOST_COMPONENT"
			type: HTMLElementType
			props: Props
			stateNode: Element | null
	  }
	| { tag: "HOST_TEXT"; props: string; stateNode: Text | null }
) & { parent: Fiber | null; child: Fiber | null }

export function performUnitOfWork(unitOfWork: Fiber): Fiber | null {
	switch (unitOfWork.tag) {
		case "HOST_ROOT":
		case "HOST_COMPONENT": {
			const children = unitOfWork.props?.children
			reconcileChildren(unitOfWork, children)
			break
		}
		case "HOST_TEXT": {
			break
		}
		default:
			return unitOfWork satisfies never
	}

	if (unitOfWork.child) return unitOfWork.child
	let nextUnitOfWork: Fiber | null = unitOfWork
	while (nextUnitOfWork) {
		completeUnitOfWork(nextUnitOfWork)
		nextUnitOfWork = nextUnitOfWork.parent
	}
	return nextUnitOfWork
}

export function commitRoot(root: FiberRoot) {
	const child = root.current.child
	if (!child || !child.stateNode) throw new Error("child or its stateNode is null")
	if (child.tag === "HOST_ROOT") throw new Error("child of a root was also a root")

	root.container.appendChild(child.stateNode)
}

function reconcileChildren(fiber: Fiber, children: ReactNode | undefined) {
	if (!children) return

	if (typeof children === "string") {
		fiber.child = {
			tag: "HOST_TEXT",
			props: children,
			stateNode: null,
			parent: fiber,
			child: null,
		}
	} else {
		fiber.child = {
			tag: "HOST_COMPONENT",
			type: children.type,
			props: children.props,
			stateNode: null,
			parent: fiber,
			child: null,
		}
	}
}

function completeUnitOfWork(unitOfWork: Fiber) {
	switch (unitOfWork.tag) {
		case "HOST_ROOT":
			break
		case "HOST_COMPONENT": {
			const instance = createInstance(unitOfWork.type, unitOfWork.props)
			appendAllChildren(instance, unitOfWork)
			unitOfWork.stateNode = instance
			break
		}
		case "HOST_TEXT":
			if (!unitOfWork.stateNode) {
				unitOfWork.stateNode = createTextInstance(unitOfWork.props)
			}
			break
		default:
			return unitOfWork satisfies never
	}
}

function appendAllChildren(parent: Element, fiber: Fiber) {
	const node = fiber.child
	if (!node) return

	if (!node.stateNode) throw new Error("node.stateNode is null")
	if (node.tag === "HOST_COMPONENT" || node.tag == "HOST_TEXT") {
		parent.appendChild(node.stateNode)
	} else {
		throw new Error(`unexpected tag: ${node.tag}`)
	}
}

function createInstance(type: HTMLElementType, props: object) {
	const el = document.createElement(type)
	Object.entries(props)
		.filter(([key]) => key !== "children")
		.forEach(([key, value]) => {
			el[key] = value
		})
	return el
}

function createTextInstance(text: string) {
	return document.createTextNode(text)
}
