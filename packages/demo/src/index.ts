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
		],
	}),
)

new EventSource("/esbuild").addEventListener("change", () => location.reload())
