import { add } from "minireact";

const res = add(1, 2);
console.log(res);

new EventSource("/esbuild").addEventListener("change", () => location.reload());
