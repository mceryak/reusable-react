import BlockForm from "../components/BlockForm";
import RequiredString from "../components/inputs/RequiredString";
import Select from "../components/inputs/Select";
import { TeamImageEnum, TeamMemberSchema, type TeamMember } from "../types";
import { getFieldName } from "../utils/convenientFunctions";

interface Props {
  name: string;
  block: TeamMember;
}

export default function TeamMemberBuilder({ name, block }: Props) {
  return (
    <BlockForm name={name} block={block} schema={TeamMemberSchema}>
      <RequiredString name={getFieldName(name, 'name')} />
      <RequiredString name={getFieldName(name, 'position')} />
      <Select name={getFieldName(name, 'image')} options={TeamImageEnum.options} />
    </BlockForm>
  )
}