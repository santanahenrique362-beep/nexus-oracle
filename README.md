# Nexus Oracle — Plataforma Institucional de Inteligência de Mercado

## 1. Missão
Mapear e mitigar a incerteza dos mercados financeiros através da geração de contexto analítico determinístico de alta fidelidade, munindo o operador de inteligência técnica, macroeconômica e estatística transparente para a tomada de decisão soberana.

## 2. Objetivos
* **Geração de Contexto:** Converter streams de dados brutos e fragmentados em matrizes de informação estruturada.
* **Escalabilidade Decenal:** Sustentar uma arquitetura modular baseada em sub-motores desacoplados e de alta performance.
* **Transparência Absoluta:** Banir mecânicas de "caixa-preta", expondo os cálculos matemáticos e lógicos por trás de cada métrica gerada.

## 3. Filosofia
> O mercado gera dados. O Oracle gera contexto. O operador toma a decisão.

---

## 4. Stack Tecnológica Oficial
* **Frontend Application:** React, Next.js, TypeScript, Tailwind CSS
* **Backend Application:** NestJS, Node.js, WebSockets (Tempo Real)
* **Persistência de Dados & Cache:** PostgreSQL (Banco Principal), Prisma (ORM), Redis (Camada de Cache)
* **Infraestrutura & Hosting:** Supabase, Railway, Render, Vercel

---

## 5. Estrutura de Diretórios Oficial (Monorepo)

```text
nexus-oracle/
├── README.md                  # Identidade do projeto e documentação raiz
├── docs/                      # Especificações arquiteturais e manuais de motores
└── src/
    ├── apps/
    │   ├── frontend/          # Aplicação Web Client (Next.js)
    │   └── backend/           # API e Orquestrador Gateway (NestJS)
    └── packages/
        ├── oracle-engines/    # Motores de Regras de Negócio Puras
        ├── integrations/      # Clientes e Webhooks de APIs Externas
        ├── analytics/         # Módulos de Cálculo Estatístico e Agregadores
        ├── ai/                # Camada de Prompting e Interface com LLMs
        ├── database/          # Esquemas Prisma e Camada de Migração
        ├── shared-types/      # Definições de Interfaces e DTOs TypeScript
        └── shared-utils/      # Utilitários Puros e Funções Matemáticas
