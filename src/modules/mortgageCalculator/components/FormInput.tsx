import FormSelect from "./FormSelect"
import type { FormItem } from "../utils/types"
import { type ChangeEvent } from "react"

type Props = { 
  item: FormItem
  defaultValue?: string | null | undefined
  error?: string
  onChange?: undefined | (<T extends (number | string | boolean)>(val: T) => void)
}

export default function FormInput({ item, defaultValue, error='', onChange }: Props) {
  const { name, label, cols=1, options=[], required=false, type="text", preLabel, postLabel, step } = item;

  const defaultCss = `px-2 w-full h-full rounded-lg bg-slate-100 border-red-500 ${error ? 'border-2' : ''}`;

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(evt.target.value);
    }
  }

  return <div className={`col-span-full ${cols === 1 ? 'md:col-span-1' : cols === 2 ? 'md:col-span-2' : 'md:col-span-3'}  flex flex-col gap-1`}>
    <label htmlFor={name}>{label} {required && <span className="text-red-500">*</span>}</label>
    
    <div className={`${defaultCss} flex gap-1 items-center`}>
      {!!preLabel && <span className="text-slate-800/50 font-light">{preLabel}</span>}
      {type === 'textarea' ? (
        <textarea name={name} id={name} className={`w-full h-full rounded-lg bg-slate-100`}  defaultValue={defaultValue ?? ''}></textarea>
      ) : type === 'select' ? (
        <FormSelect name={name} label={label} cols={cols} required={required} defaultCss={defaultCss} defaultValue={defaultValue ?? ''} error={error} options={options}/>
      ) : (
        <input id={name} name={name} type={type} defaultValue={defaultValue ?? ''} className="grow-1 py-2" onChange={handleChange} step={step}/>
      )}
      {!!postLabel && <span className="text-slate-800/50 text-nowrap font-light">{postLabel}</span>}
    </div>
    
    <p className="text-red-700 h-6" >{error?.startsWith('Expected') ? 'This field is required' : error}</p>
  </div>;
}
