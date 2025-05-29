import BlockForm from "../components/BlockForm"
import Input from "../components/Input"
import RequiredString from "../components/inputs/RequiredString"
import { AccordionSchema, AccordionTheme, type Accordion } from "../types"
import { getFieldName } from "../utils/convenientFunctions"

interface Props {
  name: string
  block: Accordion
}

export default function AccordionBuilder({ name, block }: Props) {
  return (
    <BlockForm block={block} schema={AccordionSchema} name={name}>
      <RequiredString name={getFieldName(name, 'title')} />
      <Input props={{ 
          name: getFieldName(name, 'theme'),
          type: 'select',
          options: AccordionTheme.options
      }}/>
    </BlockForm>
  )
}
