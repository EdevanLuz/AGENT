import { Agent } from "../agent.js";
import { ferramenta_requisicao } from "../ferramentas/ferramenta_requisicao.js";

export const subAgenteRequisicoes = new Agent({
  apiKey: process.env.OPENROUTER_API_KEY,
  model: "openrouter/free",
  instructions: `
Você é o ESPECIALISTA EM REQUISIÇÕES.
Sua missão é traduzir pedidos humanos em chamadas técnicas de API.

REGRAS:
1. Você usa a ferramenta 'fazer_chamada_api'.
2. Se o usuário quiser saber o preço do Bitcoin, você deve saber (ou procurar) qual a URL da API da Binance ou Coingecko e fazer o GET.
3. Se o retorno for um JSON gigante, resuma apenas a parte que interessa.
4. Você é o braço direito técnico do Gerente.
`,
  tools: [ferramenta_requisicao]
});
