import BlockForm from "../components/BlockForm";
import RequiredString from "../components/inputs/RequiredString";
import { TileLinkSchema, type TileLink } from "../types";
import { getFieldName } from "../utils/convenientFunctions";

interface Props {
  name: string;
  block: TileLink;
}

export default function TileLinkBuilder({ name, block }: Props) {
  return (
    <BlockForm name={name} block={block} schema={TileLinkSchema}>
      <RequiredString name={getFieldName(name, 'title')} />
      <RequiredString name={getFieldName(name, 'subtitle')} />
      <RequiredString name={getFieldName(name, 'relativeUrl')} />
    </BlockForm>
  )
}