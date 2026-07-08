# 🗄️ Nexus Oracle — Especificação da Camada de Dados (Database Spec)

Este documento define a arquitetura, o modelo de dados e as políticas de persistência do ecossistema **Nexus Oracle**. O design foi projetado para garantir consistência transacional em dados relacionais e altíssima performance de escrita/leitura para dados de séries temporais (*time-series*).

---

## 1. Abstração e Stack Tecnológica

*   **ORM Base:** Prisma Core (tipagem estrita integrada ao Monorepo).
*   **Banco de Dados Recomendado:** PostgreSQL com a extensão **TimescaleDB** habilitada para tabelas de alta frequência (Histórico de Preços e Histórico de Scores).
*   **Camada de Cache / Buffer:** Redis (futura implementação para mensageria rápida de WebSockets e Throttling).

---

## 2. Dicionário de Entidades (Modelagem Conceitual)

### 2.1. Entidades Relacionais (Configuração e Estado Atual)

#### `Asset` (Ativos Monitorados)
Representa os pares de moedas ou ativos financeiros que o Oráculo está processando.
*   `id` (String, UUID, PK)
*   `symbol` (String, Unique) — Ex: "BTCUSDT"
*   `name` (String) — Ex: "Bitcoin"
*   `isActive` (Boolean, Default: true)
*   `createdAt` (DateTime)
*   `updatedAt` (DateTime)

#### `OperatorConfig` (Configurações Globais do Operador)
Gerencia os parâmetros de risco e travas do Oracle Shield ativos no terminal.
*   `id` (String, UUID, PK)
*   `totalCapital` (Decimal) — Capital alocado para cálculo de lote.
*   `riskPerTradePct` (Decimal) — Percentual padrão de risco por operação (Ex: 1.0%).
*   `shieldStrictness` (Enum) — `STRICT` | `BALANCED` | `PERMISSIVE`.
*   `updatedAt` (DateTime)

---

### 2.2. Entidades Time-Series (Séries Temporais / Hipertabelas)

Estas tabelas recebem um volume massivo de inserções e são otimizadas por chaves de tempo (`timestamp`).

#### `OracleScoreHistory` (Histórico de Análises do Oráculo)
Registra cada snapshot gerado pelo orquestrador para auditoria de performance de IA e estratégias.
*   `timestamp` (DateTime, PK) — Momento exato da análise.
*   `assetSymbol` (String, FK -> Asset.symbol)
*   `trendScore` (Integer) — Pontuação isolada do motor de tendência.
*   `volumeScore` (Integer) — Pontuação isolada do motor de volume.
*   `momentumScore` (Integer) — Pontuação isolada do motor de momentum.
*   `finalScore` (Integer) — Pontuação ponderada final (-100 a +100).
*   `confidence` (Integer) — Índice de confiança (0 a 100).
*   `shieldStatus` (Enum) — Status gerado (`SAFE`, `WARNING`, `SHIELD_ACTIVE`).
*   `rationale` (Text) — String textual contendo a justificativa gerada pelos motores.

#### `MarketDataSnapshot` (Histórico de Preços Secundário)
Armazena os dados brutos de mercado que alimentaram os motores, permitindo o *backtesting* preciso do sistema.
*   `timestamp` (DateTime, PK)
*   `assetSymbol` (String, FK -> Asset.symbol)
*   `price` (Decimal) — Preço de fechamento daquele instante.
*   `volume` (Decimal) — Volume transacionado no período.

---

## 3. Diagrama de Relacionamentos (Lógico)
