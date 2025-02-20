import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import List from '../List';

const mockData = [
  { name: 'Juan David Pérez Malavera', document: 12345678, email: 'juanperez@email.com', phone: '+57 123456789' },
  { name: 'María Camila López Melo', document: 123456789, email: 'marialopez@email.com', phone: '+57 987654321' },
  { name: 'Carlos Antonio Gómez Pérez', document: 1234567, email: 'carlosgomez@email.com', phone: '+57 555666777' },

];

const queryClient = new QueryClient();

const renderWithQueryClient = (ui: React.ReactElement) => {
  return render(
    <QueryClientProvider client={queryClient}>
      {ui}
    </QueryClientProvider>
  );
};

describe('List Component', () => {
  test('renders the list title', () => {
    renderWithQueryClient(<List title="Prospects" data={mockData} filter="" isProspect={true} />);
    const titleElement = screen.getByText(/Prospects/i);
    expect(titleElement).toBeInTheDocument();
  });

  test('renders the correct number of items per page', () => {
    renderWithQueryClient(<List title="Prospects" data={mockData} filter="" isProspect={true} />);
    const items = screen.getAllByText(/@/i); 
    expect(items.length).toBeLessThanOrEqual(10);
  });

  test('renders the empty message when no items match the filter', () => {
    renderWithQueryClient(<List title="Prospects" data={mockData} filter="nonexistent" isProspect={true} />);
    const emptyMessage = screen.getByText(/There is not prospects on the list/i);
    expect(emptyMessage).toBeInTheDocument();
  });

  test('renders pagination buttons when there are more than 10 items', () => {
    const largeData = Array.from({ length: 20 }, (_, i) => ({
      name: `Name ${i}`,
      document: i,
      email: `email${i}@test.com`,
      phone: `+57 12345678${i}`,
    }));
    renderWithQueryClient(<List title="Prospects" data={largeData} filter="" isProspect={true} />);
    const nextButton = screen.getByText(/Next/i);
    expect(nextButton).toBeInTheDocument();
  });

  test('pagination buttons work correctly', () => {
    const largeData = Array.from({ length: 20 }, (_, i) => ({
      name: `Name ${i}`,
      document: i,
      email: `email${i}@test.com`,
      phone: `+57 12345678${i}`,
    }));
    renderWithQueryClient(<List title="Prospects" data={largeData} filter="" isProspect={true} />);
    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);
    const pageIndicator = screen.getByText(/Page 2 of 2/i);
    expect(pageIndicator).toBeInTheDocument();
  });
});