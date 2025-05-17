import type { Meta, StoryObj } from '@storybook/react';
import Accordion from "./Accordion";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Accordion> = {
  component: Accordion,
  title: 'Modules/Accordion'
};


export default meta;
type Story = StoryObj<typeof Accordion>;


export const Slate: Story = {
  args: {
    label: 'Title',
    bgColor: 'slate',
    children: 'Accordion Content'
  },
};

export const Green: Story = {
  args: {
    label: 'Accordion Title',
    bgColor: 'green',
    children: 'Lorem ipsum dolor sit amet consectetur adipiscing elit. Consectetur adipiscing elit quisque faucibus ex sapien vitae. Ex sapien vitae pellentesque sem placerat in id. Placerat in id cursus mi pretium tellus duis. Pretium tellus duis convallis tempus leo eu aenean.'
  },
};
