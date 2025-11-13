import { HTMLElementType, Props, ReactNode } from "./types";

export type Container = Element | Document | DocumentFragment;

export type FiberRoot = {
  container: Container;
  current: Fiber;
};

export type Fiber = (
  | { tag: "HOST_ROOT"; props: Props | null; stateNode: FiberRoot }
  | {
      tag: "HOST_COMPONENT";
      type: HTMLElementType;
      props: Props;
      stateNode: Element | null;
    }
  | { tag: "HOST_TEXT"; props: string; stateNode: Text | null }
) & { parent: Fiber | null; child: Fiber | null };

export function performUnitOfWork(unitOfWork: Fiber): Fiber | null {
  switch (unitOfWork.tag) {
    case "HOST_ROOT":
    case "HOST_COMPONENT": {
      const children = unitOfWork.props?.children;
      reconcileChildren(unitOfWork, children);
      break;
    }
    case "HOST_TEXT": {
      break;
    }
    default:
      return unitOfWork satisfies never;
  }

  if (unitOfWork.child) return unitOfWork.child;
  let nextUnitOfWork: Fiber | null = unitOfWork;
  while (nextUnitOfWork) {
    nextUnitOfWork = nextUnitOfWork.parent;
  }
  return nextUnitOfWork;
}

function reconcileChildren(fiber: Fiber, children: ReactNode | undefined) {
  if (!children) return;

  if (typeof children === "string") {
    fiber.child = {
      tag: "HOST_TEXT",
      props: children,
      stateNode: null,
      parent: fiber,
      child: null,
    };
  } else {
    fiber.child = {
      tag: "HOST_COMPONENT",
      type: children.type,
      props: children.props,
      stateNode: null,
      parent: fiber,
      child: null,
    };
  }
}
