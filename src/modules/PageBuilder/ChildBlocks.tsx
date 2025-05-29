import { useFieldArray, useFormContext } from "react-hook-form";
import type { AnyZodObject } from "zod";
import { getChildrenTypes, type BaseBlock, type BlockType } from "./types";
import BlockTypePicker from "./components/BlockTypePicker";
import BlockBuilderBox from "./components/BlockBuilderBox";
import { nanoid } from "nanoid";


interface Props {
  parentName?: string | undefined
  maxBlocksLength?: number | undefined;
  zodSchema: AnyZodObject
}

export default function ChildBlocks({ parentName, maxBlocksLength, zodSchema }: Props) {
  const { control, setValue } = useFormContext<FormData>();
  const name = `${parentName ? parentName + '.' : ''}children`
  const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({ 
    name,
    control
  });
  const blocks = fields as BaseBlock[];
  const availableTypes = getChildrenTypes(zodSchema);
  
  
  const insertBlock = (idx: number, type: BlockType) => {
    insert(idx, { type, htmlId: `${nanoid()}-`, htmlIdCustom: type  });
  }

  const showBlockTypePicker = !maxBlocksLength || blocks.length < maxBlocksLength;

  return (
    <div className="flex flex-col gap-5 mt-5">
      {blocks.map((block, idx) => {
        
        return <div key={block.htmlId}>

          {/* ability to add block before this child block  */}
          {showBlockTypePicker && <BlockTypePicker 
            types={availableTypes} 
            onSelect={(type: BlockType) => insertBlock(idx, type)}
          />}

          <BlockBuilderBox 
            block={block}
            idx={idx}
            name={`${name}.${idx}`}
            onSwap = {(idx0: number, idx1: number) => swap(idx0, idx1)}
            onRemove = {(idx0: number) => remove(idx0)}
          />
        </div>
      })}
      {showBlockTypePicker && <BlockTypePicker types={availableTypes} onSelect={(type: BlockType) => insertBlock(blocks.length, type)} />}
    </div>
  )
}


