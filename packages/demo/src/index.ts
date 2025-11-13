import { createRoot, jsx } from "minireact"

createRoot(document.getElementById("root")!).render(jsx("div", { children: "Hello world" }))

new EventSource("/esbuild").addEventListener("change", () => location.reload())
