import BlockForm from "../components/BlockForm";
import { ContactFormSchema, type ContactForm } from "../types";
import { getFieldName } from "../utils/convenientFunctions";

interface Props {
  name: string;
  block: ContactForm;
}

export default function ContactFormBuilder({ name, block }: Props) {
  return (
    <BlockForm name={name} block={block} schema={ContactFormSchema}>
      
    </BlockForm>
  )
}