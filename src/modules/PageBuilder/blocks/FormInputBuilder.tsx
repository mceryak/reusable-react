import { useWatch } from "react-hook-form";
import BlockForm from "../components/BlockForm";
import Input from "../components/Input";
import Checkbox from "../components/inputs/Checkbox";
import RequiredString from "../components/inputs/RequiredString";
import Select from "../components/inputs/Select";
import { FormInputSchema, FormInputType, type FormInput } from "../types";
import { getFieldName } from "../utils/convenientFunctions";

interface Props {
  name: string;
  block: FormInput;
}

export default function FormInputBuilder({ name, block }: Props) {
  const inputType = useWatch({ name: getFieldName(name, 'inputType') });
  return (
    <BlockForm name={name} block={block} schema={FormInputSchema}>
      <RequiredString name={getFieldName(name, 'name')} />
      <RequiredString name={getFieldName(name, 'label')} />
      <Checkbox name={getFieldName(name, 'required')} />
      <Select name={getFieldName(name, 'inputType')} options={FormInputType.options} />
      <Input props={{
        name: getFieldName(name, 'options'),
        label: 'Options (comma-separated)',
        hidden: inputType !== 'select'
      }} />
    </BlockForm>
  )
}