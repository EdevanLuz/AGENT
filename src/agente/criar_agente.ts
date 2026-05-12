import { Agent } from "./agent.js";
import {ferramenta_clima} from "./ferramentas/ferramenta_clima.ts";
import {ferramenta_requisicao} from "./ferramentas/ferramenta_requisicao.ts
import dotenv from "dotenv";

dotenv.config();

// Agente Principal Unificado
export const meuAgente = new Agent({
  apiKey: process.env.OPENROUTER_API_KEY,
  model: "openrouter/owl-alpha",
  instructions: `
    Você é o AGENTE PRINCIPAL. 
    Resolva as tarefas diretamente usando as ferramentas disponíveis.
    Use 'ferramenta_clima' para consultas de previsão do tempo.
    Para APIs e dados externos, use as ferramentas integradas do especialista em requisições.
  `,
  tools: [
    ferramenta_clima, ferramenta_requisicao]
});
