type Container = Element | Document | DocumentFragment;

type FiberRoot = {
  container: Container;
};

type ReactElement = {
  type: string;
  props: object;
};

class ReactDOMRoot {
  #internalRoot: FiberRoot;

  constructor(internalRoot: FiberRoot) {
    this.#internalRoot = internalRoot;
  }

  render(children: ReactElement) {}
}

export function createRoot(container: Container): ReactDOMRoot {
  return new ReactDOMRoot({ container });
}

export function jsx(type: string, props: object): ReactElement {
  return { type, props };
}
