import BlockForm from "../components/BlockForm";
import { OurProcessSchema, type OurProcess } from "../types";
import { getFieldName } from "../utils/convenientFunctions";

interface Props {
  name: string;
  block: OurProcess;
}

export default function OurProcessBuilder({ name, block }: Props) {
  return (
    <BlockForm name={name} block={block} schema={OurProcessSchema}>
      
    </BlockForm>
  )
}