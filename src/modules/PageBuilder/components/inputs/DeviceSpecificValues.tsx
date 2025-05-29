import Input from "../Input";

interface Props {
  name: string;
  options: {
    sm: (string | number)[];
    md: (string | number)[];
    lg: (string | number)[];
  }
}

export default function DeviceSpecificValues({ name, options }: Props) {
  return (
    <div className="grid grid-cols-3 gap-3 items-center">
      {/* <Input labelInline props={{ name: `${name}.small` , type: 'select', options: options.sm }} />
      <Input labelInline props={{ name: `${name}.medium`, type: 'select', options: options.md  }} />
      <Input labelInline props={{ name: `${name}.large` , type: 'select', options: options.lg }} /> */}
    </div>
  )
}
