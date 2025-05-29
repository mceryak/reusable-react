import { TW_GRADIENT_FROM_SAFELIST, TW_GRADIENT_TO_SAFELIST } from "../../styles/twGradientSafelist";
import Input, { type Category } from "../Input";

interface Props {
  name: string;
}

const GRADIENT_CATEGORIES: Category[] = [
  { label: 'from', field: 'from', options: TW_GRADIENT_FROM_SAFELIST },
  { label: 'to', field: 'to', options: TW_GRADIENT_TO_SAFELIST },
  // { label: 'from', field: 'from', options: TW_GRADIENT_FROM_SAFELIST.map(v => v.split('-').at(1)!.split('/').at(0)!) },
  // { label: '/', field: 'from-opacity', options: TW_GRADIENT_FROM_SAFELIST.map(v => v.split('-').at(1)!.split('/').at(1)!) },
  // { label: 'to', field: 'to', options: TW_GRADIENT_TO_SAFELIEST.map(v => v.split('-').at(1)!.split('/').at(0)!) },
  // { label: '/', field: 'to-opacity', options: TW_GRADIENT_TO_SAFELIEST.map(v => v.split('-').at(1)!.split('/').at(0)!) },
]

export default function GradientPicker({ name }: Props) {
  return (
    <Input 
      categories={GRADIENT_CATEGORIES}
      props={{ name, type: 'select' }}
    />
  )
}
