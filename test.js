function getLiquidAmount(amount, installment) {
  const installmentAmount = amount / installment;
  let liquidAmount = 0;

  let installmentLiquidAMount = 0;

  if (installment === 1) {
    installmentLiquidAMount = installmentAmount * taxes[0];
  }

  if (installment > 1 && installment <= 6) {
    installmentLiquidAMount = installmentAmount * taxes[1];
  }

  if (installment > 7 && installment <= 12) {
    installmentLiquidAMount = installmentAmount * taxes[2];
  }

  const finalFee = installmentLiquidAMount * installment;

  return (liquidAmount = finalFee + amount);
}
