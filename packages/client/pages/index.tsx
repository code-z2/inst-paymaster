import Head from "next/head";
import { LandingPageLayout, UnSecureLandingPage } from "../components";

// Landing page without auth
export default function Home() {
  return (
    <>
      <Head>
        <title>paymaster</title>
        <meta
          name="description"
          content="Paymaster is a possile new approach 
        to handling paymasters for wallets implementing Account Abstraction."
        />
        <meta
          name="og:description"
          content="Paymaster enables users to choose any paymaster 
         they are eligible to use without handling complex interactions. "
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest"></link>
      </Head>
      <LandingPageLayout>
        <UnSecureLandingPage />
      </LandingPageLayout>
    </>
  );
}
