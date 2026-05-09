import { tool } from "@openrouter/agent";
import { z } from "zod";

export const ferramenta_clima = tool({
  name: "get_weather",
  description: "Busca a temperatura de uma cidade",
  inputSchema: z.object({
    cidade: z.string().describe("O nome da cidade"),
  }),
  execute: async ({ cidade }) => {
    return { cidade, temperatura: "22°C", clima: "Ensolarado" };
  },
});
