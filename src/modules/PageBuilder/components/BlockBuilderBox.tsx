import { useState } from "react";
import BlockBuilder from "../BlockBuilder";
import type { BaseBlock } from "../types";
import BlockHeader from "./BlockHeader";

interface Props {
  block: BaseBlock
  idx: number;
  name: string;
  onSwap: (idx0: number, idx1: number) => void;
  onRemove: (idx: number) => void;
}

const SECTION_COLORS: { border: string, text: string }[] = [
  { border: 'border-amber-300', text: 'text-amber-300' },
  { border: 'border-amber-500', text: 'text-amber-500' },
];

export default function BlockBuilderBox({ block, idx, name, onSwap, onRemove }: Props) {
  const [isExpanded, setIsExpanded] = useState(true);

  const fieldDepth = ((name?.split('.').length ?? 1) - 1) / 2;
  const twColor = SECTION_COLORS[fieldDepth%(SECTION_COLORS.length)];

  return <div>
    <div className={ `${twColor.text} text-center w-full mt-5` }> 
      <span className="">{block.type}</span>
    </div>
    <div className = {`border-2 ${twColor.border} rounded-xl p-3 mb-5`}>
      <BlockHeader
        name = {name}
        isExpanded = { isExpanded }
        onExpand = {() => setIsExpanded(pv => !pv)}
        onSwap = {(increment) => onSwap(idx, idx + increment)}
        onRemove = {() => onRemove(idx)}
      />
      <div className = {`${isExpanded ? '' : 'hidden'}`}>
        <BlockBuilder block={block} name = {name} />
      </div>
    </div>
  </div>;
}