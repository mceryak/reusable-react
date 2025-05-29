import BlockForm from "../components/BlockForm";
import { MortgageCalculatorSchema, type MortgageCalculator } from "../types";
import { getFieldName } from "../utils/convenientFunctions";

interface Props {
  name: string;
  block: MortgageCalculator;
}

export default function MortgageCalculatorBuilder({ name, block }: Props) {
  return (
    <BlockForm name={name} block={block} schema={MortgageCalculatorSchema}>
      
    </BlockForm>
  )
}