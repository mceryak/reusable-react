import BlockForm from "../components/BlockForm";
import RequiredString from "../components/inputs/RequiredString";
import Select from "../components/inputs/Select";
import TextArea from "../components/inputs/TextArea";
import { OurProccessItemImage, OurProcessItemSchema, type OurProcessItem } from "../types";
import { getFieldName } from "../utils/convenientFunctions";

interface Props {
  name: string;
  block: OurProcessItem;
}

export default function OurProcessItemBuilder({ name, block }: Props) {
  return (
    <BlockForm name={name} block={block} schema={OurProcessItemSchema}>
      <RequiredString name={getFieldName(name, 'title')} />
      <Select name={getFieldName(name, 'image')} options={OurProccessItemImage.options} />
      <TextArea name={getFieldName(name, 'description')} required />
    </BlockForm>
  )
}