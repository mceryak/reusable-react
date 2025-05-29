import { FaArrowUp, FaArrowDown, FaTrashAlt, FaChevronDown, FaChevronRight, FaCopy } from "react-icons/fa";
import type { BlockType } from "../types";
import { useWatch, useFormContext } from "react-hook-form";


interface Props {
  // idx: number;
  isExpanded: boolean;
  name: string;
  // type: BlockType;
  // length: number;
  onSwap: (increment: 1 | -1) => void;
  onRemove: () => void;
  onExpand: () => void;
}

export default function BlockHeader({ name, isExpanded, onSwap, onRemove, onExpand }: Props) {
  const { control } = useFormContext();
  // const id0 = useWatch({ control, name: `${name}.htmlId` })
  const id = useWatch({ control, name: `${name}.htmlIdCustom` })
  // const { watch } = useFormContext();
  // const id = watch([`${name}.htmlId`]).at(0);
  return (
    <div className="flex justify-between mb-5 ">
      <button type="button" onClick={() => onExpand()}>
        <div className="flex items-center gap-2 cursor-pointer">
          <span className={`${isExpanded ? '' : 'hidden'}`}><FaChevronDown /></span>        
          <span className={`${isExpanded ? 'hidden' : ''}`}><FaChevronRight /></span>        
          <h2 className="font-semibold text-xl">{id ?? ''}</h2>
        </div>
      </button>
      {/* <div className="absolute top-0 left-0 text-amber-200 text-center w-full">({type})</div> */}
      <div className="flex gap-5">
        
        {/* <button 
          className="text-cyan-300 text-xl cursor-pointer hover:scale-110 transition-transform"
          type="button"
          onClick={() => onSwap(-1)}
        ><FaCopy /></button> */}
        <button 
          className="text-cyan-500 text-xl cursor-pointer hover:scale-110 transition-transform"
          type="button"
          onClick={() => onSwap(-1)}
        ><FaArrowUp /></button>
        <button 
          className="text-cyan-500 text-xl cursor-pointer hover:scale-110 transition-transform"
          type="button"
          onClick={() => onSwap(1)}
        ><FaArrowDown /></button>
        <button 
          className="text-red-500 text-xl cursor-pointer hover:scale-110 transition-transform"
          type="button"
          onClick={() => window.confirm(`Remove ${id0}${id1}`) && onRemove()}
        ><FaTrashAlt /></button>
      </div>
    </div>
  )
}
