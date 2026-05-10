export interface OverloadCheck {
  safe: boolean;
  percentIncrease: number;
  warning?: string;
}

export function checkProgressiveOverload(previousWeight: number, currentWeight: number): OverloadCheck {
  if (previousWeight === 0) return { safe: true, percentIncrease: 0 };
  const percentIncrease = ((currentWeight - previousWeight) / previousWeight) * 100;
  if (percentIncrease > 10) {
    return {
      safe: false,
      percentIncrease,
      warning: `Weight increase of ${percentIncrease.toFixed(0)}% exceeds 10% safety threshold. Risk of injury.`,
    };
  }
  return { safe: true, percentIncrease };
}

export function suggestNextWeight(currentWeight: number, phase: string): number {
  if (phase === 'phase3') return currentWeight;
  return currentWeight + (currentWeight <= 12 ? 1 : 2);
}
