import RecoilRootWrapper from '@/components/provider/RecoilWrapper';
import { SocketProvider } from '@/components/provider/SocketWrapper';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MSWComponent } from '@/components/provider/MSWComponent';

export default function App({ Component, pageProps }: AppProps) {
  const MSWState = process.env.NEXT_PUBLIC_MSW_STATE === 'true';
  return (
    <SocketProvider>
      <RecoilRootWrapper>
        {MSWState ? (
          <MSWComponent>
            <Component {...pageProps} />
          </MSWComponent>
        ) : (
          <Component {...pageProps} />
        )}
      </RecoilRootWrapper>
    </SocketProvider>
  );
}
