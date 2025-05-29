import { z, type AnyZodObject, type ZodDiscriminatedUnionOption } from "zod";
import { GRID_COLS_OPTIONS } from "./styles/twGridSafelist";
import { TW_GRADIENT_FROM_SAFELIST, TW_GRADIENT_TO_SAFELIST } from "./styles/twGradientSafelist";
import { TW_TEXT_SAFELIST } from "./styles/twTextSafelist";
import { TW_BLACK_SAFELIST } from "./styles/twBlackSafelist";
import type FormInput from "../mortgageCalculator/components/FormInput";
// import { parseDir } from "./utils/readFiles";


// ! first value in enums is default value
const BlockTypeSchema = z.enum([
  'accordion', 
  'bullet-point',
  'body', 
  'callToAction',
  'contactForm',
  'formInput',
  'googleMaps', 
  'grid', 
  'header', 
  'heading', 
  'hero', 
  'image',
  'link', 
  'mortgageCalculator',
  'notepad',
  'ourProcess',
  'ourProcessItem',
  'page',
  'section', 
  'tileLink',
  'testimonialSnippets',
  'testimonial',
  'teamMember',
  'text',
]);
export type BlockType = z.infer<typeof BlockTypeSchema>;

export const LightDarkTheme = z.enum([
  'light',
  'dark',
]);
export const SizeSchema = z.enum([
  'large',
  'medium',
  'small',
]);
export const ImageRefType = z.enum([
  'r2',
  'public'
]);
export const PublicImageEnum = z.enum([
  '',
  'plaster.jpg',
  'plaster1.webp',
  'homeExterior.webp'
]);
export const TeamImageEnum = z.enum([
  '',
  'team/bob.webp',
  'team/chris.webp',
]);
export const OurProccessItemImage = z.enum([
  'ourProcess/land.webp',
  'ourProcess/finance.webp',
]);
export const AccordionTheme = z.enum([
  'slate',
  'green',
  'stone'
]);
export const ColorTheme = z.enum([
  'slate',
  'green',
  'red',
]);
export const mdiIcon = z.enum([
  'close',
  'check',
]);
export const FormInputType = z.enum([
  'text',
  'tel',
  'email',
  'select',
  'textarea',
]);
export const Stars = z.enum(['1', '2', '3', '4', '5']);

export const BaseBlockSchema = z.object({
  type: BlockTypeSchema,
  // counter: z.number(),
  htmlId: z.string(),
  htmlIdCustom: z.string().optional()
});
export type BaseBlock = z.infer<typeof BaseBlockSchema>;

function Container(allowedBlocks: readonly [ZodDiscriminatedUnionOption<'type'>, ...ZodDiscriminatedUnionOption<'type'>[]]) {
  return BaseBlockSchema.extend({
    children: z.array(z.discriminatedUnion('type', allowedBlocks))
  });
}

const deviceSpecificValues = (values: (string | number)[]) => {
  const literals = values.map(v => z.literal(`${v}`));
  return z.object({
    sm: z.union(literals),
    md: z.union(literals),
    lg: z.union(literals),
  });
}
export type DeviceSpecificValues = {
  sm: (number | string)[];
  md: (number | string)[];
  lg: (number | string)[];
}

const safelist = (values: (string | number)[]) => z.union(values.map(v => z.literal(`${v}`)));

const GradientSchema = z.object({ 
  from: safelist(TW_GRADIENT_FROM_SAFELIST), 
  to: safelist(TW_GRADIENT_TO_SAFELIST) 
});

// const publicImages = parseDir('/public/images');
// console.log(publicImages);
const ImageRefBase = z.object({
  type: z.union([z.literal('r2'), z.literal('public')]),
  ref: z.string()
});
export const PublicImageRef = ImageRefBase.extend({
  type: z.literal('public'), 
  ref: PublicImageEnum.optional()
});
export const R2ImageRef = ImageRefBase.extend({ 
  type: z.literal('r2')
});
// const ImageRef = z.union([PublicImageRef, R2ImageRef]);

export const MortgageCalculatorSchema = BaseBlockSchema.extend({
  type: z.literal(BlockTypeSchema.Enum.mortgageCalculator),
});
export type MortgageCalculator = z.infer<typeof MortgageCalculatorSchema>;

export const LinkSchema = BaseBlockSchema.extend({
  type: z.literal('link'),
  isExternal: z.boolean(),
  href: z.string(),
  label: z.string()
});
export type Link = z.infer<typeof LinkSchema>;

export const TextBlockSchema = BaseBlockSchema.extend({
  type: z.literal("text"),
  fontSize: z.union([z.literal('normal'), z.literal('large')]).default('normal'),
  align: z.union([z.literal('left'), z.literal('center')]).default('center'),
  text: z.string(),
});
export type TextBlock = z.infer<typeof TextBlockSchema>;


export const FormInputSchema = BaseBlockSchema.extend({
  type: z.literal(BlockTypeSchema.Enum.formInput),
  label: z.string(),
  name: z.string(),
  required: z.boolean(),
  inputType: FormInputType,
  options: z.string().optional()
});
export type FormInput = z.infer<typeof FormInputSchema>;

export const ContactFormSchema = Container([
  FormInputSchema
]).extend({
  type: z.literal(BlockTypeSchema.Enum.contactForm),
});
export type ContactForm = z.infer<typeof ContactFormSchema>;

export const ImageBlockSchema = z.object({
  type: z.literal(BlockTypeSchema.Enum.image),
  url: z.string().url(),
});

