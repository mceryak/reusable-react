import { TW_TEXT_SAFELIST } from "../../styles/twTextSafelist";
import Input from "../Input";


interface Props {
  name: string;
}

export default function FontSize({ name }: Props) {
  return (
    <Input props={{ name, type: 'select', options: TW_TEXT_SAFELIST }} />
  )
}
