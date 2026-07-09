# 🧠 Nexus Oracle — Especificação Técnica do Decision Engine

Este documento define oficialmente a camada **Decision Engine** (Camada de Decisão e Síntese), responsável por orquestrar os motores analíticos, resolver conflitos de indicadores e consolidar a tomada de decisão institucional do Nexus Oracle.

---

## 1. Missão e Responsabilidades

O **Decision Engine** é o cérebro centralizador do ecossistema. Ele não calcula estatísticas brutas (papel exclusivo dos *Oracle Engines*), mas é o único componente autorizado a:

1. **Orquestrar** a execução paralela de todos os *Engines* individuais.
2. **Ponderar e Resolver Conflitos** entre sinais divergentes de mercado (ex: Tendência de Alta vs. Baixa Liquidez).
3. **Consolidar Métricas Finais:** `Oracle Score`, `Confidence Score` e a classificação de risco `Oracle Shield`.
4. **Sintetizar Insights:** Mapear forças (`strengths`), alertas de risco (`warnings`) e recomendação operacional limpa.
5. **Garantir o Contrato Unificado:** Fornecer o único Payload Oficial consumido pela camada de IA (`Oracle AI`) e pela Interface de Usuário (`Frontend`).

---

## 2. Regras de Comunicação e Blindagem Arquitetural
