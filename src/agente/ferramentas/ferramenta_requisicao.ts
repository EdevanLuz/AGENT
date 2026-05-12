import { tool } from "@openrouter/agent";
import { z } from "zod";

export const ferramenta_requisicao = tool({
  name: "fazer_chamada_api",
  description: "Faz uma requisição HTTP (GET ou POST) para uma URL externa.",
  inputSchema: z.object({
    url: z.string().describe("A URL completa da API ou site"),
    metodo: z.enum(["GET", "POST"]).default("GET"),
    corpo: z.any().optional().describe("O corpo da requisição (para POST)"),
    headers: z.record(z.string()).optional().describe("Cabeçalhos extras, se necessário")
  }),
  execute: async ({ url, metodo, corpo, headers }) => {
    try {
      console.log(`\n🌐 [HTTP] \({metodo} -> \){url}`);
      
      const response = await fetch(url, {
        method: metodo,
        headers: {
          "Content-Type": "application/json",
          ...headers
        },
        body: corpo ? JSON.stringify(corpo) : undefined
      });

      const dados = await response.json();
      return { status: response.status, dados };
    } catch (error: any) {
      return { erro: error.message };
    }
  },
});
