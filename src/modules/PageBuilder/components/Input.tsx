import { useEffect, useState } from "react";
import { useFormContext, type FieldValues, type RegisterOptions, type UseFormRegisterReturn } from "react-hook-form";

type InputType =
  // begin standard types
  | 'button'
  | 'checkbox'
  | 'color'
  | 'date'
  | 'datetime-local'
  | 'email'
  | 'file'
  | 'hidden'
  | 'image'
  | 'month'
  | 'number'
  | 'password'
  | 'radio'
  | 'range'
  | 'reset'
  | 'search'
  | 'submit'
  | 'tel'
  | 'text'
  | 'time'
  | 'url'
  | 'week'
  // begin custom types
  | 'textarea'
  | 'select';


type InputProps = {
  name: string;
  type?: InputType | undefined
  readOnly?: boolean | undefined;
  hidden?: boolean | undefined;
  label?: string | undefined;
  prefix?: string | undefined;
  rows?: number | undefined;
  options?: (string | number)[] | undefined;
}

export type Category = {
  label: string;
  field: string;
  options: string[];
}
interface Props {
  props: InputProps;
  options?: RegisterOptions<FieldValues, string> | undefined;
  categories?: Category[] | undefined;
  // name: string;
  // required?: boolean;
  // readonly?: boolean
  // label?: string | undefined;
  // hidden?: boolean
  // defaultValue?: string | number | undefined;
  // value?: string | number | undefined;
  // prefix?: string | undefined;
}

function Input({ props, options }: { props: InputProps, options: RegisterOptions<FieldValues, string> | undefined}) {
  const { register } = useFormContext();
  const cssClass = `${props.type === 'checkbox' ? '' : 'grow-1 outline-none'} p-2 focus-visible:border-b-2`;
  // console.log('name', props.name);
  switch (props.type) {
    case 'textarea':
      return <textarea 
        id={props.name}
        {...props} 
        {...register(props.name, options)}
        className={cssClass}
      ></textarea>;
    case 'select':
      return <select
        id={props.name}
        {...{...props, options: (props?.options ?? []).map(o => `${o}`)}}
        // {...(registry ?? {})}
        {...register(props.name, options)}
        className={cssClass}
      >
        {(props.options ?? []).map(option => (
          <option value={`${option}`} key={option}>{option}</option>
        ))}
      </select>;
    default:
      return (
        <input 
          id={props.name}
          {...props}
          // {...(registry ?? {})}
          {...register(props.name, options)}
          className={cssClass}
        />
      );
  }
}

export default function InputWrapper({ categories, props, options }: Props) {
  // const { name, required=false, hidden=false, readonly=false, value, defaultValue, label, prefix } = props;
  const { name, label, hidden } = props;
  // const [registry, setRegistry] = useState<UseFormRegisterReturn>();
  // const { register } = useFormContext();

  // this pattern is to avoid state updates during renders when <DevTools /> is active
  // useEffect(() => {
  //   setRegistry(register(name, options));
  // }, [register, name, options]);

  if (hidden) {
    return <Input props={props} options={options} />
  }

  const colSpan = ['textarea'].includes(props.type ?? 'text') ? 'col-span-2' : '';

  return <div className={`flex flex-col gap-1 ${colSpan}`}>
    <label htmlFor={name} className="capitalize">
      <div className="flex gap-1">
        <span>{label ?? name.split('.').at(name.split('.').length - 1)?.replace(/([A-Z])/g, " $1")}</span>
        {options?.required && <span className="text-red-500">*</span>}
      </div>
    </label>
    <div className="flex gap-2 items-center">
      {
        categories?.map(c => <div className="flex gap-2 items-center grow-1" key={c.field}>
          <label htmlFor={`${name}.${c.field}`}>{c.label}</label>
          <InputBG props={{...props, name: `${name}.${c.field}`, options: c.options}} options={options} />
        </div>) 
        ?? <InputBG props={props} options={options} />
      }
    </div>
    
  </div>
}

function InputBG({ props, options }: { props: InputProps, options: RegisterOptions<FieldValues, string> | undefined }) {

  const { prefix } = props;
  const padding = props.type === 'checkbox' ? 'p-3' : '';
  return <div className={`${padding} flex grow-1 bg-zinc-600 rounded-md outline-none items-center border-zinc-200 `}>
    {prefix && <span className="p-2 text-zinc-300 shrink text-xs">{prefix}</span>}
      <Input 
        props={props} 
        options={options} 
      />
  </div>;
}