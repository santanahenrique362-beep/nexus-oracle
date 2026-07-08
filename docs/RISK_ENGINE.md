# RISK_ENGINE.md — Motor de Gestão de Risco e Proteção de Capital (Oracle Shield)

## 1. Missão
Atuar como a camada primária de proteção do capital do operador, calculando matematicamente os limites de exposição, dimensionamento de lote e parâmetros de Stop Loss/Take Profit, sobrepondo-se a qualquer viés operacional.

---

## 2. Objetivos
* **Preservação de Capital:** Evitar o risco de ruína ajustando o tamanho de posição com base na volatilidade do ativo.
* **Padronização do Risco/Recompensa:** Garantir que apenas operações com assimetria favorável sejam aprovadas.
* **Ativação do Oracle Shield:** Intervir e bloquear sinais otimistas quando condições extremas de volatilidade ou liquidez forem detectadas.

---

## 3. Responsabilidades
* Calcular o tamanho ideal de posição ($Position Size$) em função da banca do usuário.
* Avaliar a relação Risco:Recompensa ($R:R$).
* Emitir o status do **Oracle Shield** (Verde = Operacional; Amarelo = Alerta de Volatilidade; Vermelho = Bloqueio Total).

---

## 4. Funcionamento
O Risk Engine processa as configurações de risco do usuário em conjunto com os dados do ativo para determinar o nível de segurança da operação.

```text
  [ Configuração do Operador ] + [ Ativo / Stop Loss / ATR ]
                                │
                                ▼
                   ┌──────────────────────────┐
                   │   Calculadora de Risco   │
                   │  - Position Size ($PS$)  │
                   │  - Ratio R:R             │
                   └────────────┬─────────────┘
                                │
                                ▼
                   ┌──────────────────────────┐
                   │    Oracle Shield Gate    │
                   │ (Status: Verde/Vermelho) │
                   └────────────┬─────────────┘
                                │
                                ▼
                 [ Saída: Ordem Aprovada/Veto ]
