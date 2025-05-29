import { SizeSchema } from "../../types";
import Input from "../Input";


interface Props {
  name: string;
}

export default function SizeSelect({ name }: Props) {
  return (
    <Input 
      props={{ name, type: 'select', options: SizeSchema.options }} 
      options={{ required: 'This field is required.'}} 
    />
  )
}
