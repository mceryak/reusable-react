

export type CalculationProps = {
  loanAmount: number,
  annualInterestRate: number,
  loanTermYears: number,
  extraPayment?: number | undefined,
  insuranceYearly?: number | undefined
  propertyTaxYearly?: number | undefined
}

export type CalculateLoanResults = {
  baseMonthlyPayment: string
  totalInterestStandard: string
  totalPaidStandard: string
  monthlyPaymentWithExtra: string
  monthlyPaymentWithExtraAndEscrow: string
  totalInterestExtra: string
  totalPaidExtra: string
  monthsWithExtra: number
  yearsAndMonthsWithExtra: [number, number]
  interestSaved: string
  timeSavedMonths: number,
  timeSavedYearsAndMonths: [number, number]
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
});

function calculateLoan({ loanAmount, annualInterestRate, loanTermYears, extraPayment = 0, insuranceYearly=0, propertyTaxYearly=0 }: CalculationProps): CalculateLoanResults {

  const monthlyRate = annualInterestRate / 100 / 12;
  const monthlyInsurance = insuranceYearly / 12;
  const monthlyPropertyTax = propertyTaxYearly / 12;
  const totalPayments = loanTermYears * 12;

  // Standard monthly payment using amortization formula
  const baseMonthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) /
                              (Math.pow(1 + monthlyRate, totalPayments) - 1);

  // Standard totals
  const totalPaidStandard = baseMonthlyPayment * totalPayments;
  const totalInterestStandard = totalPaidStandard - loanAmount;

  // Simulate with extra payments
  let balance = loanAmount;
  let totalInterestExtra = 0;
  let months = 0;

  const monthlyPaymentWithExtra = baseMonthlyPayment + extraPayment;
  const monthlyPaymentWithExtraAndEscrow = monthlyPaymentWithExtra + monthlyInsurance + monthlyPropertyTax;

  while (balance > 0) {
    const interest = balance * monthlyRate;
    const principal = monthlyPaymentWithExtra - interest;

    if (principal > balance) {
      totalInterestExtra += interest;
      months++;
      break; // Final payment
    }

    balance -= principal;
    totalInterestExtra += interest;
    months++;
  }

  const totalPaidExtra = monthlyPaymentWithExtra * months;
  const interestSaved = totalInterestStandard - totalInterestExtra;
  const timeSavedMonths = totalPayments - months;

  
  return {
    baseMonthlyPayment: currencyFormatter.format(baseMonthlyPayment),
    totalInterestStandard: currencyFormatter.format(totalInterestStandard),
    totalPaidStandard: currencyFormatter.format(totalPaidStandard),

    monthlyPaymentWithExtra: currencyFormatter.format(monthlyPaymentWithExtra),
    monthlyPaymentWithExtraAndEscrow: currencyFormatter.format(monthlyPaymentWithExtraAndEscrow),
    totalInterestExtra: currencyFormatter.format(totalInterestExtra),
    totalPaidExtra: currencyFormatter.format(totalPaidExtra),
    monthsWithExtra: months,
    yearsAndMonthsWithExtra: [Math.floor(months / 12), months % 12],

    interestSaved: currencyFormatter.format(interestSaved),
    timeSavedMonths: timeSavedMonths,
    timeSavedYearsAndMonths: [Math.floor(timeSavedMonths / 12), timeSavedMonths % 12]
  };
}


export type AmortizationTableRow = {
  month: number
  interestPaidStandard: string
  principalPaidStandard: string
  remainingBalanceStandard: string
  interestPaidWithExtra: string
  principalPaidWithExtra: string
  remainingBalanceWithExtra: string
}

function generateAmortizationTable({ loanAmount, annualInterestRate, loanTermYears, extraPayment = 0 }: CalculationProps): AmortizationTableRow[][] {
  const monthlyRate = annualInterestRate / 100 / 12;
  const totalPayments = loanTermYears * 12;

  const baseMonthlyPayment = loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalPayments) /
                              (Math.pow(1 + monthlyRate, totalPayments) - 1);
  const monthlyPaymentWithExtra = baseMonthlyPayment + extraPayment;

  // Helper to generate table
  // function buildTable(paymentAmount: number) {
  //   let balance = loanAmount;
  //   let month = 1;
  //   const table = [];

  //   while (balance > 0) {
  //     const interest = balance * monthlyRate;
  //     let principal = paymentAmount - interest;

  //     // Final payment adjustment
  //     if (principal > balance) {
  //       principal = balance;
  //       paymentAmount = interest + principal;
  //     }

  //     balance -= principal;

  //     table.push({
  //       month,
  //       payment: currencyFormatter.format(paymentAmount),
  //       interestPaid: currencyFormatter.format(interest),
  //       principalPaid: currencyFormatter.format(principal),
  //       remainingBalance: currencyFormatter.format(balance)
  //     });

  //     month++;
  //   }

  //   return table;
  // }

  let balanceS = loanAmount;
  let balanceE = loanAmount;
  let month = 1;
  const table: AmortizationTableRow[][] = [[]];

  while (balanceS > 0 || balanceE > 0) {
    if (month % 12 === 0) {
      // start new array for the next 12 months
      table.push([]);
    }
    
    const interestS = balanceS * monthlyRate;
    const interestE = balanceE * monthlyRate;
    let principalS = Math.min(baseMonthlyPayment - interestS, balanceS);
    let principalE = Math.min(monthlyPaymentWithExtra - interestE, balanceE);

    // Final payment adjustment
    // if (principal > balance) {
    //   principal = balance;
    //   paymentAmount = interest + principal;
    // }

    balanceS -= principalS;
    balanceE -= principalE;

    let last = table.at(table.length - 1)!;
    last.push({
      month,
      // payment: currencyFormatter.format(paymentAmount),
      interestPaidStandard: currencyFormatter.format(interestS),
      principalPaidStandard: currencyFormatter.format(principalS),
      remainingBalanceStandard: currencyFormatter.format(balanceS),
      interestPaidWithExtra: currencyFormatter.format(interestE),
      principalPaidWithExtra: currencyFormatter.format(principalE),
      remainingBalanceWithExtra: currencyFormatter.format(balanceE)
    });

    month++;
  }
  
  return table
}




export { calculateLoan, generateAmortizationTable };