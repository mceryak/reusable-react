import { REQUIRED_STRING } from "../../utils/commonInputOptions";
import Input from "../Input";


interface Props {
  name: string;
}

export default function RequiredString({ name }: Props) {
  return (
    <Input 
      props={{ name }} 
      options={{ ...REQUIRED_STRING }} 
    />
  )
}
