import { useState, type ReactNode } from "react";
import type { AnyZodObject } from "zod";
import ChildBlocks from "../ChildBlocks";
import { type BaseBlock, hasChildren } from "../types";
import Input from "./Input";
import ExpandButton from "./ExpandButton";

interface BlockFormProps {
  schema: AnyZodObject;
  name: string;
  block: BaseBlock;
  children: ReactNode;
}

export default function BlockForm({ schema, name, block, children }: BlockFormProps) {
  const [isFormExpanded, setIsFormExpanded] = useState(true);
  const [isSubBlocksExpanded, setIsSubBlocksExpanded] = useState(true);
  return <div>

    {/* hidden inputs  */}
    <Input 
        props={{ name: `${name}.type`, hidden: true, readOnly: true }} 
        options={{ required: 'This field is required.', value: block.type}} 
      />
    <Input 
      props={{ name: `${name}.htmlId`, hidden: true, readOnly: true }} 
      options={{ required: 'This field is required.', value: block.htmlId}} 
    />
    <Input 
      props={{ name: `${name}.id`, hidden: true, readOnly: true }} 
      options={{ required: 'This field is required.', value: block.id}} 
    />

    <ExpandButton onClick={() => setIsFormExpanded(pv => !pv)} label="Metadata" isExpanded={isFormExpanded} />
    <br />

    <div className={`${isFormExpanded ? '' : 'hidden'} p-2 grid grid-cols-1 md:grid-cols-2 items-center gap-5`}>
      
      {/* editable inputs */}
      <Input 
        props={{ name: `${name}.htmlIdCustom`, label: "HTML Id", prefix: `${block.htmlId}` }} 
        options={{ required: 'HTML Id is required.'}} 
      />
      
      {children}
    </div>

    {hasChildren(schema) && <div>
      <ExpandButton onClick={() => setIsSubBlocksExpanded(pv => !pv)} label="Inner Blocks" isExpanded={isSubBlocksExpanded} />
      <div className={`${isSubBlocksExpanded ? '' : 'hidden'}`}>
        <ChildBlocks parentName={name} zodSchema={schema} />
      </div>
    </div>}
  </div>
}