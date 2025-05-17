import { describe, expect, test } from "vitest";
import { calculateLoan } from "../utils/calculations";

describe('test loan calculation methods', () => {
  test('calculateLoan() no extra', () => {
    const results = calculateLoan({ loanAmount: 200_000, annualInterestRate: 7.75, loanTermYears: 30, extraPayment: 0, insuranceYearly: 1200, propertyTaxYearly: 1500 });
    expect(results.baseMonthlyPayment).toBe("$1,432.82");
    expect(results.monthlyPaymentWithExtra).toBe("$1,432.82");
    expect(results.monthlyPaymentWithExtraAndEscrow).toBe("$1,657.82");
    expect(results.totalInterestStandard).toBe("$315,816.82");
    expect(results.totalInterestExtra).toBe("$315,816.82");
    expect(results.totalPaidStandard).toBe("$515,816.82");
    expect(results.totalPaidExtra).toBe("$515,816.82");
    expect(results.interestSaved).toBe("$0.00");
    expect(results.monthsWithExtra).toBe(360);
    expect(results.timeSavedMonths).toBe(0);
    expect(results.timeSavedYearsAndMonths.at(0)).toBe(0); // years
    expect(results.timeSavedYearsAndMonths.at(1)).toBe(0); // months
    expect(results.yearsAndMonthsWithExtra.at(0)).toBe(30); // years
    expect(results.yearsAndMonthsWithExtra.at(1)).toBe(0); // months
  });

  test('calculateLoan() 100 extra', () => {
    const results = calculateLoan({ loanAmount: 200_000, annualInterestRate: 7.75, loanTermYears: 30, extraPayment: 100, insuranceYearly: 1200, propertyTaxYearly: 1500 });
    expect(results.baseMonthlyPayment).toBe("$1,432.82");
    expect(results.monthlyPaymentWithExtra).toBe("$1,532.82");
    expect(results.monthlyPaymentWithExtraAndEscrow).toBe("$1,757.82");
    expect(results.totalInterestStandard).toBe("$315,816.82");
    expect(results.totalInterestExtra).toBe("$240,358.29");
    expect(results.totalPaidStandard).toBe("$515,816.82");
    expect(results.totalPaidExtra).toBe("$441,453.45");
    expect(results.interestSaved).toBe("$75,458.53");
    expect(results.monthsWithExtra).toBe(288);
    expect(results.timeSavedMonths).toBe(72);
    expect(results.timeSavedYearsAndMonths.at(0)).toBe(6); // years
    expect(results.timeSavedYearsAndMonths.at(1)).toBe(0); // months
    expect(results.yearsAndMonthsWithExtra.at(0)).toBe(24); // years
    expect(results.yearsAndMonthsWithExtra.at(1)).toBe(0); // months
  });

  test('calculateLoan() 500 extra', () => {
    const results = calculateLoan({ loanAmount: 250_000, annualInterestRate: 8.0, loanTermYears: 25, extraPayment: 500, insuranceYearly: 0, propertyTaxYearly: 0 });
    expect(results.baseMonthlyPayment).toBe("$1,929.54");
    expect(results.monthlyPaymentWithExtra).toBe("$2,429.54");
    expect(results.monthlyPaymentWithExtraAndEscrow).toBe("$2,429.54");
    expect(results.totalInterestStandard).toBe("$328,862.16");
    expect(results.totalInterestExtra).toBe("$173,551.49");
    expect(results.totalPaidStandard).toBe("$578,862.16");
    expect(results.totalPaidExtra).toBe("$425,169.60");
    expect(results.interestSaved).toBe("$155,310.67");
    expect(results.monthsWithExtra).toBe(175);
    expect(results.timeSavedMonths).toBe(125);
    expect(results.timeSavedYearsAndMonths.at(0)).toBe(10); // years
    expect(results.timeSavedYearsAndMonths.at(1)).toBe(5); // months
    expect(results.yearsAndMonthsWithExtra.at(0)).toBe(14); // years
    expect(results.yearsAndMonthsWithExtra.at(1)).toBe(7); // months
  })
});