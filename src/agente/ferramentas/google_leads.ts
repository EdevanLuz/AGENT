// VERSÃO PARA A "PLACES API (NEW)"
import { tool } from "@openrouter/agent";
import { z } from "zod";
export const ferramenta_google_leads = tool({
  name: "google_leads_api",
  description: "Busca leads no Google usando a API Nova.",
  inputSchema: z.object({ busca_completa: z.string() }),
  execute: async ({ busca_completa }) => {
    const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://places.googleapis.com/v1/places:searchText`;

    try {
      console.log(`📡 Consultando Google API (New) para: ${busca_completa}...`);
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': API_KEY!,
          'X-Goog-FieldMask': 'places.displayName,places.formattedAddress,places.nationalPhoneNumber'
        },
        body: JSON.stringify({ textQuery: busca_completa, maxResultCount:20 })
      });

      const data = await response.json();

      if (!data.places || data.places.length === 0) {
        return { mensagem: "Nenhum resultado encontrado." };
      }

      const leads = data.places.slice(0, 20).map((p: any) => ({
        nome: p.displayName.text,
        telefone: p.nationalPhoneNumber || "Não disponível",
        endereco: p.formattedAddress
      }));

      return { leads, sucesso: true };
    } catch (error: any) {
      return { erro: "Falha na API Nova", detalhes: error.message };
    }
  }
});
