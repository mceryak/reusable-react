import BlockForm from "../components/BlockForm";
import Checkbox from "../components/inputs/Checkbox";
import RequiredString from "../components/inputs/RequiredString";
import { LinkSchema, type Link } from "../types";
import { getFieldName } from "../utils/convenientFunctions";

interface Props {
  name: string;
  block: Link;
}

export default function LinkBuilder({ name, block }: Props) {
  return (
    <BlockForm name={name} block={block} schema={LinkSchema}>
      <RequiredString name={getFieldName(name, 'label')} />
      <RequiredString name={getFieldName(name, 'href')} />
      <Checkbox name={getFieldName(name, 'isExternal')} />
    </BlockForm>
  )
}