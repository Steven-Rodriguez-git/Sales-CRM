import React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../page";
import leads from "../../_data/leads.json";
import { ProspectsContext } from "../providers/ProspectsProvider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "@testing-library/jest-dom";

interface MockContextValue {
  prospects: ProspectStatus;
  addNewProspect: jest.Mock;
}

type ProspectStatus = {
  [key: number]: boolean;
};

const mockProspects = {
  123456789: true,
  987654321: true,
};

const mockContextValue: MockContextValue = {
  prospects: mockProspects,
  addNewProspect: jest.fn(),
};

const queryClient = new QueryClient();

describe("Home Component", () => {
  test("renders titles correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProspectsContext.Provider value={mockContextValue}>
          <Home />
        </ProspectsContext.Provider>
      </QueryClientProvider>
    );

    expect(screen.getByText("Prospects")).toBeInTheDocument();
    expect(screen.getByText("Leads")).toBeInTheDocument();
  });

  test("renders ProspectCard components for prospects", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProspectsContext.Provider value={mockContextValue}>
          <Home />
        </ProspectsContext.Provider>
      </QueryClientProvider>
    );

    leads.leads
      .filter((lead) => mockProspects[lead.document as keyof typeof mockProspects])
      .forEach((lead) => {
        expect(screen.getByText(lead.name)).toBeInTheDocument();
      });
  });

  test("renders ProspectCard components for leads", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <ProspectsContext.Provider value={mockContextValue}>
          <Home />
        </ProspectsContext.Provider>
      </QueryClientProvider>
    );

    leads.leads
      .filter(
        (lead) => !mockProspects[lead.document as keyof typeof mockProspects]
      )
      .forEach((lead) => {
        expect(screen.getByText(lead.name)).toBeInTheDocument();
      });
  });
});
