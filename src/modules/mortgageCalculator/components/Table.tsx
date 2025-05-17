

export type Column = {
  label: string
  name: string
}

export type Row = {
  [key: string]: string | number | null
}

type Props = {
  columns: Column[]
  hideColumns?: boolean
  firstColHighlight?: boolean
  rows: Row[]
}

export default function Table({ columns, rows, hideColumns=false, firstColHighlight=false }: Props) {
  return (
    <table className="bg-white">
      {!hideColumns && 
        <thead>
          <tr>
            {columns.map(col => <th key={col.name} className="px-4 py-2 border-1 bg-gray-100">{col.label}</th>)}
          </tr>
        </thead>
      }
      <tbody>
        {rows.map((row, rowIdx) => <tr key={rowIdx}>
          {columns.map((col, colIdx) => <td key={colIdx} className={`${colIdx === 0 && firstColHighlight ? 'font-semibold bg-gray-100' : ''} px-4 py-2 border-1`}>
            {`${row[col.name] ?? ''}`}
          </td>)}
        </tr>)}
      </tbody>
    </table>
  )
}
