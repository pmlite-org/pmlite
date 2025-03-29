export const formatNumber = (num: number, decimals: number = 2): string => {
  return num.toFixed(decimals);
};

export const clamp = (num: number, min: number, max: number): number => {
  return Math.min(Math.max(num, min), max);
};

export const isInRange = (num: number, min: number, max: number): boolean => {
  return num >= min && num <= max;
};
