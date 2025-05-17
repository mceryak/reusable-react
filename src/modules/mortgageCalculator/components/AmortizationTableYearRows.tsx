import { FaChevronDown, FaChevronLeft, FaChevronRight } from "react-icons/fa"
import type { AmortizationTableRow } from "../utils/calculations"
import { useState } from "react"

type Props = {
  year: number
  rows: AmortizationTableRow[]
  columns: { label: string, name: string }[]
}

export default function AmortizationTableYearRows({ rows, year, columns }: Props) {
  const [hideRows, setHideRows] = useState(false);

  return <>
    <tr><td colSpan={7} className={`bg-slate-200 text-center p-1 border-x-1 ${hideRows ? 'border-y-1' : ''}`}>
      <button className="cursor-pointer w-full" onClick={() => setHideRows(pv => !pv)}>
        <div className="flex gap-2 w-full items-center justify-center">
          <span className="text-gray-400 text-xs">
            {hideRows ? <FaChevronRight /> : <FaChevronDown />}
          </span>
          <span>Year {year}</span>
          <span className="text-gray-400 text-xs">
            {hideRows ? <FaChevronLeft /> : <FaChevronDown />}
          </span>
        </div>
      </button>
    </td></tr>
    {!hideRows && rows.map((row, rowIdx) =>
      <tr key={rowIdx}>
        {columns.map((col, colIdx) => <td 
          key={colIdx} 
          className={`${colIdx === 0 ? 'font-semibold bg-gray-100 border-r-4' : colIdx === 3 && columns.length > 4 ? 'border-r-4' : ''} px-4 py-2 border-1 ${row[col.name] === '$0.00' ? 'bg-green-100' : ''}`}
        >
          {`${row[col.name] ?? ''}`}
        </td>)}
      </tr>)}
  </>
}
