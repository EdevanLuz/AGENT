import { Agent } from "./agent.js";
import { tool } from "@openrouter/agent";
import { z } from "zod";
import { ferramenta_clima } from "./ferramentas/ferramenta_clima.js";
import { subAgenteRequisicoes } from "./subagente_requisicao.js"; // Importando o que você criou
import dotenv from "dotenv";

dotenv.config();

// 1. Subagente Executor Genérico (Declarado aqui)
const subAgenteExecutor = new Agent({
  apiKey: process.env.OPENROUTER_API_KEY,
  model: "openrouter/free",
  instructions: "Você é o EXECUTOR técnico. Use 'ferramenta_clima' para o clima.",
  tools: [ferramenta_clima]
});

// 2. Ferramenta para o Gerente chamar o Executor Genérico (Clima)
const Tool_subagente_generico = tool({
  name: "Tool_subagente_generico",
  description: "Delega tarefas gerais ou clima para o executor genérico.",
  inputSchema: z.object({
    comando: z.string().describe("O comando para o executor"),
  }),
  execute: async ({ comando }) => {
    console.log(`\n👨‍💼 Gerente -> 🤖 Genérico: ${comando}`);
    const resposta = await subAgenteExecutor.send(comando);
    return { resultado: resposta };
  },
});

// 3. Ferramenta para o Gerente chamar o Especialista em Requisições
const Tool_subagente_requisicao = tool({
  name: "Tool_subagente_requisicao",
  description: "Delega tarefas de APIs e dados externos para o especialista.",
  inputSchema: z.object({
    comando: z.string().describe("A instrução para o especialista em APIs"),
  }),
  execute: async ({ comando }) => {
    console.log(`\n👨‍💼 Gerente -> 🌐 Requisição: ${comando}`);
    const resposta = await subAgenteRequisicoes.send(comando); // Note o S no final
    return { resultado: resposta };
  },
});

// 4. Agente Gerente (O Chefe)
export const meuAgente = new Agent({
  apiKey: process.env.OPENROUTER_API_KEY,
  model: "openrouter/owl-alpha",
  instructions: `
Você é o AGENTE GERENTE. Delegue sempre.
Use 'Tool_subagente_generico' para clima.
Use 'Tool_subagente_requisicao' para APIs e preços.
`,
  tools: [Tool_subagente_generico, Tool_subagente_requisicao]
});
