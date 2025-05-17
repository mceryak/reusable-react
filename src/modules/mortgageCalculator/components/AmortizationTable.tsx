import { useState } from "react";
import Accordion from "../../Accordion/Accordion";
import type { AmortizationTableRow } from "../utils/calculations";
import AmortizationTableYearRows from "./AmortizationTableYearRows";


type Props = {
  table: AmortizationTableRow[][]
  hasExtraPayment: boolean
}

const amortizationColumnsMd = [
    { label: 'Mo.', name: 'month' },
    { name: 'interestPaidStandard', label: 'Interest' },
    { name: 'principalPaidStandard', label: 'Principal' },
    { name: 'remainingBalanceStandard', label: 'Principal Remaining' },
    { name: 'interestPaidWithExtra', label: 'Interest' },
    { name: 'principalPaidWithExtra', label: 'Principal' },
    { name: 'remainingBalanceWithExtra', label: 'Principal Remaining' },
  ];
  const amortizationColumnsSmStandard = [
    { label: 'Mo.', name: 'month' },
    { name: 'interestPaidStandard', label: 'Interest' },
    { name: 'principalPaidStandard', label: 'Principal' },
    { name: 'remainingBalanceStandard', label: 'Principal Remaining' }
  ];
  const amortizationColumnsSmWithExtra = [
    { label: 'Mo.', name: 'month' },
    { name: 'interestPaidWithExtra', label: 'Interest' },
    { name: 'principalPaidWithExtra', label: 'Principal' },
    { name: 'remainingBalanceWithExtra', label: 'Principal Remaining' },
  ];

export default function AmortizationTable({ table, hasExtraPayment }: Props) {
  const [selectedOption, setSelectedOption] = useState<'original' | 'withExtra'>('withExtra');
  const smColumns = selectedOption === 'withExtra' && hasExtraPayment ? amortizationColumnsSmWithExtra : amortizationColumnsSmStandard;
  const mdColumns = hasExtraPayment ? amortizationColumnsMd : amortizationColumnsSmStandard;
  
  return (
    <Accordion label="Amortization Table" bgColor="stone" noSectionBg>
      {hasExtraPayment && <select 
        className="w-full p-2 bg-slate-100 rounded-xl mb-2 md:hidden" 
        value={selectedOption} 
        onChange={(e) => setSelectedOption(e.target.value)}
      >
        <option value="original">Original</option>
        <option value="withExtra">With Extra Payment</option>
      </select>}

      <div className="hidden md:block text-sm">
        <table className="">
          <thead>
            {hasExtraPayment && <tr className={``}>
              <th></th>
              <th colSpan={3} className="p-2 border-r-4 border-white text-center bg-gray-200">Original</th>
              <th colSpan={3} className="p-2 text-center bg-gray-200">With Extra Payment</th>
            </tr>}
            <tr>
              {mdColumns.map((col, idx) => 
                <th 
                  key={col.name} 
                  className={`px-4 py-2 border-1 bg-gray-100 ${idx === 0 || (idx === 3 && hasExtraPayment) ? 'border-r-4' : ''}`}
                >{col.label}</th>
              )}
            </tr>
          </thead>
          <tbody className="bg-white">
            {table.map((rows, yearIdx) => <AmortizationTableYearRows key={yearIdx+1} year={yearIdx+1} columns={mdColumns} rows={rows}/>)}
          </tbody>
        </table>
      </div>
      <div className="md:hidden">
        <table className="bg-white">
          <thead>
            <tr>
              {smColumns.map((col, idx) => 
                <th 
                  key={col.name} 
                  className={`px-4 py-2 border-1 bg-gray-100 ${idx === 0 ? 'border-r-4' : ''}`}
                >{col.label}</th>
              )}
            </tr>
          </thead>
          <tbody>
            {table.map((rows, yearIdx) => <AmortizationTableYearRows key={yearIdx+1} year={yearIdx+1} columns={smColumns} rows={rows}/>)}
          </tbody>
        </table>
      </div>
    </Accordion>
  )
}
