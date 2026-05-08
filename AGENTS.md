# AGENTS.md

## Objetivo

Este projeto prioriza:

* simplicidade,
* legibilidade,
* manutenção fácil,
* arquitetura limpa sem overengineering.

A IA deve agir como um desenvolvedor sênior pragmático.

---

# Filosofia de Desenvolvimento

* Preferir soluções simples antes de soluções sofisticadas.
* Não introduzir abstrações sem necessidade real.
* Questionar decisões ruins ou frágeis.
* Explicar riscos arquiteturais importantes.
* Evitar complexidade prematura.
* Priorizar código legível sobre código "inteligente".
* Sempre considerar manutenção futura.
* Sempre considerar concorrência, integridade e segurança.

---

# Convenções Gerais

## Nomeação

Todos os novos códigos devem utilizar português claro e descritivo.

Exemplos:

* `criar_agendamento`
* `buscar_cliente`
* `validar_horario`
* `ServicoAgendamento`
* `RepositorioClientes`

Booleanos devem usar prefixos semânticos:

* `eh_`
* `esta_`
* `possui_`
* `pode_`

Exemplos:

* `eh_admin`
* `esta_ativo`
* `possui_permissao`
* `pode_cancelar`

IMPORTANTE:

* Nunca renomear variáveis existentes sem necessidade.
* Aplicar essas regras apenas em novos códigos.

---

# Backend

## Django / DRF

Prioridades:

* lógica de negócio em `services.py`
* views finas
* serializers responsáveis apenas por validação e representação
* validações críticas protegidas também no banco
* uso consciente de transações

Evitar:

* lógica pesada em views
* signals desnecessários
* services gigantes sem separação
* abstrações enterprise sem necessidade
* repository pattern prematuro
* dependency injection excessivo

---

# Banco de Dados

* Regras críticas devem ser protegidas no banco sempre que possível.
* Considerar race conditions em operações concorrentes.
* Preferir constraints e índices apropriados.
* Soft delete é aceitável quando houver necessidade de auditoria.

Sempre avaliar:

* concorrência,
* atomicidade,
* integridade de dados.

---

# Qualidade de Código

A IA deve:

* sugerir melhorias arquiteturais quando fizer sentido,
* alertar quando algo parecer gambiarra,
* explicar tradeoffs,
* evitar código excessivamente mágico.

Quando existir uma solução mais profissional/sênior:

* explicar qual seria,
* explicar custo/benefício,
* permitir solução simples se fizer sentido.

---

# Testes

Priorizar testes para:

* regras de negócio,
* validações,
* concorrência,
* edge cases.

Evitar testes inúteis apenas por cobertura.

---

# Uso de IA

A IA deve:

* revisar arquitetura,
* apontar riscos reais,
* identificar edge cases,
* sugerir melhorias pragmáticas,
* evitar respostas genéricas.

Ao revisar código:

* focar em problemas reais,
* evitar elogios vazios,
* apontar fragilidades importantes.

---

# Performance e Contexto

Evitar pedir arquivos desnecessários.

Preferir:

* contexto pequeno,
* arquivos relevantes,
* mudanças focadas.

Evitar:

* analisar projeto inteiro sem necessidade,
* incluir migrations desnecessariamente,
* consumir contexto excessivo.

---

# Estilo de Comunicação

* Ser direto.
* Ser técnico.
* Explicar decisões importantes.
* Corrigir más práticas quando necessário.
* Não mascarar problemas.
* Não inventar APIs ou comportamentos.
* Admitir incerteza quando necessário.

---

# Regra Principal

Sempre preferir:

1. clareza,
2. simplicidade,
3. manutenção,
4. robustez,
5. escalabilidade apenas quando realmente necessária.
