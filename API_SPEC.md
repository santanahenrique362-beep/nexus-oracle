# 📡 Nexus Oracle — Especificação de Contratos da API REST

Este documento define os contratos oficiais de integração REST expostos pelo Backend NestJS (`apps/backend`) para consumo do Frontend e microsserviços.

---

## 1. Visão Geral

* **Base URL:** `http://localhost:3000/api/v1` (Ambiente Local)
* **Formato das Requisições/Respostas:** `application/json`
* **Prefix Global:** `/oracle`

---

## 2. Endpoints do Oráculo

### 2.1. Avaliar Ativo em Tempo Real
Processa os motores de cálculo (Tendência, Volume, Momentum e Risco) para um determinado símbolo e persiste a análise na série temporal do banco.

* **Rota:** `GET /oracle/evaluate/:symbol`
* **Exemplo de URL:** `/oracle/evaluate/BTCUSDT`
* **Resposta de Sucesso (`200 OK`):**

```json
{
  "symbol": "BTCUSDT",
  "trendScore": 60,
  "volumeScore": 80,
  "momentumScore": 40,
  "score": 62,
  "confidence": 85,
  "shieldStatus": "SAFE",
  "rationale": "Tendência de alta sustentada por volume comprador acima da média."
}
