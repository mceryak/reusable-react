import { test, expect, describe } from "vitest";
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event';
import Accordion from "./Accordion";


describe('Accordion.tsx', () => {
  test('header equals label prop', async () => {
    const header = "Accordion Title";
    const content = "Some accordion content";
  
    render(<Accordion label={header} bgColor="slate">
      <p>{content}</p>
    </Accordion>);
  
    expect(screen.getByText(header)).toBeInTheDocument();
  });

  test('content NOT shown by default', async () => {
    const header = "Accordion Title";
    const content = "Some accordion content";
  
    render(<Accordion label={header} bgColor="slate">
      <p>{content}</p>
    </Accordion>);

    expect(screen.queryByText(content)).toBeNull();
  });

  test('content shown by default', async () => {
    const header = "Accordion Title";
    const content = "Some accordion content";
  
    render(<Accordion label={header} bgColor="slate" isExpandedByDefault>
      <p>{content}</p>
    </Accordion>);

    expect(screen.getByText(content)).toBeInTheDocument();
  });

  test('content hidden after click when shown by default', async () => {
    const user = userEvent.setup();

    const header = "Accordion Title";
    const content = "Some accordion content";
  
    render(<Accordion label={header} bgColor="slate" isExpandedByDefault>
      <p>{content}</p>
    </Accordion>);

    const button = screen.getByRole('button');
    await user.click(button);
    expect(screen.queryByText(content)).toBeNull();
  });

  test('content shown on click', async () => {
    const user = userEvent.setup();
    
    const header = "Accordion Title";
    const content = "Some accordion content";
  
    render(<Accordion label={header} bgColor="slate">
      <p>{content}</p>
    </Accordion>);

    const button = screen.getByRole('button');
    await user.click(button);
  
    expect(screen.getByText(content)).toBeInTheDocument();
  });

  test('content hidden again after 2 clicks', async () => {
    const user = userEvent.setup();
    const header = "Accordion Title";
    const content = "Some accordion content";
    
    render(<Accordion label={header} bgColor="slate">
      <p>{content}</p>
    </Accordion>);

    const button = screen.getByRole('button');
    await user.click(button);
    await user.click(button);
  
    expect(screen.queryByText(content)).toBeNull();
  });
})
