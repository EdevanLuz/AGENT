import express from "express";
import { meuAgente } from "./agente/criar_agente.js";

const app = express();
app.use(express.json()); // Para o servidor entender JSON

// Rota de teste para ver se o servidor está vivo
app.get("/", (req, res) => {
  res.send("🤖 Agente Online!");
});

// Rota principal de chat
app.post("/chat", async (req, res) => {
  const { mensagem } = req.body;

  if (!mensagem) {
    return res.status(400).json({ erro: "Envie uma mensagem no corpo da requisição." });
  }

  console.log(`📩 Recebido: ${mensagem}`);

  try {
    const resposta = await meuAgente.send(mensagem);
    console.log(`📤 Resposta: ${resposta}`);
    res.json({ resposta });
  } catch (error) {
    console.error("Erro no agente:", error);
    res.status(500).json({ erro: "Erro ao processar mensagem." });
  }
});

// Pega a porta definida pelo Railway ou usa 3000 se estiver rodando localmente
const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`\n🚀 Servidor rodando na porta ${PORT}`);
  console.log(`👉 No Railway, a URL será algo como: https://seu-projeto.up.railway.app/chat\n`);
});
