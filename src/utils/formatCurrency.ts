/**
 * Formats a number to Pakistani Rupee string (e.g. Rs. 1,800)
 */
export function formatCurrency(amount: number): string {
  return `Rs. ${amount.toLocaleString('en-US')}`;
}

export const formatPKR = formatCurrency;

