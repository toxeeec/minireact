import { createRoot, jsx } from "minireact"

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
			jsx("button", {
				children: "Button",
				onClick: () => console.log("click"),
			}),
			jsx("input", { onInput: (e) => console.log(e.currentTarget.value) }),
		],
	}),
)

new EventSource("/esbuild").addEventListener("change", () => location.reload())
