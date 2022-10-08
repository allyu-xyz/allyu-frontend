import type { AppProps } from "next/app";
import AppConfig from "../components/AppConfig";
import Layout from "../components/Layout";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <AppConfig>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AppConfig>
    </>
  );
}
