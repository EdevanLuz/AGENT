import { tool } from "@openrouter/agent";
import { z } from "zod";
import fs from "fs";

export const ferramenta_csv = tool({
  name: "gerar_csv_leads",
  description: "Cria um arquivo .csv formatado para Excel com a lista de leads.",
  inputSchema: z.object({
    nome_arquivo: z.string().describe("Nome do arquivo (ex: leads_advogados.csv)"),
    leads: z.array(z.object({
      nome: z.string(),
      telefone: z.string(),
      endereco: z.string()
    }))
  }),
  execute: async ({ nome_arquivo, leads }) => {
    try {
      const cabecalho = "Nome;Telefone;Endereco\n";

      const linhas = leads.map(l =>
        `"${l.nome.replace(/"/g, '')}";"${l.telefone}";"${l.endereco.replace(/"/g, '')}"`
      ).join("\n");

      const conteudoFinal = cabecalho + linhas;

      fs.writeFileSync(nome_arquivo, "\ufeff" + conteudoFinal, "utf8");

      console.log(`✅ Arquivo CSV [${nome_arquivo}] gerado com ${leads.length} contatos.`);

      return { sucesso: true, mensagem: `Arquivo ${nome_arquivo} criado com sucesso!` };
    } catch (error: any) {
      console.error("❌ Erro ao gerar CSV:", error.message);
      return { erro: "Falha ao gerar CSV", detalhes: error.message };
    }
  }
});