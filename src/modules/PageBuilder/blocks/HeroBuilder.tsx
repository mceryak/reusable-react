import BlockForm from "../components/BlockForm";
import Checkbox from "../components/inputs/Checkbox";
import ImageRef from "../components/inputs/ImageRef";
import RequiredString from "../components/inputs/RequiredString";
import Select from "../components/inputs/Select";
import { TW_BLACK_SAFELIST } from "../styles/twBlackSafelist";
import { HeroSchema, type Hero } from "../types";
import { getFieldName } from "../utils/convenientFunctions";

interface Props {
  name: string;
  block: Hero;
}

export default function HeroBuilder({ name, block }: Props) {
  return (
    <BlockForm name={name} block={block} schema={HeroSchema}>
      <RequiredString name={getFieldName(name, 'title')} />
      <ImageRef label="Image" name={name} type="public" required />
      <Select name={getFieldName(name, 'overlay')} options={TW_BLACK_SAFELIST} />
      <Checkbox name={getFieldName(name, 'fullHeight')} />
    </BlockForm>
  )
}