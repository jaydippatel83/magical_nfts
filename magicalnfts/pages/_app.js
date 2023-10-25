import '../styles/globals.css';
import '../pages/index.css'
import { ThemeProvider } from "next-themes";
import Layout from "../components/layout";
import { Provider } from "react-redux";
import { store } from "../redux/store";
import { useRouter } from "next/router";
import { MetaMaskProvider } from "metamask-react";
import Meta from "../components/Meta";
import UserContext from "../components/UserContext";
import { SupercoolAuthContextProvider } from "../context/supercoolContext";
import { clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  GlowWalletAdapter,
  LedgerWalletAdapter,
  PhantomWalletAdapter,
  SlopeWalletAdapter,
  SolflareWalletAdapter,
  SolletExtensionWalletAdapter,
  SolletWalletAdapter,
  TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { useMemo } from "react";
import '@solana/wallet-adapter-react-ui/styles.css';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const pid = router.asPath;

  const solNetwork = WalletAdapterNetwork.Devnet;
  const endpoint = useMemo(() => clusterApiUrl(solNetwork), [solNetwork]);
  // initialise all the wallets you want to use
  const wallets = useMemo(
    () => [
      new PhantomWalletAdapter(),
      new SolflareWalletAdapter({ solNetwork }),
      new TorusWalletAdapter(),
      new LedgerWalletAdapter()
    ],
    [solNetwork]
  );


  return (
    <>

      <Meta title="Home" />

      <Provider store={store}>
        <ThemeProvider enableSystem={true} attribute="class">
          <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets}>
              <WalletModalProvider>
                <MetaMaskProvider>
                  <SupercoolAuthContextProvider>
                    <UserContext.Provider>
                      {pid === "/login" ? (
                        <Component {...pageProps} />
                      ) : (
                        <Layout>
                          <Component {...pageProps} />
                        </Layout>
                      )}
                    </UserContext.Provider>
                  </SupercoolAuthContextProvider>
                </MetaMaskProvider>
              </WalletModalProvider>
            </WalletProvider>
          </ConnectionProvider>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
