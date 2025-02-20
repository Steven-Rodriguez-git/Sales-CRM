import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Card, { CardProps } from "../Card";
import { VALIDATION_STATUS } from "@/types/validationStatus";
import "@testing-library/jest-dom";

const mockProps: CardProps = {
  name: "Marcos Lopez Restrepo",
  email: "marcosCamilo@email.com",
  document: 123456789,
  phone: "+57 32018742671",
  backgroundValidation: VALIDATION_STATUS.PENDING,
  identityValidation: VALIDATION_STATUS.SUCCESS,
  scoreValidation: VALIDATION_STATUS.FAILED,
  isAlreadyValidated: false,
  onButtonClick: jest.fn(),
};

describe("Card Component", () => {
  test("renders card with correct information", () => {
    render(<Card {...mockProps} />);
    expect(screen.getByText("Marcos Lopez Restrepo")).toBeInTheDocument();
    expect(screen.getByText("marcosCamilo@email.com")).toBeInTheDocument();
    expect(screen.getByText("123456789")).toBeInTheDocument();
    expect(screen.getByText("+57 32018742671")).toBeInTheDocument();
  });

  test("renders validate button when not already validated", () => {
    render(<Card {...mockProps} />);
    expect(screen.getByText("Validate Lead")).toBeInTheDocument();
  });

  test("calls onButtonClick when validate button is clicked", () => {
    render(<Card {...mockProps} />);
    const button = screen.getByText("Validate Lead");
    fireEvent.click(button);
    expect(mockProps.onButtonClick).toHaveBeenCalled();
  });

  test("does not render validate button when already validated", () => {
    const validatedProps = { ...mockProps, isAlreadyValidated: true };
    render(<Card {...validatedProps} />);
    expect(screen.queryByText("Validate Lead")).not.toBeInTheDocument();
  });

});
