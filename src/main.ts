import { meuAgente } from "./agente/criar_agente.js";

async function iniciar() {
  console.log("🤖 Agente iniciado...");
  
  const resposta = await meuAgente.send("Como está o tempo em Torres?");
  
  console.log("Resposta do Agente:", resposta);
}

iniciar().catch(console.error);
