import type { AnyZodObject } from "zod"
import type { BlockType } from "../types";
import { useState } from "react";

interface Props {
  types: BlockType[]
  onSelect: (type: BlockType) => void
}

export default function BlockTypePicker({ onSelect, types }: Props) {
  // const availableTypes = zodSchema.shape.children?.element.options.map(o => o.shape.type._def.value) as string[];

  return (
    <ul className="flex gap-3 flex-wrap w-full justify-center py-3 border-y-2 border-slate-400/40 border-dotted">
      {types.map(type => (
        <li key={type}>
          <button 
            onClick={() => onSelect(type)}
            className="px-4 hover:scale-105 transition-transform py-2 border-2 rounded-lg cursor-pointer text-green-500"
            aria-label={`Add ${type}`}
            type="button"
          >+ {type}</button>
        </li>
      ))}
    </ul>
  )
}
