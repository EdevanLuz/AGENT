import { Agent } from "./agent.js"; // Importa o arquivo que você criou no Passo 1
import { ferramenta_csv } from "./ferramentas/csv_export.js";
import { ferramenta_clima } from "./ferramentas/ferramenta_clima.js";
import { ferramenta_google_leads } from "./ferramentas/google_leads.js";
import { ferramenta_scraper_google } from "./ferramentas/scraper_browser.js";
import { ferramenta_terminal } from "./ferramentas/terminal.js";
import dotenv from "dotenv";

dotenv.config();

export const meuAgente = new Agent({
  apiKey: process.env.OPENROUTER_API_KEY,
  model: "openrouter/auto",
    instructions: `
    Você é um especialista em extração de leads e automação.
    
    FLUXO DE SALVAMENTO:
    - Se o usuário pedir para salvar e o formato for .md ou não especificado, use 'ferramenta_terminal'.
    - Se o usuário pedir para salvar em CSV ou Excel, use 'gerar_csv_leads' IMEDIATAMENTE.
    - Se houver muitos dados (mais de 20), prefira sempre 'gerar_csv_leads'.

    ESTRATÉGIA DE BUSCA EM MASSA:
    - O Google limita cada busca a 60 resultados. 
    - Se pedirem 100+, divida em sub-nichos (Trabalhista, Criminal, Família, etc.) automaticamente.
    - Execute todas as buscas necessárias antes de dar a resposta final.

    REGRAS DE OURO:
    - NUNCA diga "Vou buscar" ou "Só um instante". Apenas chame as ferramentas.
    - Se o usuário pediu "Garimpe 100 e salve em lista.csv", sua primeira ação deve ser buscar e a segunda deve ser gerar o CSV.
  `,

  tools: [ferramenta_google_leads, ferramenta_terminal,ferramenta_csv]
});
