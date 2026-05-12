import { Agent } from "./agent.js";
import { tool } from "@openrouter/agent";
import { z } from "zod";
import { ferramenta_clima } from "./ferramentas/ferramenta_clima.js";
import { subAgenteRequisicao } from "./subagente_requisicao.js"; // Importando o que já existe no seu repo
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
  description: "Delega tarefas de APIs, buscas externas e cotações técnicas.",
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
  instructions: `
Você é o AGENTE GERENTE. Sua função é delegar para o subagente correto.

EQUIPE:
- 'Tool_subagente_generico': Clima e tarefas comuns.
- 'Tool_subagente_requisicao': APIs e dados externos técnicos.
`,
  tools: [Tool_subagente_generico, Tool_subagente_requisicao]
});
