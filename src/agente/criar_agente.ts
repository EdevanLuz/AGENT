import { Agent } from "./agent.js";
import { ferramenta_clima } from "./ferramentas/ferramenta_clima.js";
import dotenv from "dotenv";

dotenv.config();

export const meuAgente = new Agent({
  apiKey: process.env.OPENROUTER_API_KEY,
  model: "inclusionai/ring-2.6-1t:free",
  instructions: `
Você é um assistente meteorológico eficiente.

SUA MISSÃO:
- Informar o clima das cidades solicitadas pelo usuário.
- Você possui uma ferramenta 'get_weather' que aceita uma LISTA de cidades.

REGRAS DE OURO:
1. Se o usuário perguntar de uma cidade, passe uma lista com 1 item.
2. Se o usuário perguntar de várias cidades, passe todas de uma vez no array da ferramenta.
3. Não peça confirmação, aja imediatamente.
4. Seja conciso na resposta final.
`,
  // Removidas as outras ferramentas, deixamos apenas a de clima
  tools: [ferramenta_clima] 
});
