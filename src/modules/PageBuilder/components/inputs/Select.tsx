import Input from "../Input";


interface Props {
  name: string;
  options: (string | number)[];
}


export default function Select({ name, options }: Props) {
  return <Input props={{
    type: 'select',
    options: options,
    name
  }}/>
}