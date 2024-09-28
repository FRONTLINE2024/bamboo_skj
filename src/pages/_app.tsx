import RecoilRootWrapper from '@/components/provider/RecoilWrapper';
import { SocketProvider } from '@/components/provider/SocketWrapper';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SocketProvider>
      <RecoilRootWrapper>
        <Component {...pageProps} />
      </RecoilRootWrapper>
    </SocketProvider>
  );
}