export const HeroSchema = Container([
  TextBlockSchema
]).extend({
  type: z.literal('hero'),
  image: PublicImageRef,
  title: z.string(),
  overlay: safelist(TW_BLACK_SAFELIST),
  fullHeight: z.boolean(),
});
export type Hero = z.infer<typeof HeroSchema>;



export const BulletPointSchema = BaseBlockSchema.extend({
  type: z.literal(BlockTypeSchema.Enum["bullet-point"]),
  icon: mdiIcon,
  text: z.string(),
  theme: ColorTheme,
});
export type BulletPoint = z.infer<typeof BulletPointSchema>;

export const NotepadSchema = Container([
  BulletPointSchema
]).extend({
  type: z.literal('notepad'),
  title: z.string(),
  theme: ColorTheme
});
export type Notepad = z.infer<typeof NotepadSchema>;

export const TestimonialSchema = BaseBlockSchema.extend({
  type: z.literal(BlockTypeSchema.Enum.testimonial),
  author: z.string(),
  url: z.string(),
  stars: Stars,
  quote: z.string()
});
export type Testimonial = z.infer<typeof TestimonialSchema>;

export const TeamMemberSchema = BaseBlockSchema.extend({
  type: z.literal(BlockTypeSchema.Enum.teamMember),
  name: z.string(),
  position: z.string(),
  image: TeamImageEnum
});
export type TeamMember = z.infer<typeof TeamMemberSchema>;

export const CallToActionSchema = BaseBlockSchema.extend({
  type: z.literal(BlockTypeSchema.Enum.callToAction),
  label: z.string(),
  theme: ColorTheme,
  relativeUrl: z.string()
});
export type CallToAction = z.infer<typeof CallToActionSchema>;

export const GoogleMapsSchema = BaseBlockSchema.extend({
  type: z.literal(BlockTypeSchema.Enum.googleMaps),
  embedUrl: z.string()
});
export type GoogleMaps = z.infer<typeof GoogleMapsSchema>;

export const TileLinkSchema = BaseBlockSchema.extend({
  type: z.literal(BlockTypeSchema.Enum.tileLink),
  title: z.string(),
  subtitle: z.string(),
  relativeUrl: z.string()
});
export type TileLink = z.infer<typeof TileLinkSchema>;

export const AccordionSchema = Container([
  TextBlockSchema,
  LinkSchema
]).extend({
  type: z.literal('accordion'),
  title: z.string(),
  theme: AccordionTheme,
});
export type Accordion = z.infer<typeof AccordionSchema>;

export const OurProcessItemSchema = BaseBlockSchema.extend({
  type: z.literal(BlockTypeSchema.Enum.ourProcessItem),
  title: z.string(),
  description: z.string(),
  image: OurProccessItemImage,
});
export type OurProcessItem = z.infer<typeof OurProcessItemSchema>;

export const OurProcessSchema = Container([
  OurProcessItemSchema
]).extend({
  type: z.literal(BlockTypeSchema.Enum.ourProcess)
});
export type OurProcess = z.infer<typeof OurProcessSchema>;

export const TestimonialSnippetsSchema = Container([
  TestimonialSchema
]).extend({
  type: z.literal(BlockTypeSchema.Enum.testimonialSnippets)
})

export const GridSchema = Container([
  // allowed sub-blocks
  CallToActionSchema,
  TileLinkSchema,
  GoogleMapsSchema,
  LinkSchema,
  NotepadSchema,
  TeamMemberSchema,
  TestimonialSchema,
  TextBlockSchema,
]).extend({
  type: z.literal(BlockTypeSchema.Enum.grid),
  columns: deviceSpecificValues(GRID_COLS_OPTIONS)
});
export type Grid = z.infer<typeof GridSchema>;

export const HeaderSchema = Container([
  TextBlockSchema,
  GridSchema
]).extend({
  type: z.literal('header'),
  title: z.string()
})
export type Header = z.infer<typeof HeaderSchema>;

export const SectionSchema = Container([
  // allowed sub-blocks
  ContactFormSchema,
  GridSchema,
  TestimonialSnippetsSchema,
  OurProcessSchema,
  MortgageCalculatorSchema,
  AccordionSchema,
  TextBlockSchema,
  ImageBlockSchema
]).extend({
  type: z.literal(BlockTypeSchema.Enum.section),
  title: z.string(),
  // titleFontSize: safelist(TW_TEXT_SAFELIST),
  bgImageRef: PublicImageRef,
  backgroundOverlay: GradientSchema,
  topShadow: z.boolean(),
  americanFlags: z.boolean(),
  contentWidth: SizeSchema,
  textColor: LightDarkTheme
});
export type Section = z.infer<typeof SectionSchema>;



export const HeadingSchema = Container([
  HeroSchema,
  HeaderSchema
]).extend({
  type: z.literal(BlockTypeSchema.Enum.heading)
})

export const BodySchema = Container([
  SectionSchema
]).extend({
  type: z.literal(BlockTypeSchema.Enum.body)
});


export const PageSchema = z.object({
  header: HeadingSchema,
  body: BodySchema
});



export type Page = z.infer<typeof PageSchema>;
export const getChildrenTypes = (schema: AnyZodObject): BlockType[] => (schema.shape?.children?.element.options.map(o => o.shape.type._def.value) ?? []) as BlockType[];
export const hasChildren = (schema: AnyZodObject): boolean => 'children' in schema.shape;