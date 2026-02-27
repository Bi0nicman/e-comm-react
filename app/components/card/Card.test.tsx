import {fireEvent, render, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import { Card } from './Card'

test('card component', () => {
  render(
  <Card
    id={1}
    title="Card Title"
    description="Card Description"
    isFavorite={false}
    onToggleFavorite={() => {}}
  />)

  expect(screen.getByText("Card Title")).toBeInTheDocument();
  expect(screen.getByText("Card Description")).toBeInTheDocument();

  const btn = screen.getByRole('button', {name: "add to favourites"});
  expect(btn).toBeInTheDocument();

})

test('toggle favorite', async () => {
  const mockToggle = jest.fn();

  render(
    <Card
      id={42}
      title="Halo"
      description="Desc"
      isFavorite={false}
      onToggleFavorite={mockToggle}
    />
  );
   const btn = screen.getByRole('button', {name: "add to favourites"});
   await userEvent.click(btn);
  expect(mockToggle).toHaveBeenCalledWith(42);
});