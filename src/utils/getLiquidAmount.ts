const taxes = [0.0299, 0.0349, 0.0399];

export function getLiquidAmountAndTax(amount: number, installment: number) {
  const installmentAmount = amount / installment;
  let transactionTax = 0;
  let liquidAmount = 0;

  let installmentLiquidAMount = 0;

  if (installment === 1) {
    transactionTax = taxes[0];
    installmentLiquidAMount = installmentAmount * transactionTax;
  }

  if (installment > 1 && installment <= 6) {
    transactionTax = taxes[1];
    installmentLiquidAMount = installmentAmount * transactionTax;
  }

  if (installment > 7 && installment <= 12) {
    transactionTax = taxes[2];
    installmentLiquidAMount = installmentAmount * transactionTax;
  }

  const finalFee = installmentLiquidAMount * installment;

  liquidAmount = finalFee + amount;

  return {
    liquidAmount: liquidAmount,
    tax: transactionTax,
  };
}
