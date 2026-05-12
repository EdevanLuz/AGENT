import dotenv from "dotenv";

import { Agent } from "./agent.js";

import { ferramenta_clima } from "./ferramentas/ferramenta_clima.ts";
import { ferramenta_requisicao } from "./ferramentas/ferramenta_requisicao.ts";

dotenv.config();

// Agente principal unificado
export const meuAgente = new Agent({
  apiKey: process.env.OPENROUTER_API_KEY,
  
  model: "openrouter/owl-alpha",

  instructions: `
    Você é o AGENTE PRINCIPAL.

    Resolva as tarefas diretamente usando as ferramentas disponíveis.

    Use a ferramenta 'ferramenta_clima' para consultas de previsão do tempo.

    Para APIs e dados externos, utilize a ferramenta 'ferramenta_requisicao'.
  `,

  tools: [
    ferramenta_clima,
    ferramenta_requisicao,
  ],
});
