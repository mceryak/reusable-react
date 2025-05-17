import { useState, type FormEvent } from "react";
import FormInput from "./FormInput";
import type { FormItem } from "../utils/types";
import { generateAmortizationTable, calculateLoan, type CalculationProps } from "../utils/calculations";
import { FaCalculator } from "react-icons/fa";
import Accordion from "../../Accordion/Accordion";
import SavingsSpan from "./SavingsSpan";
import Table from "./Table";
// import AmortizationTableYearRows from "./AmortizationTableYearRows";
import AmortizationTable from "./AmortizationTable";


const formItems: FormItem[] = [
  { type: 'number', label: 'Home Price', name: 'homePrice', required: true, preLabel: '$' },
  { type: 'number', label: 'Down Payment', name: 'downPayment', required: true, preLabel: '$' },
  { type: 'number', label: 'Interest', name: 'interestPct', required: true, postLabel: '%', step: "0.01" },
  { type: 'number', label: 'Loan Term', name: 'termInYears', required: true, postLabel: 'years' },
  { type: 'number', label: 'Extra Payment', name: 'extraPerMonth', required: true, preLabel: '$', postLabel: '/ month' },
  // { type: 'number', label: 'Property Tax', name: 'propertyTaxYearly', preLabel: '$', postLabel: '/ year' },
  // { type: 'number', label: 'Insurance', name: 'insuranceYearly', preLabel: '$', postLabel: '/ year' },
]

const defaultInputs = {
  homePrice: 150_000,
  downPayment: 20_000,
  interestPct: 9.0,
  termInYears: 30,
  extraPerMonth: 0,
  propertyTaxYearly: 1_200,
  insuranceYearly: 1_100
};

export default function MortgageCalculator() {
  const [inputs, setInputs] = useState(defaultInputs);
  const [errors, setErrors] = useState(formItems.reduce((acc, item) => ({...acc, [item.name]: '' }), {}));

  const props: CalculationProps = {
    loanAmount: defaultInputs.homePrice - defaultInputs.downPayment,
    annualInterestRate: defaultInputs.interestPct,
    loanTermYears: defaultInputs.termInYears,
    extraPayment: defaultInputs.extraPerMonth
  };
  const [loanResults, setLoanResults] = useState(calculateLoan(props));
  const [amortizationTable, setAmortizationTable] = useState(generateAmortizationTable(props));

  const handleSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();

    const formData = new FormData(evt.target as HTMLFormElement);
    const errorItems = formItems.filter(item => item.required && !formData.get(item.name));
    const gr0Items = formItems.filter(item => ['interestPct', 'homePrice', 'termInYears'].includes(item.name) && parseFloat(formData.get(item.name)) <= 0);
    if (errorItems.length || gr0Items.length) {
      setErrors({
        ...formItems.reduce((acc, item) => ({...acc, [item.name]: '' }), {}),
        ...gr0Items.reduce((acc, item) => ({...acc, [item.name]: 'Must be greater than 0.' }), {}),
        ...errorItems.reduce((acc, item) => ({...acc, [item.name]: 'This field is required' }), {})
      });
      return;
    }
    setErrors(formItems.reduce((acc, item) => ({...acc, [item.name]: '' }), {}));

    setInputs(pv => Object.keys(pv).reduce((acc, key) => ({ ...acc, [key]: parseFloat(formData.get(key) ?? '0')}), {}));
    // Example use:
    const props: CalculationProps = {
      loanAmount: parseFloat(formData.get('homePrice') ?? '0') - parseFloat(formData.get('downPayment') ?? 0),
      annualInterestRate: parseFloat(formData.get('interestPct')),
      loanTermYears: parseFloat(formData.get('termInYears')),
      extraPayment: parseFloat(formData.get('extraPerMonth') ?? 0)
    };
    setLoanResults(calculateLoan(props));
    setAmortizationTable(generateAmortizationTable(props));
  }

  let resultColumns = inputs.extraPerMonth > 0 ? [
    { name: 'category', label: '' },
    { name: 'original', label: 'Original' },
    { name: 'withExtra', label: 'With Extra' }
  ] : [
    { name: 'category', label: '' },
    { name: 'original', label: '' },
  ]
  
  return <div className="flex flex-col lg:flex-row gap-5 w-full lg:px-10">
    <div className="pb-4 lg:pb-0 border-b-4 border-dotted lg:border-b-0">
      <form onSubmit={handleSubmit} className={`border-4 border-amber-400 bg-amber-200 p-4 rounded-xl`}>
        {formItems.map(item => (
          <FormInput key={item.name} item={item} defaultValue={inputs[item.name]} error={errors[item.name]} />
        ))}
        <button className="w-full text-white cursor-pointer mt-2">
          <div className="flex gap-2 items-center w-full justify-center p-2 rounded-lg bg-amber-700 hover:scale-105 transition-transform">
            <FaCalculator />
            <span>Calculate</span>
          </div>
        </button>
      </form>
    </div>
    <ul className="w-full text-sm md:text-base">
      {inputs.extraPerMonth > 0 && 
        <li className="w-full">
          <Accordion label="Savings" bgColor="green" isExpandedByDefault>
            <h2>With your extra monthly payment of ${inputs.extraPerMonth}, you save:</h2>
            <ul className="list-disc list-inside flex flex-col gap-2 mt-2 pl-3">
              <li><SavingsSpan>{loanResults.interestSaved}</SavingsSpan> total in interest payments</li>
              <li><SavingsSpan>{loanResults.timeSavedYearsAndMonths[0]} years and {loanResults.timeSavedYearsAndMonths[1]} months</SavingsSpan> off your loan term</li>
            </ul>
          </Accordion>
        </li>
      }
      <li className="w-full">
        <Accordion label="Results" bgColor="slate" isExpandedByDefault>
          <Table firstColHighlight hideColumns={inputs.extraPerMonth <= 0} columns={resultColumns} rows={[
            { category: 'Monthly Payment', original: loanResults.baseMonthlyPayment, withExtra: loanResults.monthlyPaymentWithExtra },
            { category: 'Total Payments', original: loanResults.totalPaidStandard, withExtra: loanResults.totalPaidExtra },
            { category: 'Total Interest', original: loanResults.totalInterestStandard, withExtra: loanResults.totalInterestExtra },
            { category: 'Pay Off In', original: `${inputs.termInYears} yrs`, withExtra: `${loanResults.yearsAndMonthsWithExtra[0]} yrs, ${loanResults.yearsAndMonthsWithExtra[1]} mos` },
          ]}/>
        </Accordion>
      </li>
      <li className="w-full">
        <AmortizationTable table={amortizationTable} hasExtraPayment={inputs.extraPerMonth > 0}/>
      </li>
    </ul>
  </div>
}
