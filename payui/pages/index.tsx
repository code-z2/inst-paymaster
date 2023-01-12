import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import LandingPage from '../components/landingpage/landing' 

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      <Head>
        <title>Institutional paymaster is a possile new approach 
        to handling paymasters. </title>
        <meta name="description" content="Institutional paymaster is a possile new approach 
        to handling paymasters for wallets implementing Account Abstraction." />
         <meta name="og:title" content="Institutional paymaster" />
         <meta name="og:description" content="Institutional paymaster enables users to choose any paymaster 
         they are eligible to use without handling complex interactions. " />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <LandingPage />
    </>
  )
}
