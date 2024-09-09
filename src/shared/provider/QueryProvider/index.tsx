import { QueryCache, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode } from 'react';

export const ReactQueryClientProvider = ({ children }: { children: ReactNode }) => {
    const queryCache = new QueryCache({
        onError: (error, query) => {
            // console.error(`Query failed: ${query.queryKey}`, error);
        },
        onSuccess: (data, query) => {
            // console.log(`Query succeeded: ${query.queryKey}`, data);
        },
    });

    const queryClient = new QueryClient({
        defaultOptions: {
            queries: {
                retry: false,
                refetchOnWindowFocus: false,
                // staleTime: Infinity,
            },
        },
        queryCache,
    });

    return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
