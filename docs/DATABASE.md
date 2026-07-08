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
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  USER
  ADMIN
  INSTITUTIONAL
}

enum ShieldStatus {
  SAFE
  WARNING
  SHIELD_ACTIVE
}

enum TradeSide {
  LONG
  SHORT
}

model User {
  id            String            @id @default(uuid())
  email         String            @unique
  passwordHash  String
  name          String?
  role          Role              @default(USER)
  createdAt     DateTime          @default(now())
  updatedAt     DateTime          @updatedAt
  
  riskProfiles  UserRiskProfile[]
  tradeJournals TradeJournal[]

  @@map("users")
}

model UserRiskProfile {
  id              String   @id @default(uuid())
  userId          String
  accountCapital  Float
  riskPerTradePct Float    @default(1.0)
  minRiskReward   Float    @default(1.5)
  maxDrawdownPct  Float    @default(10.0)
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt

  user User @relation(fields: [userId], references: [id], onDelete: Cascade)

  @@map("user_risk_profiles")
}

model Asset {
  id          String   @id @default(uuid())
  symbol      String   @unique // Ex: BTCUSDT
  baseAsset   String   // Ex: BTC
  quoteAsset  String   // Ex: USDT
  isActive    Boolean  @default(true)
  createdAt   DateTime @default(now())

  scoreLogs     OracleScoreLog[]
  tradeJournals TradeJournal[]

  @@map("assets")
}

model OracleScoreLog {
  id             String       @id @default(uuid())
  assetId        String
  oracleScore    Float        // -100 a +100
  confidenceIndex Float       // 0 a 100%
  trendScore     Float
  volumeScore    Float
  momentumScore  Float
  liquidityScore Float
  narrativeScore Float
  correlationScore Float
  shieldStatus   ShieldStatus @default(SAFE)
  rationale      String       @db.Text
  timestamp      DateTime     @default(now())

  asset Asset @relation(fields: [assetId], references: [id], onDelete: Cascade)

  @@index([assetId, timestamp])
  @@map("oracle_score_logs")
}

model TradeJournal {
  id          String    @id @default(uuid())
  userId      String
  assetId     String
  side        TradeSide
  entryPrice  Float
  stopLoss    Float
  takeProfit  Float
  positionSize Float
  pnl         Float?
  notes       String?   @db.Text
  executedAt  DateTime  @default(now())
  closedAt    DateTime?

  user  User  @relation(fields: [userId], references: [id], onDelete: Cascade)
  asset Asset @relation(fields: [assetId], references: [id], onDelete: Cascade)

  @@map("trade_journals")
}
