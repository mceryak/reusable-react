import { useState, type ReactNode } from 'react'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'

type Props = {
  label: string
  isExpandedByDefault?: boolean
  noSectionBg?: boolean
  bgColor: 'green' | 'slate' | 'stone'
  children: ReactNode
}

export default function Accordion({ label, bgColor, isExpandedByDefault=false, noSectionBg=false, children }: Props) {
  const [isExpanded, setIsExpanded] = useState(isExpandedByDefault);

  const bgCss = bgColor === 'green' ?
    'bg-green-700' : bgColor === 'slate' ?
    'bg-slate-700' : bgColor === 'stone' ? 
    'bg-stone-700' : '';

  const sectionBgCss = noSectionBg || !isExpanded ? '' : bgColor === 'green' ?
  'bg-green-700/10' : bgColor === 'slate' ?
  'bg-slate-700/10' : bgColor === 'stone' ? 
  'bg-stone-700/10' : '';

  return <section id={label} className={`rounded-md ${sectionBgCss}`}>
    <button className="w-full" onClick={() => setIsExpanded(pv => !pv)}>
      <div className={`flex gap-3 cursor-pointer items-center px-4 py-2 rounded-sm ${bgCss} mb-4 text-white text-xl`}>
        {isExpanded ? <FaChevronDown /> : <FaChevronRight />}
        <h2>{label}</h2>  
      </div>
    </button>
    
    {isExpanded && <div className='p-2 mb-6'>
      {children}
    </div>}
  </section>;
}
