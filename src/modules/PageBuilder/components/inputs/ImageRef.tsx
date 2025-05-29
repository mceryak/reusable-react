import { PublicImageEnum } from "../../types";
import { REQUIRED_STRING } from "../../utils/commonInputOptions";
import Input from "../Input";


interface Props {
  name: string;
  label: string;
  required?: boolean;
  type: 'r2' | 'public';
  // allowed?: ('r2' | 'public')[]
}

export default function ImageRef({ name, label, type, required=false }: Props) {
  return <>
    <Input 
      props={{ name: `${name}.type`, hidden: true, readOnly: true }} 
      options={{ value: type }}
    />
    <Input 
      props={{ 
        name: `${name}.ref`, 
        prefix: type === 'public' ? '/public/images/' : undefined,
        label, 
        type: type === 'public' ? 'select' : 'text', 
        options: type === 'public' ? PublicImageEnum.options : [] 
      }}
      options={{
        required: required ? 'This field is required.' : undefined
      }}
    />
  </>;
}
