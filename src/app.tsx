import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const rootContainer = (container: any) => {
  return (
    <QueryClientProvider client={queryClient}>{container}</QueryClientProvider>
  );
};
