import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../page";
import leads from "@/data/leads.json";
import { ProspectsContext } from "@/context/ProspectsProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";

interface MockContextValue {
  filter: string;
  setFilter: jest.Mock;
  prospects: ProspectStatus;
  addNewProspect: jest.Mock;
}

type ProspectStatus = {
  [key: number]: boolean;
};

const mockProspects = {
  123456789: true,
  987654321: true,
  addNewProspect: jest.fn(),
};

const mockContextValue: MockContextValue = {
  filter: "",
  setFilter: jest.fn(),
  prospects: mockProspects,
  addNewProspect: jest.fn(),
};

const queryClient = new QueryClient();

const renderWithProviders = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      <ProspectsContext.Provider value={mockContextValue}>
        {ui}
      </ProspectsContext.Provider>
    </QueryClientProvider>
  );
};

describe("Home Component", () => {
  test("renders titles correctly", () => {
    renderWithProviders(<Home />);
    expect(screen.getByText("Prospects")).toBeInTheDocument();
    expect(screen.getByText("Leads")).toBeInTheDocument();
  });

  test("renders only the first 10 leads", () => {
    renderWithProviders(<Home />);
    const leadNames = leads.leads.slice(0, 10).map(lead => lead.name);
    leadNames.forEach(name => {
      expect(screen.getByText(name)).toBeInTheDocument();
    });
    expect(screen.queryByText(leads.leads[10].name)).not.toBeInTheDocument();
  });

  test("renders SearchBar component", () => {
    renderWithProviders(<Home />);
    expect(
      screen.getByPlaceholderText("Find by name or document")
    ).toBeInTheDocument();
    expect(screen.getByText("Filter:")).toBeInTheDocument();
  });

  test("renders Header component", () => {
    renderWithProviders(<Home />);
      expect(screen.getByText("SALES")).toBeInTheDocument();
  });
});