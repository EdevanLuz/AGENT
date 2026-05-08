import { tool } from "@openrouter/agent";
import { z } from "zod";

export const ferramenta_clima = tool({
    description: "Busca a temperatura de uma cidade",

    inputSchema: z.object({
        cidade: z.string(),
    }),

    execute: async ({ cidade }) => {
        return {
            cidade,
            temperatura: "22°C",
            clima: "Ensolarado",
        };
    },
});