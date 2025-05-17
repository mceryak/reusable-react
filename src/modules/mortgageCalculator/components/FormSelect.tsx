import { useEffect, useRef } from 'react'

export default function FormSelect({ name, label, cols=1, options=[], required=false, defaultCss, defaultValue, error }: {
  name: string
  label: string
  cols?: 1 | 2 | 3
  options?: string[]
  required?: boolean
  defaultCss: string
  defaultValue: string | number
  error: string
}) {
  const selectRef = useRef();
  
  useEffect(() => {
    selectRef.current.selectedIndex = options.findIndex(o => o === defaultValue) + 1;
  }); // important no dependencies; need to run each re-render
  
  return (
    <select ref={selectRef} name={name} id={name} className={`${defaultCss} w-full h-full py-2`} defaultValue={defaultValue}>
      <option value=""> </option>
      {options.map(o =>  (
        <option key={o} value={o}  className='capitalize'>{o}</option>
      ))}
    </select>
  )
}
