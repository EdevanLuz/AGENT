import { callModel } from "@openrouter/agent";

import { ferramenta_clima } from "./ferramentas/ferramenta_clima";

export const agente = createAgent({
    model: "openai/gpt-4.1-mini",

    system: `
Você é um assistente útil.
Sempre use ferramentas quando necessário.
`,

    tools: {
        clima: ferramenta_clima,
    },
});