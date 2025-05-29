import BlockForm from "../components/BlockForm";
import RequiredString from "../components/inputs/RequiredString";
import Select from "../components/inputs/Select";
import { ColorTheme, NotepadSchema, type Notepad } from "../types";
import { getFieldName } from "../utils/convenientFunctions";

interface Props {
  name: string;
  block: Notepad;
}

export default function NotepadBuilder({ name, block }: Props) {
  return (
    <BlockForm name={name} block={block} schema={NotepadSchema}>
      <RequiredString name={getFieldName(name, 'title')} />
      <Select name={getFieldName(name, 'theme')} options={ColorTheme.options} />
    </BlockForm>
  )
}