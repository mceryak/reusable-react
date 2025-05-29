import BlockForm from "../components/BlockForm";
import RequiredString from "../components/inputs/RequiredString";
import { GoogleMapsSchema, type GoogleMaps } from "../types";
import { getFieldName } from "../utils/convenientFunctions";

interface Props {
  name: string;
  block: GoogleMaps;
}

export default function GoogleMapsBuilder({ name, block }: Props) {
  return (
    <BlockForm name={name} block={block} schema={GoogleMapsSchema}>
      <RequiredString name={getFieldName(name, 'embedUrl')} />
    </BlockForm>
  )
}