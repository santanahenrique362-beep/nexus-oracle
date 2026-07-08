# API_SPEC.md — Especificação de Contratos REST e WebSockets

## 1. Missão
Padronizar a comunicação entre a interface do usuário (Next.js) e o orquestrador de backend (NestJS), garantindo alta performance, baixa latência e contratos de dados tipados para REST e transmissões via WebSocket.

---

## 2. Objetivos
* **Contratos Estritos:** Definir estruturas previsíveis de requisição e resposta (DTOs).
* **Baixa Latência em Tempo Real:** Mapear canais de WebSocket para atualizações do Oracle Score em tempo real.
* **Padronização REST:** Utilizar códigos de status HTTP corretos e tratamento de erros uniforme.

---

## 3. Responsabilidades
* Documentar endpoints HTTP para autenticação, perfil de risco, ativos e diário de trade.
* Definir payloads e salas (*rooms*) de conexões via WebSocket.
* Servir como especificação para geração de Swagger/OpenAPI.

---

## 4. Estrutura de Comunicação

```text
┌─────────────────────────┐               ┌─────────────────────────┐
│                         │   HTTP REST   │                         │
│                         │ ────────────> │                         │
│    Next.js Frontend     │               │     NestJS Backend      │
│                         │   WebSocket   │                         │
│                         │ <───────────> │                         │
└─────────────────────────┘               └─────────────────────────┘
