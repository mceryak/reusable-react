import { atom } from "nanostores";


export const inputs = atom({
  homePrice: 100_000,
  downPayment: 20_000,
  interestPct: 9.0,
  termInYears: 30,
  extraPerMonth: 0,
  propertyTaxYearly: 1_200,
  insuranceYearly: 1_100
});

// export const outputs = atom({
//   monthlyPayment
// })


export const setInput = (key: string, val: number) => {
  const curInputs = inputs.get();
  inputs.set({
    ...curInputs,
    [key]: val
  });
}