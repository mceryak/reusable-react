import Input from '../Input';

interface Props {
  name: string;
  rows?: number;
  required?: boolean;
}

export default function TextArea({ name, rows=2, required=false }: Props) {
  return <Input 
    props={{ 
      name, 
      rows, 
      type: 'textarea'
    }} 
    options={{ required: required ? 'This field is required.' : undefined }}
  />;
}