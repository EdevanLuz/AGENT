import { Agent } from "@openrouter/agent";

import { ferramenta_clima } from "./ferramentas/ferramenta_clima";

export const agente = new Agent({
    model: "openrouter/free",

    system: `
Você é um assistente útil.
Sempre use ferramentas quando necessário.
`,

    tools: {
        ferramenta_clima: ferramenta_clima,
    },
});
