# ORACLE_METHOD.md — Especificação do Método e Cálculo Quantitativo

## 1. Missão
Estabelecer um padrão matemático, estatístico e determinístico para processar múltiplos vetores de mercado, convertendo assimetrias de dados em indicadores numéricos transparentes e acionáveis para o operador.

---

## 2. Objetivos
* **Eliminar a Opacidade:** Expor integralmente as equações e pesos aplicados em cada análise.
* **Padronização Multiativo:** Aplicar uma métrica homogênea para comparação entre ativos distintos.
* **Redução de Ruído:** Amortecer falsos sinais através da métrica de consistência e variação estatística.

---

## 3. Responsabilidades
* Definir a equação oficial de composição do **Oracle Score ($OS$)**.
* Definir o algoritmo de cálculo do **Oracle Confidence Index ($OCI$)**.
* Estabelecer a tabela de pesos dinâmicos e regras de modulação.

---

## 4. Funcionamento
O método opera através do agrupamento de 6 sub-motores em duas métricas consolidadas:

1. **Oracle Score ($OS$):** Vetor direcional e de força ($[-100, +100]$).
2. **Oracle Confidence Index ($OCI$):** Métrica percentual de convergência entre motores ($[0\%, 100\%]$).

---

## 5. Arquitetura Matemática

### A. Equação do Oracle Score ($OS$)
O $OS$ é calculado pela combinação linear ponderada das pontuações dos sub-motores $S_i \in [-100, +100]$ com seus respectivos pesos $w_i \in [0, 1]$, onde $\sum w_i = 1.0$:

$$OS = \sum_{i \in \{T, V, M, L, C, N\}} (S_i \cdot w_i)$$

**Distribuição Padrão de Pesos ($w$):**
* Trend ($w_T$): $0.25$ (Tendência)
* Volume ($w_V$): $0.20$ (Volume e Distribuição)
* Liquidity ($w_L$): $0.20$ (Profundidade e Derivados)
* Momentum ($w_M$): $0.15$ (Força e Exaustão)
* Narrative ($w_N$): $0.10$ (Sentimento Macro)
* Correlation ($w_C$): $0.10$ (Correlação de Ativos)

### B. Equação do Oracle Confidence Index ($OCI$)
A confiança mede a coerência dos sub-motores. Sinais divergentes reduzem o $OCI$ através do desvio padrão ($\sigma$) das pontuações:

$$OCI = \left( 1 - \frac{\sigma(S_T, S_V, S_M, S_L, S_C, S_N)}{\sigma_{máx}} \right) \times 100$$

---

## 6. Fluxo de Processamento

```text
  [ Entrada: OHLCV, Book, Macro ]
                 │
                 ▼
 ┌───────────────────────────────┐
 │ Sub-Motores (T, V, M, L, C, N)│
 └───────────────┬───────────────┘
                 │
                 ▼
 ┌───────────────────────────────┐
 │   Orquestrador Oracle Score   │
 │   - Aplicação de Pesos        │
 │   - Análise de Desvio (OCI)   │
 └───────────────┬───────────────┘
                 │
                 ▼
  [ Saída: Score, OCI, Rationale ]
