import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Head from 'next/head';
import { WagmiConfig } from 'wagmi';
import { useEffect } from 'react';
import { client } from '../lib/wagmi';
import { SWRConfig } from 'swr';
import { ConnectKitProvider, ConnectKitButton } from 'connectkit';
import { Analytics } from '@vercel/analytics/react';

const refreshInterval = 1000 * 60; // 1 minute

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    client.autoConnect().then();
  }, []);

  return (
    <div>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin={''}
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <WagmiConfig client={client}>
        <ConnectKitProvider theme="nouns">
          <div className="flex justify-between w-full">
            <div className="ml-8 justify-start">
              <img
                src="noun652head.svg"
                alt="Noun652 Head"
                className="w-auto h-12"
              />
              <h1 className="neon mb-4 md:mb-0">VwR</h1>
            </div>
            <div className="m-4 flex justify-end">
              <ConnectKitButton />
            </div>
          </div>

          <SWRConfig
            value={{
              refreshInterval,
              fetcher: (resource, init) =>
                fetch(resource, init).then(res => res.json()),
            }}
          >
            <Component {...pageProps} />
          </SWRConfig>
        </ConnectKitProvider>
      </WagmiConfig>
      <Analytics />
    </div>
  );
}

export default MyApp;
