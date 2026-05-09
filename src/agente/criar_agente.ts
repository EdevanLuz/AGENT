import { Agent } from "./agent.js"; // Importa o arquivo que você criou no Passo 1
import { ferramenta_clima } from "./ferramentas/ferramenta_clima.js";
import { ferramenta_google_leads } from "./ferramentas/google_leads.js";
import { ferramenta_scraper_google } from "./ferramentas/scraper_browser.js";
import { ferramenta_terminal } from "./ferramentas/terminal.js";
import dotenv from "dotenv";

dotenv.config();

export const meuAgente = new Agent({
  apiKey: process.env.OPENROUTER_API_KEY,
  model: "openrouter/auto",
  instructions:  `
    Você é um especialista em extração de leads e automação.
    Ao buscar empresas:
    1. Use a ferramenta google_leads.
    2. Formate o resultado como uma lista de nome e telefone.
    3. Se o usuário quiser salvar em arquivo, use o terminal para criar um .md com os dados.
    4. Seja claro e objetivo, entregue só o que foi pedido, sem informações extras.
    5. Verifique o resultado da busca antes de entregar, senão será preciso repetir a busca.
    6. NUNCA diga frases como "Só um instante", "Vou buscar agora" ou "Aguarde um momento".
    7. Se você tem as informações (Nicho e Cidade), chame a ferramenta 'google_leads_api' IMEDIATAMENTE.
    8. Sua resposta final DEVE conter os dados encontrados ou a confirmação de que o arquivo foi salvo.
    9. Seja extremamente direto. Se o usuário disse "RS", e o nicho era "advogados", execute a busca por "advogados em Torres RS".
  `,
  tools: [ferramenta_google_leads, ferramenta_terminal],
});
