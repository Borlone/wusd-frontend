import Head from 'next/head';
import type { AppProps } from 'next/app';
import { type ReactNode } from 'react';
import { ThirdwebProvider } from 'thirdweb/react';
import { client } from '@/configs/thirdweb/client';
import { ThemeProvider } from 'next-themes';
import { ThirdwebProvider as ThirdwebProviderV4 } from '@thirdweb-dev/react';
import { ThemeProvider as UIThemeProvider, StyledEngineProvider } from '@mui/material';
import ErrorBoundary from '@/shared/components/error-boundary';
import { NotifyProvider } from '@/shared/provider/NotifyProvider';
import { ReactQueryClientProvider } from '@/shared/provider/QueryProvider';
import { muiTheme } from '@/configs/muiTheme';
import '@/styles/globals.scss';
import favicon from './favicon.png';

type AppPropsWithLayout = AppProps & {
    Component: ReactNode;
};

export default function MyApp({ Component, pageProps }: AppPropsWithLayout) {
    return (
        <ErrorBoundary>
            <Head>
                <title>StableFlow</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <link rel="icon" type="image/svg" sizes="16x16" href={favicon.src} />
            </Head>
            <ReactQueryClientProvider>
                <ThirdwebProviderV4 clientId={client.clientId}>
                    <ThirdwebProvider>
                        <UIThemeProvider theme={muiTheme}>
                            <ThemeProvider disableTransitionOnChange enableColorScheme={false} attribute="class">
                                <StyledEngineProvider injectFirst>
                                    <NotifyProvider>
                                        <Component {...pageProps} />
                                    </NotifyProvider>
                                </StyledEngineProvider>
                            </ThemeProvider>
                        </UIThemeProvider>
                    </ThirdwebProvider>
                </ThirdwebProviderV4>
            </ReactQueryClientProvider>
        </ErrorBoundary>
    );
}
