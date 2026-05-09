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

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`\n🚀 Servidor local rodando em http://localhost:${PORT}`);
  console.log(`👉 Teste a rota POST http://localhost:${PORT}/chat\n`);
});
