import { tool } from "@openrouter/agent";
import { z } from "zod";

export const ferramenta_google_leads = tool({
  name: "google_leads_api",
  description: "Busca leads no Google com paginação automática para grandes quantidades.",
  inputSchema: z.object({ 
    busca_completa: z.string().describe("O termo de busca (ex: advogados em Torres RS)"),
    quantidade_desejada: z.number().default(20).describe("Total de contatos desejados (ex: 40, 60, 100)")
  }),
  execute: async ({ busca_completa, quantidade_desejada }) => {
    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://places.googleapis.com/v1/places:searchText`;
    
    let todosLeads: any[] = [];
    let proximoToken: string | null = null;
    let tentativas = 0;
    const maxPaginas = 10;

    try {
      // LOGS CORRIGIDOS COM $
      console.log(`\n🔎 GARIMPO ATIVO: "${busca_completa}"`);
      console.log(`🎯 META: ${quantidade_desejada} leads\n`);

      do {
        tentativas++;
        console.log(`   [Página ${tentativas}] Coletando dados no Google...`);

        const body: any = { 
          textQuery: busca_completa,
          maxResultCount: 20,
          languageCode: 'pt-BR'
        };

        if (proximoToken) body.pageToken = proximoToken;

        const response = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Goog-Api-Key': API_KEY!,
            'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.nationalPhoneNumber,nextPageToken'
          },
          body: JSON.stringify(body)
        });

        const data = await response.json();

        if (data.error) {
          console.error(`   ❌ Erro Google: ${data.error.message}`);
          break;
        }

        if (data.places && data.places.length > 0) {
          const novos = data.places.map((p: any) => ({
            nome: p.displayName?.text || "N/A",
            telefone: p.nationalPhoneNumber || "N/A",
            endereco: p.formattedAddress || "N/A"
          }));
          
          todosLeads = [...todosLeads, ...novos];
          
          // LOG CORRIGIDO COM $
          console.log(`   ✅ +${novos.length} contatos obtidos. (Total acumulado: ${todosLeads.length})`);
        }

        proximoToken = data.nextPageToken;

        if (proximoToken && todosLeads.length < quantidade_desejada) {
          console.log(`   ⏳ Aguardando próxima página...`);
          await new Promise(r => setTimeout(r, 2000));
        }

      } while (proximoToken && todosLeads.length < quantidade_desejada && tentativas < maxPaginas);

      // Garante que entregamos EXATAMENTE o que foi pedido (ou o máximo encontrado)
      const resultadoFinal = todosLeads.slice(0, quantidade_desejada);

           console.log(`\n✨ FINALIZADO: ${resultadoFinal.length} contatos extraídos.\n`);

      // Verifica se parou antes da meta por falta de páginas no Google
      const avisoLimite = (resultadoFinal.length < quantidade_desejada && !proximoToken) 
        ? `Nota: O Google limitou a busca em ${resultadoFinal.length} resultados para este termo exato. Para conseguir mais, tente especificar sub-nichos (ex: Advogados Trabalhistas, Advogados Criminais).` 
        : null;

      return { 
        leads: resultadoFinal, 
        total: resultadoFinal.length,
        sucesso: true,
        mensagem_sistema: avisoLimite // <--- A IA vai ler isso e te avisar
      };

    } catch (error: any) {

      return { erro: "Falha técnica no garimpo", detalhes: error.message };
    }
  }
});
