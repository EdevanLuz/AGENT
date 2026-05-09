import { tool } from "@openrouter/agent";
import { z } from "zod";
import { execSync } from "child_process";

export const ferramenta_terminal = tool({
  name: "executar_comando",
  description: "Executa comandos no terminal do computador. Use para fazer requisições de API com curl.",
  inputSchema: z.object({
    comando: z.string().describe("O comando shell a ser executado (apenas curl é permitido)"),
  }),
  execute: async ({ comando }) => {
    try {
      // Whitelist: Only allow curl commands
      if (!comando.trim().startsWith("curl")) {
        return { erro: "Comando não permitido. Apenas comandos 'curl' são permitidos.", sucesso: false };
      }

      console.log(`⚠️  Executando comando: ${comando}`);
      const output = execSync(comando).toString();
      return { output, sucesso: true };
    } catch (error) {
      return { erro: error instanceof Error ? error.message : String(error), sucesso: false };
    }
  },
});
