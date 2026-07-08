# DATABASE.md — Especificação e Schema do Banco de Dados (PostgreSQL / Prisma)

## 1. Missão
Fornecer uma estrutura de dados relacional otimizada, escalável e íntegra para armazenar perfis de usuários, ativos monitorados, snapshots do Oracle Score, regras de risco personalizadas e diário de trades.

---

## 2. Objetivos
* **Integridade Relacional:** Garantir relacionamentos fortes com restrições e integridade referencial via chave estrangeira.
* **Alta Performance de Leitura:** Estruturar índices estratégicos para consultas rápidas de métricas históricas de preço e scores.
* **Sustentabilidade Temporal:** Suportar tabelas de séries temporais (*time-series*) para o rastreamento evolutivo do operador (`Oracle DNA`).

---

## 3. Responsabilidades
* Definir o esquema lógico de tabelas e modelos do Prisma ORM.
* Mapear os tipos de dados, enums e chaves do banco de dados PostgreSQL.
* Estabelecer regras de indexação e restrições (*constraints*).

---

## 4. Estrutura de Entidades (Diagrama ER Simplificado)

```text
  ┌──────────────┐       1:N       ┌───────────────────┐
  │     User     │ ───────────────> │  UserRiskProfile  │
  └──────┬───────┘                 └───────────────────┘
         │
         │ 1:N
         ▼
  ┌──────────────┐       1:N       ┌───────────────────┐
  │ TradeJournal │ <─────────────── │      Asset        │
  └──────────────┘                 └─────────┬─────────┘
                                             │ 1:N
                                             ▼
                                   ┌───────────────────┐
                                   │  OracleScoreLog   │
                                   └───────────────────┘
