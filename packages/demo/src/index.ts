import { createRoot, jsx, ReactNode } from "minireact"

function NestedComponent({ text, children }: { text: string; children: ReactNode }) {
	return jsx("div", {
		children: [jsx("p", { children: text }), children],
	})
}

function Component({ text, children }: { text: string; children: ReactNode }) {
	return jsx("div", {
		children: [
			jsx("p", { children: text }),
			jsx("button", {
				children: "Button",
				onClick: () => console.log("click"),
			}),
			jsx("input", { onInput: (e) => console.log(e.currentTarget.value) }),
			jsx(NestedComponent, { text: "Nested component", children }),
		],
	})
}

createRoot(document.getElementById("root")!).render(
	jsx("div", {
		children: [
			jsx("p", { children: "Child one" }),
			jsx("p", { children: "Child two" }),
			jsx("div", {
				children: [
					jsx("p", { children: "Child one" }),
					jsx("p", { children: "Child two" }),
				],
			}),
			jsx(Component, {
				text: "Component",
				children: jsx("p", { children: "Component child" }),
			}),
		],
	}),
)

new EventSource("/esbuild").addEventListener("change", () => location.reload())
