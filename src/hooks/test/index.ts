import { fireEvent, screen } from '@testing-library/react';

export const changeMessage = (message: string) => {
  return screen.findByText(message);
};

export function repeatInput(inputs: { element: HTMLElement; value: string }[]) {
  inputs.forEach(({ element, value }) => {
    fireEvent.change(element, { target: { value } });
  });
}
