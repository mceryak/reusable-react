


// import { useFieldArray, useFormContext } from "react-hook-form";
import AccordionBuilder from "./blocks/AccordionBuilder";
import BulletPointBuilder from "./blocks/BulletPointBuilder";
import CallToActionBuilder from "./blocks/CallToActionBuilder";
import ContactFormBuilder from "./blocks/ContactFormBuilder";
import FormInputBuilder from "./blocks/FormInputBuilder";
import GoogleMapsBuilder from "./blocks/GoogleMapsBuilder";
import GridBuilder from "./blocks/GridBuilder";
import HeaderBuilder from "./blocks/HeaderBuilder";
import HeroBuilder from "./blocks/HeroBuilder";
import LinkBuilder from "./blocks/LinkBuilder";
import MortgageCalculatorBuilder from "./blocks/MortgageCalculatorBuilder";
import NotepadBuilder from "./blocks/NotepadBuilder";
import OurProcessBuilder from "./blocks/OurProcessBuilder";
import OurProcessItemBuilder from "./blocks/OurProcessItemBuilder";
import SectionBuilder from "./blocks/SectionBuilder";
import TestimonialBuilder from "./blocks/TestimonialBuilder";
import TextBlockBuilder from "./blocks/TextBlockBuilder";
import TileLinkBuilder from "./blocks/TileLinkBuilder";
import type { Accordion, BaseBlock, BulletPoint, CallToAction, ContactForm, FormInput, GoogleMaps, Grid, Header, Hero, Link, MortgageCalculator, Notepad, OurProcess, OurProcessItem, Section, Testimonial, TextBlock, TileLink } from "./types";

type Props = {
  name: string;
  block: BaseBlock;
}

export default function BlockBuilder({ name, block }: Props) {
  switch (block.type) {
    case 'accordion':
      return <AccordionBuilder name={name} block={block as Accordion} />
    case 'bullet-point':
      return <BulletPointBuilder name={name} block={block as BulletPoint} />
    case 'callToAction':
      return <CallToActionBuilder name={name} block={block as CallToAction} />
    case 'contactForm':
      return <ContactFormBuilder name={name} block={block as ContactForm} />
    case 'formInput':
      return <FormInputBuilder name={name} block={block as FormInput} />
    case 'googleMaps':
      return <GoogleMapsBuilder name={name} block={block as GoogleMaps} />
    case 'grid':
      return <GridBuilder name={name} block={block as Grid} />
    case 'header':
      return <HeaderBuilder name={name} block={block as Header} />
    case 'hero':
      return <HeroBuilder name={name} block={block as Hero} />
    case 'link':
      return <LinkBuilder name={name} block={block as Link} />
    case 'mortgageCalculator':
      return <MortgageCalculatorBuilder name={name} block={block as MortgageCalculator} />
    case 'notepad':
      return <NotepadBuilder name={name} block={block as Notepad} />
    case 'ourProcess':
      return <OurProcessBuilder name={name} block={block as OurProcess} />
    case 'ourProcessItem':
      return <OurProcessItemBuilder name={name} block={block as OurProcessItem} />
    case 'section':
      return <SectionBuilder name={name} block={block as Section} />
    case 'tileLink':
      return <TileLinkBuilder name={name} block={block as TileLink} />
    case 'testimonial':
      return <TestimonialBuilder name={name} block={block as Testimonial} />
    case 'text':
      return <TextBlockBuilder name={name} block={block as TextBlock} />
    default:
      return <p className="text-red-500 text-lg">BlockBuilder Error: block type not found: {block.type}</p>;
  }
}


