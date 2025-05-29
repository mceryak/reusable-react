import BlockForm from "../components/BlockForm"
import Input, { type Category } from "../components/Input"
// import DeviceSpecificValues from "../components/inputs/DeviceSpecificValues"
import { GRID_COLS_OPTIONS } from "../styles/twGridSafelist"
import { GridSchema, type Grid } from "../types"
import { getFieldName } from "../utils/convenientFunctions"


interface Props {
  name: string
  block: Grid
}

const SIZE_CATEGORIES: Category[] = [
  { label: 'sm', field: 'sm', options: GRID_COLS_OPTIONS.map(o => `${o}`) },
  { label: 'md', field: 'md', options: GRID_COLS_OPTIONS.map(o => `${o}`) },
  { label: 'lg', field: 'lg', options: GRID_COLS_OPTIONS.map(o => `${o}`) },
]

export default function GridBuilder({ name, block }: Props) {
  return (
    <BlockForm name={name} schema={GridSchema} block={block}>
      {/* <DeviceSpecificValues name={getFieldName(name, 'columns')} options={GRID_COLS_OPTIONS} /> */}
      <Input 
        categories={SIZE_CATEGORIES} 
        props={{
          name: getFieldName(name, 'columns'),
          type: 'select'
        }}/>
    </BlockForm>
  )
}
