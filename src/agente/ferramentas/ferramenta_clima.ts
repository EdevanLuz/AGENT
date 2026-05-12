import { tool } from "@openrouter/agent";
import { z } from "zod";

export const ferramenta_clima = tool({
  name: "get_weather",
  description: "Busca a temperatura de uma ou mais cidades simultaneamente",
  inputSchema: z.object({
    // Mudamos de string para um array de strings
    cidades: z.array(z.string()).describe("Uma lista com os nomes das cidades"),
  }),
  execute: async ({ cidades }) => {
    // Usamos o Promise.all para disparar todas as consultas ao mesmo tempo
    const resultados = await Promise.all(
      cidades.map(async (cidade) => {
        // Aqui você faria a chamada real para uma API de clima
        // Por enquanto, simulando o retorno para cada cidade
        return { 
          cidade, 
          temperatura: `${Math.floor(Math.random() * 15) + 15}°C`, 
          clima: "Ensolarado" 
        };
      })
    );

    return { resultados };
  },
});
