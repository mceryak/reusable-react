import { useForm, type SubmitHandler, FormProvider, useFieldArray } from "react-hook-form"
import { BodySchema, HeadingSchema, PageSchema, type Page } from "./types";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool} from "@hookform/devtools";
import BlockBuilder from "./BlockBuilder";
import ChildBlocks from "./ChildBlocks";
import Button from "./components/Button";
import BlockTypePicker from "./components/BlockTypePicker";

type Props = {
  page: Page
}

export default function PageBuilder({ page }: Props) {
  const methods = useForm<Page>({ 
    resolver: zodResolver(PageSchema),
    defaultValues: page
  });
  const { handleSubmit, control, formState: { errors } } = methods;

  // console.log('dirty', dirtyFields);
  console.log('errors', errors);
  // console.log(watch());
  // const { fields, append, prepend, remove, swap, move, insert } = useFieldArray({ 
  //     name: `children`,
  //     control
  // });

  const onSubmit: SubmitHandler<Page> = (data) => {
    console.log('submitted', data);
  }
  return <div className="text-zinc-200 relative">
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <ChildBlocks parentName="heading" maxBlocksLength={1} zodSchema={HeadingSchema} />
        <ChildBlocks parentName="body" zodSchema={BodySchema} />
        <div className="flex gap-5 items-center justify-center mt-5">
          <Button color="blue" twWidth="w-50" >Preview</Button>
          <Button color="cyan" twWidth="w-50" >Save</Button>
        </div>
      </form>
    </FormProvider>
    <DevTool control={control}/>
  </div>
}


