import { FaChevronDown, FaChevronRight } from "react-icons/fa";

interface Props {
  onClick: () => void;
  isExpanded: boolean;
  label: string;
}

export default function ExpandButton({ label, isExpanded, onClick }: Props) {
  return <button type="button" onClick={() => onClick()}>
    <div className="flex items-center gap-2 cursor-pointer text-slate-400 text-sm">
      <span className={`text-xs ${isExpanded ? '' : 'hidden'}`}><FaChevronDown /></span>        
      <span className={`text-xs ${isExpanded ? 'hidden' : ''}`}><FaChevronRight /></span>        
      <h3 className="">{label}</h3>
    </div>
  </button>
}