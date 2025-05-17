import type { Meta, StoryObj } from '@storybook/react';
import Gallery from "./Gallery";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof Gallery> = {
  component: Gallery,
  title: 'Modules/Lightbox'
};


export default meta;
type Story = StoryObj<typeof Gallery>;


export const Photos: Story = {
  args: {
    photoUrls: [
      'https://picsum.photos/400/200',
      'https://picsum.photos/401/200',
      'https://picsum.photos/402/200',
      'https://picsum.photos/403/200',
      'https://picsum.photos/404/200',
    ]
  },
};