import { agente } from "./agente/criar_agente";

async function executar() {
    const resposta = await agente.run({
        messages: [
            {
                role: "user",
                content: "Como está o clima em Torres?",
            },
        ],
    });

    console.log(resposta.text);
}

executar();
