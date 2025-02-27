import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react"; 
import ProspectCard from "../ValidateCard";
import { VALIDATION_STATUS } from "@/types/validationStatus";
import { ProspectsContext } from "@/context/ProspectsProvider";
import "@testing-library/jest-dom";

const mockProspect = {
  name: "Marcos Lopez Restro",
  email: "marcosCamilo@email.com",
  document: 123456789,
  phone: "+57 32018742671",
};

const mockContextValue = {
  filter: "",
  setFilter: jest.fn(),
  prospects: {},
  addNewProspect: jest.fn(),
};

jest.mock("@/hooks/useValidation.ts", () => ({
  useProspectValidation: jest.fn(() => ({
    backgroundValidation: VALIDATION_STATUS.PENDING,
    identityValidation: VALIDATION_STATUS.PENDING,
    scoreValidation: VALIDATION_STATUS.PENDING,
  })),
}));

describe("ProspectCard Component", () => {
  test("renders Card with correct information", () => {
    render(
      <ProspectsContext.Provider value={mockContextValue}>
        <ProspectCard {...mockProspect} />
      </ProspectsContext.Provider>
    );

    expect(screen.getByText("Marcos Lopez Restro")).toBeInTheDocument();
    expect(screen.getByText("marcosCamilo@email.com")).toBeInTheDocument();
    expect(screen.getByText("123456789")).toBeInTheDocument();
    expect(screen.getByText("+57 32018742671")).toBeInTheDocument();
  });

});
