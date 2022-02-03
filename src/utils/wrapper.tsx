import { render } from '@testing-library/react';
import * as React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retryDelay: 1,
        retry: 0,
      },
    },
  });
export function renderWithClient(ui: React.ReactElement) {
  const testQueryClient = createTestQueryClient();
  const { rerender, ...result } = render(
    <QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>
  );
  return {
    ...result,
    rerender: (rerenderUi: React.ReactElement) =>
      rerender(
        <QueryClientProvider client={testQueryClient}>
          {rerenderUi}
        </QueryClientProvider>
      ),
  };
}

export function createWrapper() {
  const testQueryClient = createTestQueryClient();
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={testQueryClient}>
      {children}
    </QueryClientProvider>
  );
  return wrapper;
}
