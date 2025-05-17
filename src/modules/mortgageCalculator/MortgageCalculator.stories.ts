import type { Meta, StoryObj } from '@storybook/react';
import MortgageCalculator from "./components/MortgageCalculator";

//👇 This default export determines where your story goes in the story list
const meta: Meta<typeof MortgageCalculator> = {
  component: MortgageCalculator,
  title: 'Modules/MortgageCalculator'
};


export default meta;
type Story = StoryObj<typeof MortgageCalculator>;




export const Extra0: Story = {
  args: {
    homePrice: 200_000,
    downPayment: 30_000,
    interestPct: 8.75,
    termInYears: 30,
    extraPerMonth: 0
  }
};
export const Extra10: Story = {
  args: {
    homePrice: 200_000,
    downPayment: 30_000,
    interestPct: 8.75,
    termInYears: 30,
    extraPerMonth: 10
  }
};
export const Extra100: Story = {
  args: {
    homePrice: 200_000,
    downPayment: 30_000,
    interestPct: 8.75,
    termInYears: 30,
    extraPerMonth: 100
  }
};
