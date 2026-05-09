# 🤖 Meu Agente - OpenRouter AI Agent

Um agente de IA modular construído com TypeScript, Express e OpenRouter SDK.

## 🚀 Como Começar

### 1. Pré-requisitos

- Node.js 18+
- npm ou yarn
- Uma chave de API do [OpenRouter](https://openrouter.ai/settings/keys)

### 2. Instalação

```bash
# Clone o repositório
git clone <seu-repositorio>
cd meu_agente

# Instale as dependências
npm install
```

### 3. Configuração

Crie um arquivo `.env` na raiz do projeto:

```env
OPENROUTER_API_KEY=sua_chave_aqui
```

### 4. Iniciar o Servidor

```bash
npx tsx src/main.ts
```

O servidor iniciará em `http://localhost:3000`

---

## 📡 API Endpoints

### Health Check

```http
GET /
```

**Resposta:**
```
🤖 Agente Online!
```

### Chat

```http
POST /chat
Content-Type: application/json
```

**Payload:**

```json
{
  "mensagem": "Qual a temperatura em São Paulo?"
}
```

**Resposta de Sucesso (200):**

```json
{
  "resposta": "A temperatura em São Paulo é 22°C e o clima está Ensolarado."
}
```

**Resposta de Erro (400):**

```json
{
  "erro": "Envie uma mensagem no corpo da requisição."
}
```

**Resposta de Erro (500):**

```json
{
  "erro": "Erro ao processar mensagem."
}
```

---

## 🛠️ Ferramentas (Tools)

O agente possui as seguintes ferramentas disponíveis:

### 1. Clima (`get_weather`)
Busca a temperatura de uma cidade.

**Exemplo de uso:**
```
"Qual a temperatura no Rio de Janeiro?"
```

### 2. Terminal (`executar_comando`)
Executa comandos `curl` para fazer requisições HTTP.

**Exemplo de uso:**
```
"Busque os dados de https://api.github.com/users/github"
```

> ⚠️ **Segurança:** Apenas comandos `curl` são permitidos.

---

## 📁 Estrutura do Projeto

```
src/
├── agente/
│   ├── agent.ts              # Classe principal do agente
│   ├── criar_agente.ts       # Factory e configuração do agente
│   └── ferramentas/
│       ├── ferramenta_clima.ts   # Tool de clima
│       └── terminal.ts           # Tool de terminal
├── infra/
│   └── openrouter.js         # Configuração de ambiente
└── main.ts                   # Servidor Express
```

---

## 🧪 Testando com cURL

```bash
# Health check
curl http://localhost:3000/

# Enviar mensagem
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"mensagem": "Olá, como você está?"}'

# Usar ferramenta de clima
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"mensagem": "Qual a temperatura em Curitiba?"}'

# Usar ferramenta de terminal (curl)
curl -X POST http://localhost:3000/chat \
  -H "Content-Type: application/json" \
  -d '{"mensagem": "Faça uma requisição para https://httpbin.org/get"}'
```

---

## 📝 Variáveis de Ambiente

| Variável | Obrigatório | Descrição |
|----------|-------------|-----------|
| `OPENROUTER_API_KEY` | ✅ | Chave de API do OpenRouter |

---

## 🔧 Configuração do Modelo

Para alterar o modelo usado pelo agente, edite `src/agente/criar_agente.ts`:

```typescript
export const meuAgente = new Agent({
  apiKey: process.env.OPENROUTER_API_KEY,
  model: "openrouter/auto",  // Altere aqui
  // ...
});
```

Veja os modelos disponíveis em: https://openrouter.ai/models

---

## 📚 Recursos

- [OpenRouter Docs](https://openrouter.ai/docs)
- [OpenRouter Models](https://openrouter.ai/models)
