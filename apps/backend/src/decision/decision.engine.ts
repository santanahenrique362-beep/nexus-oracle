import {
  DecisionInput,
  DecisionOutput,
  ShieldStatus,
  MarketState,
  RiskLevel,
} from '../../../../packages/types';

export class DecisionEngine {
  public static evaluate(input: DecisionInput): DecisionOutput {
    // 1. Tratamento de Métricas Sem Fallbacks Fictícios
    const liquidity = input.liquidity ?? 0;
    const volatility = input.volatility ?? 0;
    const correlation = input.correlation ?? 50;
    const narrative = input.narrative ?? 50;

    // Cálculo do Nível de Confiança baseado na presença/qualidade dos dados
    let dataCompleteness = 100;
    if (input.liquidity === undefined) dataCompleteness -= 20;
    if (input.volatility === undefined) dataCompleteness -= 20;

    // 2. Cálculo do Oracle Score Ponderado
    const rawScore =
      input.trend * 0.35 +
      input.volume * 0.25 +
      input.momentum * 0.20 +
      liquidity * 0.10 +
      narrative * 0.10;

    const oracleScore = Math.min(100, Math.max(0, Math.round(rawScore)));
    const confidence = Math.min(100, Math.max(0, Math.round(dataCompleteness)));

    // 3. Determinação da Matriz de Risco & Shield Status
    let shield: ShieldStatus = 'GREEN';
    let risk: RiskLevel = 'LOW';

    if (volatility > 75 || liquidity < 30) {
      shield = 'RED';
      risk = 'CRITICAL';
    } else if (volatility > 50 || liquidity < 60 || oracleScore < 40) {
      shield = 'YELLOW';
      risk = 'MEDIUM';
    }

    // 4. Mapeamento do Estado de Mercado
    let marketState: MarketState = 'RANGING';
    if (volatility > 70) marketState = 'VOLATILE';
    else if (liquidity < 30) marketState = 'ILLIQUID';
    else if (input.trend > 65 || input.trend < 35) marketState = 'TRENDING';

    // 5. Síntese Tática (Strengths & Warnings)
    const strengths: string[] = [];
    const warnings: string[] = [];

    if (input.trend > 70) strengths.push('Tendência de alta bem definida em múltiplos prazos');
    if (input.volume > 70) strengths.push('Fluxo e volume institucional acima da média');
    if (liquidity > 70) strengths.push('Alta liquidez no livro de ordens, minimizando slippage');

    if (volatility > 60) warnings.push('Elevada volatilidade no curto prazo');
    if (liquidity < 40 && input.liquidity !== undefined) warnings.push('Liquidez reduzida no book');
    if (input.momentum < 40) warnings.push('Divergência de desaceleração do momentum');
    if (dataCompleteness < 100) warnings.push('Análise executada com conjunto parcial de dados');

    // 6. Recomendação Executiva Consolidada
    let recommendation = 'Manter neutralidade e aguardar definição de estrutura.';
    if (shield === 'RED') {
      recommendation = 'VETO OPERACIONAL: Risco crítico detectado. Não abrir novas posições.';
    } else if (oracleScore >= 75 && shield === 'GREEN') {
      recommendation = 'Condições favoráveis para alocação com viés comprador. Manter gerenciamento de risco.';
    } else if (oracleScore <= 35) {
      recommendation = 'Estrutura técnica fragilizada com pressão vendedora predominate.';
    }

    return {
      asset: input.asset,
      oracleScore,
      confidence,
      shield,
      marketState,
      trend: input.trend,
      volume: input.volume,
      momentum: input.momentum,
      liquidity,
      volatility,
      correlation,
      narrative,
      risk,
      strengths,
      warnings,
      recommendation,
    };
  }
}
