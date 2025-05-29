import Input from '../Input';

interface Props {
  name: string;
}

export default function Checkbox({ name }: Props) {
  return (
    <Input props={{ name, type: 'checkbox' }}/>
  )
}
