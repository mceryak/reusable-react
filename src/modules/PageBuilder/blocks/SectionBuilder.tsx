import  { LightDarkTheme, type Section, SectionSchema } from "../types"
import BlockForm from "../components/BlockForm";
import SizeSelect from "../components/inputs/SizeSelect";
import RequiredString from "../components/inputs/RequiredString";
import { getFieldName } from "../utils/convenientFunctions";
import ImageRef from "../components/inputs/ImageRef";
import Checkbox from "../components/inputs/Checkbox";
import GradientPicker from "../components/inputs/GradientPicker";
import Input from "../components/Input";
import FontSize from "../components/inputs/FontSize";
import Select from "../components/inputs/Select";


interface Props {
  name: string
  block: Section
}

export default function SectionBuilder({ name, block }: Props) {
  return <>
    <BlockForm block={block} schema={SectionSchema} name={name}>
      <RequiredString name={getFieldName(name, 'title')} />
      <SizeSelect name={getFieldName(name, 'contentWidth')} />
      <Select name={getFieldName(name, 'textColor')} options={LightDarkTheme.options} />
      {/* <FontSize name={getFieldName(name, 'titleFontSize')} /> */}
      <ImageRef name={getFieldName(name, 'bgImageRef')} label="Background Image" type="public" />
      <Checkbox name={getFieldName(name, 'americanFlags')} />
      <GradientPicker name={getFieldName(name, 'backgroundOverlay')} />
      <Checkbox name={getFieldName(name, 'topShadow')} />
    </BlockForm>
  </>
}


