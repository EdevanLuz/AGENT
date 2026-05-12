import { Agent } from "./agent.js";
import { tool } from "@openrouter/agent";
import { z } from "zod";
import { ferramenta_clima } from "./ferramentas/ferramenta_clima.js";
import { subAgenteRequisicoes } from "./subagente_requisicao.js"; // Importando o que já existe no seu repo
import dotenv from "dotenv";

dotenv.config();

// --- SUBAGENTE GENÉRICO (Declarado direto aqui) ---
const subAgenteGenerico = new Agent({
  apiKey: process.env.OPENROUTER_API_KEY,
  model: "openrouter/free",
  instructions: "Você é o EXECUTOR GENÉRICO. Resolva tarefas gerais e use a ferramenta de clima quando necessário.",
  tools: [ferramenta_clima]
});

// --- TOOLS DO GERENTE (Seguindo o padrão Tool_subagente_...) ---

const Tool_subagente_generico = tool({
  name: "Tool_subagente_generico",
  description: "Delega tarefas gerais, resumos ou consultas de clima.",
  inputSchema: z.object({
    comando: z.string().describe("O comando para o assistente genérico"),
  }),
  execute: async ({ comando }) => {
    console.log(`\n👨‍💼 Gerente -> 🤖 Genérico: ${comando}`);
    const resposta = await subAgenteGenerico.send(comando);
    return { resultado: resposta };
  },
});

const Tool_subagente_requisicao = tool({
  name: "Tool_subagente_requisicao",
  description: "realiza chamadas de APIs.",
  inputSchema: z.object({
    comando: z.string().describe("A instrução para o especialista em APIs"),
  }),
  execute: async ({ comando }) => {
    console.log(`\n👨‍💼 Gerente -> 🌐 Requisição: ${comando}`);
    const resposta = await subAgenteRequisicao.send(comando);
    return { resultado: resposta };
  },
});

// --- AGENTE GERENTE (O CHEFE) ---
export const meuAgente = new Agent({
  apiKey: process.env.OPENROUTER_API_KEY,
  model: "openrouter/free",
  // No criar_agente.ts
instructions: `
Você é o AGENTE GERENTE. 
Sua única forma de agir é usando ferramentas.

REGRAS ABSOLUTAS:
1. Se o usuário pedir para buscar algo, você DEVE chamar imediatamente a ferramenta 'Tool_subagente_requisicao'.
2. NUNCA responda ao usuário dizendo o que ele deve pedir. FAÇA VOCÊ MESMO a delegação.
3. Se houver uma URL na mensagem do usuário, passe ela integralmente para o seu executor através da ferramenta.
`
,
  tools: [Tool_subagente_generico, Tool_subagente_requisicao]
});
