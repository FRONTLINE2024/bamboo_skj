import RecoilRootWrapper from '@/components/provider/RecoilWrapper';
import { SocketProvider } from '@/components/provider/SocketWrapper';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { MSWComponent } from '@/components/provider/MSWComponent';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MSWComponent>
      <SocketProvider>
        <RecoilRootWrapper>
          <Component {...pageProps} />
        </RecoilRootWrapper>
      </SocketProvider>
    </MSWComponent>
  );
}
