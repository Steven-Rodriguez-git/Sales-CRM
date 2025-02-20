import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "../Button";
import "@testing-library/jest-dom";

describe("Button Component", () => {
  const mockOnClick = jest.fn();

  test("renders button with correct text", () => {
    render(<Button text="Click Me" onClick={mockOnClick} />);
    const buttonElement = screen.getByText("Click Me");
    expect(buttonElement).toBeInTheDocument();
  });

  test("calls onClick when button is clicked", () => {
    render(<Button text="Click Me" onClick={mockOnClick} />);
    const buttonElement = screen.getByText("Click Me");
    fireEvent.click(buttonElement);
    expect(mockOnClick).toHaveBeenCalled();
  });


});
