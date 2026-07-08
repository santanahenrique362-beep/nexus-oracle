# 🏛️ Nexus Oracle — Especificação de Camadas da Arquitetura

Este documento estabelece o padrão de arquitetura de camadas (Layered Architecture) do Nexus Oracle, visando garantir o baixo acoplamento, a testabilidade e o princípio da complexidade progressiva para os próximos 10 anos.

---

## 1. Princípios Fundamentais

1. **Dependência Unidirecional:** Uma camada superior pode consumir uma camada inferior, mas uma camada inferior **nunca** pode conhecer ou depender de uma camada superior.
2. **Desacoplamento via Interfaces:** Toda comunicação entre módulos de negócio deve ser mediada por interfaces (contratos TypeScript). Nenhuma classe de serviço deve instanciar ou depender diretamente de implementações concretas de outros módulos.
3. **Monólito Modular:** O sistema nasce como um único monólito distribuído em pacotes ou pastas modulares lógicas. Cada módulo deve ser auto-contido para permitir sua futura extração para microsserviços (Fase 3) com refatoração zero de lógica de negócio.

---

## 2. Visão Geral das Camadas
