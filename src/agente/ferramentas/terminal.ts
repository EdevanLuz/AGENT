import { tool } from "@openrouter/agent";
import { z } from "zod";
import { execSync } from "child_process";

export const ferramenta_terminal = tool({
  name: "executar_comando",
  description: "Executa comandos no terminal do computador. Use para listar arquivos, criar pastas ou verificar o sistema.",
  inputSchema: z.object({
    comando: z.string().describe("O comando shell a ser executado"),
  }),
  execute: async ({ comando }) => {
    try {
      console.log(`⚠️  Executando comando: ${comando}`);
      const output = execSync(comando).toString();
      return { output, sucesso: true };
    } catch (error) {
      return { erro: error.message, sucesso: false };
    }
  },
});
