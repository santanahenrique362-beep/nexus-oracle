# SECURITY.md — Diretrizes e Arquitetura de Segurança da Informação

## 1. Missão
Garantir a integridade, confidencialidade e disponibilidade dos dados do Nexus Oracle, estabelecendo barreiras rígidas de proteção contra acessos não autorizados, vazamentos de credenciais e exploração de vulnerabilidades em nivel de infraestrutura e aplicação.

---

## 2. Objetivos
* **Proteção de Segredos:** Proibir terminantemente o armazenamento de chaves de API ou segredos de ambiente no código-fonte.
* **Autenticação Robusta:** Implementar gerenciamento de sessão seguro via JSON Web Tokens (JWT) e hashing forte de senhas.
* **Resiliência da API:** Aplicar limitadores de taxa de requisição (*Rate Limiting*) para mitigar ataques de negação de serviço (DDoS) e força bruta.

---

## 3. Responsabilidades
* Definir padrões de criptografia para dados em trânsito e em repouso.
* Estabelecer regras de higienização e validação de dados de entrada (*Input Validation*).
* Orientar o gerenciamento seguro de variáveis de ambiente.

---

## 4. Arquitetura Defensiva

```text
  [ Cliente Frontend ]
           │
           ▼
┌──────────────────────────┐
│  Rate Limiter & CORS     │ ──> (Bloqueia abuso de IP/origem)
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Guarda de JWT Auth      │ ──> (Valida token e permissões)
└──────────┬───────────────┘
           │
           ▼
┌──────────────────────────┐
│  Validation Pipe (DTOs)  │ ──> (Sanitiza dados / Previne Injection)
└──────────┬───────────────┘
           │
           ▼
  [ Motores / Banco ]
