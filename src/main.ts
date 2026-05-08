import { agente } from "./agente/criar_agente";

async function executar() {
    const resposta = await agente.run({
        messages: [
            {
                role: "user",
                content: "E aí! Como tá o clima em Torres?",
            },
        ],
    });

    console.log(resposta.text);
}

executar();
