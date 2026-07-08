# ROADMAP.md — Plano Diretor de Evolução Técnica e Arquitetural

## 1. Missão
Mapear e organizar cronologicamente a esteira de construção do Nexus Oracle, dividindo o desenvolvimento em fases sequenciais onde a infraestrutura e a arquitetura antecedem a complexidade de produto.

---

## 2. Objetivos
* **Eliminar Gargalos de Desenvolvimento:** Garantir que dependências de backend e banco existam antes da construção de interfaces ou motores complexos.
* **Marcos Entregáveis:** Definir critérios claros de aceite para cada fase do projeto.
* **Sustentabilidade de Longo Prazo:** Prover visibilidade de evolução para os próximos anos sem refatorações destrutivas.

---

## 3. Responsabilidades
* Guiar a priorização das tarefas da equipe de engenharia.
* Trancar a implementação de funcionalidades fora de fase (*feature creep*).
* Servir como parâmetro para auditoria de progresso da plataforma.

---

## 4. Funcionamento e Fases da Esteira

```text
┌────────────────┐     ┌────────────────┐     ┌────────────────┐     ┌────────────────┐
│ FASE 0: BASE   │ ──> │ FASE 1: CORE   │ ──> │ FASE 2: ENGINES│ ──> │ FASE 3: AI/DNA │
│ (Arquitetura)  │     │ (Monorepo/Data)│     │ (Processamento)│     │ (Inteligência) │
└────────────────┘     └────────────────┘     └────────────────┘     └────────────────┘
