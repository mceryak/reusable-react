import type { Meta, StoryObj } from '@storybook/react';
import MortgageCalculator from "./components/MortgageCalculator";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof MortgageCalculator> = {
  component: MortgageCalculator,
  title: 'Modules/MortgageCalculator'
};


export default meta;
type Story = StoryObj<typeof MortgageCalculator>;




export const FirstStory: Story = {
  args: {

  },
};
