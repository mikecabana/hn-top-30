import type { AppProps, NextWebVitalsMetric /*, AppContext */ } from 'next/app';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import ReactTooltip from 'react-tooltip';

import '../styles/globals.scss';

export function reportWebVitals(metric: NextWebVitalsMetric) {
    if (process.env.NODE_ENV !== 'production') {
        console.log(metric);
    }
}

function MyApp({ Component, pageProps }: AppProps) {
    const [queryClient] = useState(() => new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
            <Component {...pageProps} />
            <ReactTooltip />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
}

export default MyApp;
