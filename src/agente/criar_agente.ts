import { Agent } from "./agent.js"; // Importa o arquivo que você criou no Passo 1
import { ferramenta_clima } from "./ferramentas/ferramenta_clima.js";
import { ferramenta_terminal } from "./ferramentas/terminal.js";
import dotenv from "dotenv";

dotenv.config();

export const meuAgente = new Agent({
  apiKey: process.env.OPENROUTER_API_KEY,
  model: "openrouter/auto",
  instructions: "Você é um assistente de clima amigável.",
  tools: [ferramenta_clima, ferramenta_terminal], // IMPORTANTE: Aqui tem que ser um Array []
});
