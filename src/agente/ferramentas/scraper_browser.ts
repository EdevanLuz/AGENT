import { tool } from "@openrouter/agent";
import { z } from "zod";
import { chromium } from "playwright";

export const ferramenta_scraper_google = tool({
  name: "google_maps_scraper",
  description: "Busca empresas no Google Maps com sistema anti-travamento.",
  inputSchema: z.object({
    busca: z.string().describe("O que buscar"),
  }),
  execute: async ({ busca }) => {
    console.log(`\n🔍 Iniciando busca: ${busca}`);
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({ locale: 'pt-BR' });
    const page = await context.newPage();

    try {
      // 1. Vai para o Google Maps
      await page.goto(`https://www.google.com/maps/search/${encodeURIComponent(busca)}`, { waitUntil: 'domcontentloaded' });
      
      // 2. Tenta fechar o banner de Cookies (se aparecer)
      try {
        const cookiesBtn = page.locator('button:has-text("Aceitar tudo"), button:has-text("Concordo")');
        if (await cookiesBtn.isVisible()) {
          await cookiesBtn.click();
          console.log("✅ Banner de cookies aceito.");
        }
      } catch (e) {}

      // 3. Espera os resultados aparecerem
      console.log("⏳ Aguardando carregamento dos resultados...");
      await page.waitForSelector('div[role="article"]', { timeout: 20000 });

      // 4. Scroll Inteligente: Rola o feed de resultados
      console.log("🖱️ Rolando a lista para carregar mais contatos...");
      for (let i = 0; i < 3; i++) {
        // Encontra o container que tem o scroll e rola ele
        await page.evaluate(() => {
          const feed = document.querySelector('div[role="feed"]') || window;
          feed.scrollBy(0, 5000);
        });
        await page.waitForTimeout(2000); // Espera o "pulo" do scroll
      }

      // 5. Extração de dados
      const leads = await page.evaluate(() => {
        const cards = Array.from(document.querySelectorAll('div[role="article"]'));
        return cards.map(card => {
          const nome = card.querySelector('.qBF1Pd')?.textContent || "Nome não encontrado";
          const texto = (card as HTMLElement).innerText;
          // Regex focada em achar qualquer coisa que pareça um telefone (8 a 11 dígitos)
          const telMatch = texto.match(/(\(?\d{2}\)?\s)?(9?\d{4}-?\d{4})/g);
          
          return {
            nome,
            telefone: telMatch ? telMatch[0] : "Não encontrado",
            endereco: texto.split('\n')[1] || ""
          };
        });
      });

      await browser.close();
      
      const listaLimpa = leads.filter(l => l.nome !== "Nome não encontrado");
      console.log(`✅ Sucesso! ${listaLimpa.length} leads encontrados.`);
      
      return { 
        leads: listaLimpa,
        total: listaLimpa.length,
        sucesso: true 
      };

    } catch (error) {
      // Se der erro, ele tira um print pra você ver o que houve
      await page.screenshot({ path: 'erro_bot.png' });
      await browser.close();
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("❌ Erro durante o scraping:", errorMessage);
      return { erro: "O robô travou ou não achou resultados. Verifique 'erro_bot.png'", detalhes: errorMessage };
    }
  },
});
