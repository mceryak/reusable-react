
import BlockForm from "../components/BlockForm";
import Input from "../components/Input";
import { TextBlockSchema, type TextBlock } from "../types";



interface Props {
  name: string
  block: TextBlock
}

export default function SectionBuilder({ name, block }: Props) {
  // const { control, register } = useFormContext<FormData>();

  // const { fields: blocks, append, prepend, remove, swap, move, insert } = useFieldArray({ 
  //   name: `${name}.children`,
  //   control
  // });
  // console.log('in section builder');

  return <>
    <BlockForm block={block} name={name} schema={TextBlockSchema}>
      <Input  props={{ name: `${name}.text`, rows: 3, type: 'textarea'}} options={{ required: true }}/>      
    </BlockForm>
  </>
}
