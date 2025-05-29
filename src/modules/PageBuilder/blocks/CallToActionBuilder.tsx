import BlockForm from "../components/BlockForm";
import RequiredString from "../components/inputs/RequiredString";
import Select from "../components/inputs/Select";
import { CallToActionSchema, ColorTheme, type CallToAction } from "../types";
import { getFieldName } from "../utils/convenientFunctions";

interface Props {
  name: string;
  block: CallToAction;
}

export default function CallToActionBuilder({ name, block }: Props) {
  return (
    <BlockForm name={name} block={block} schema={CallToActionSchema}>
      <RequiredString name={getFieldName(name, 'label')} />     
      <RequiredString name={getFieldName(name, 'relativeUrl')} />
      <Select name={getFieldName(name, 'theme')} options={ColorTheme.options} />
    </BlockForm>
  )
}