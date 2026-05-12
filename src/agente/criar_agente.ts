import { Agent } from "./agent.js";
import { tool } from "@openrouter/agent";
import { z } from "zod";
import { ferramenta_clima } from "./ferramentas/ferramenta_clima.js"; // Importando a ferramenta
import dotenv from "dotenv";

dotenv.config();

// 1. Subagente Executor (Ele tem a ferramenta de clima)
const subAgenteExecutor = new Agent({
  apiKey: process.env.OPENROUTER_API_KEY,
  model: "openrouter/free", 
  instructions: `
Você é o EXECUTOR técnico. Sua função é realizar tarefas usando as ferramentas disponíveis.
Atualmente você pode consultar o clima usando 'get_weather'.
Responda apenas o resultado direto da sua execução, de forma técnica e objetiva.
`,
  tools: [ferramenta_clima] // A ferramenta fica aqui!
});

// 2. Ferramenta de Delegação (O que o Gerente usa para falar com o Executor)
const delegar_tarefa = tool({
  name: "delegar_tarefa",
  description: "Envia uma tarefa técnica para o subagente executor. Use para clima, buscas ou cálculos.",
  inputSchema: z.object({
    comando: z.string().describe("O comando ou pergunta para o executor"),
  }),
  execute: async ({ comando }) => {
    console.log(`\n👨‍💼 Gerente -> 🤖 Executor: ${comando}`);
    const resposta = await subAgenteExecutor.send(comando);
    return { resultado: resposta };
  },
});

// 3. Agente Gerente (O Orquestrador/Interface com o usuário)
export const meuAgente = new Agent({
  apiKey: process.env.OPENROUTER_API_KEY,
  model: "openrouter/free",
  instructions: `
Você é o AGENTE GERENTE. Sua função é receber pedidos do usuário e gerenciar a execução.

REGRAS:
1. Você não tem ferramentas de clima. Para saber o clima, você DEVE delegar a tarefa.
2. Sempre use a ferramenta 'delegar_tarefa' para qualquer ação técnica.
3. Quando o executor responder, formate a resposta de forma amigável para o usuário.
`,
  tools: [delegar_tarefa] // O gerente só sabe delegar
});
