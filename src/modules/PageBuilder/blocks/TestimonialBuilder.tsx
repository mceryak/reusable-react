import BlockForm from "../components/BlockForm";
import Input from "../components/Input";
import RequiredString from "../components/inputs/RequiredString";
import Select from "../components/inputs/Select";
import { Stars, TestimonialSchema, type Testimonial } from "../types";
import { getFieldName } from "../utils/convenientFunctions";

interface Props {
  name: string;
  block: Testimonial;
}

export default function TestimonialBuilder({ name, block }: Props) {
  return (
    <BlockForm name={name} block={block} schema={TestimonialSchema}>
      <RequiredString name={getFieldName(name, 'author')} />
      <RequiredString name={getFieldName(name, 'url')} />
      <Select name={getFieldName(name, 'stars')} options={Stars.options} />
      <Input  props={{ name: getFieldName(name, 'quote'), rows: 2, type: 'textarea'}} options={{ required: true }}/>      
    </BlockForm>
  )
}