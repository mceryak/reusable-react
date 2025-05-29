import BlockForm from "../components/BlockForm";
import RequiredString from "../components/inputs/RequiredString";
import Select from "../components/inputs/Select";
import { BulletPointSchema, ColorTheme, mdiIcon, type BulletPoint } from "../types";
import { getFieldName } from "../utils/convenientFunctions";

interface Props {
  name: string;
  block: BulletPoint;
}

export default function BulletPointBuilder({ name, block }: Props) {
  return (
    <BlockForm name={name} block={block} schema={BulletPointSchema}>
      <RequiredString name={getFieldName(name, 'text')} />
      <Select name={getFieldName(name, 'icon')} options={mdiIcon.options} />
      <Select name={getFieldName(name, 'theme')} options={ColorTheme.options} />
    </BlockForm>
  )
}