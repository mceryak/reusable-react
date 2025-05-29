import BlockForm from "../components/BlockForm";
import RequiredString from "../components/inputs/RequiredString";
import { HeaderSchema, type Header } from "../types";
import { getFieldName } from "../utils/convenientFunctions";

interface Props {
  name: string;
  block: Header;
}

export default function HeaderBuilder({ name, block }: Props) {
  return (
    <BlockForm name={name} block={block} schema={HeaderSchema}>
      <RequiredString name={getFieldName(name, 'title')} />
    </BlockForm>
  )
}