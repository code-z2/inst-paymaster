import Head from "next/head";
import { ReactElement } from "react";
import DefaultLayout from "../../layouts/Default";
import Link from "next/link";
import Image from "next/image";
import heroIllustration from "../../public/assets/pm-images/paymaster-hero-illustration.svg";
import rebatesIllustration from "../../public/assets/pm-images/rebates-middleware.svg";
import searchIcon from "../../public/assets/pm-icons/search.svg";
import clickIcon from "../../public/assets/pm-icons/ads_click.svg";
import exchangeIcon from "../../public/assets/pm-icons/component_exchange.svg";
import abstractSphere from "../../public/assets/pm-images/abstract-sphere.png";
import codeblock from "../../public/assets/pm-images/codeblock.png";
import circles from "../../public/assets/pm-images/elipses.svg";
import npmIcon from "../../public/assets/pm-icons/npm.svg";
import codeIcon from "../../public/assets/pm-icons/code.svg";
import windowsIcon from "../../public/assets/pm-icons/windows.svg";

import zkSynk from "../../public/assets/partners/zkSynk.png";
import StrakNet from "../../public/assets/partners/StrakNet.png";
import Braavos from "../../public/assets/partners/Braavos.png";
import Argrent from "../../public/assets/partners/Argrent.png";
import Chainlink from "../../public/assets/partners/Chainlink.png";
import OutlierVC from "../../public/assets/partners/Outlier VC.png";
import DeveloperDao from "../../public/assets/partners/Developer Dao.png";

import paymasterLogo from "../../public/assets/pm-logos/paymaster-logo.svg";

export default function HomeDev() {
  const partners = [
    {
      name: "zkSynk",
      logo: zkSynk,
    },
    {
      name: "StrakNet",
      logo: StrakNet,
    },
    {
      name: "Braavos",
      logo: Braavos,
    },
    {
      name: "Argrent",
      logo: Argrent,
    },
    {
      name: "Chainlink",
      logo: Chainlink,
    },
    {
      name: "Outlier VC",
      logo: OutlierVC,
    },
    {
      name: "Developer Dao",
      logo: DeveloperDao,
    },
  ];
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
      <section className="hero-section site-section">
        <div className="wrapper w-image">
          <div className="hero-content section-content">
            <h1 className="font-semibold text-5xl">
              The only paymasters access infrastructure you will need
            </h1>
            <p>
              Using paymasters to simplify zk transactions and provide superior
              UX to dapps.
            </p>
            <Link href="/">
              <button className="cta">Launch App</button>
            </Link>
          </div>
          <div className="hero-img-cont section-img-cont">
            <Image src={heroIllustration} alt="Paymaster Hero Illustration" />
          </div>
        </div>
      </section>
      <section className="rebates-middleware-section site-section">
        <div className="wrapper w-image">
          <div className="section-content">
            <h2 className="font-semibold text-5xl">Rebates Middleware</h2>
            <p>
              Loyalty programs are a way we know to give back to our most loyal
              users and with account abstraction, it is possible to create a
              standalone incentive system.
            </p>
            <p>
              Your users can earn a fraction of their transaction value each
              time they make a transaction.
            </p>
            <p>
              However building this system distinctively may incur additional
              miscellaneous. With paymasters, you can integrate chargebacks as a
              middleware.
            </p>
          </div>
          <div className="section-img-cont">
            <Image src={rebatesIllustration} alt="Rebates Illustration" />
          </div>
        </div>
      </section>
      <section className="features-section site-section">
        <div className="wrapper">
          <div className="features-grid">
            <article className="feature-item ">
              <Image src={searchIcon} alt="Search Icon" />
              <h3 className="font-semibold text-xl">More visible than macro</h3>
              <p className="text-sm">
                Explore a wide range of Paymasters, find protocols with
                Paymaster support . Get more value when using dapps.
              </p>
            </article>
            <article className="feature-item ">
              <Image src={exchangeIcon} alt="Search Icon" />
              <h3 className="font-semibold text-xl">
                Much more than transactions{" "}
              </h3>
              <p className="text-sm">
                An aggregation of paymasters for users to have access to
                Ethereum protocols without incurring gas costs or unnecessary
                onboarding cost.
              </p>
            </article>
            <article className="feature-item ">
              <Image src={clickIcon} alt="Search Icon" />
              <h3 className="font-semibold text-xl">
                UX more superior than superior
              </h3>
              <p className="text-sm">
                Create custom paymasters that does what you want or targets a
                group or community without complexity. Craft innovative
                transaction flows for your users.
              </p>
            </article>
          </div>
          <div className="features-img-cont">
            <Image
              src={abstractSphere}
              width={300}
              height={300}
              alt="Abstract Sphere"
            />
            <div className="circles">
              <Image src={circles} width={300} height={300} alt="Circles" />
            </div>
          </div>
        </div>
      </section>
      <div className="section-group">
        <section className="build-section site-section">
          <div className="wrapper">
            <header className="section-header py-32 w-image inverse">
              <div className="section-content">
                <h2 className="font-semibold text-5xl">Build paymasters</h2>
                <p>
                  Integrate our typescript SDK to form paymasters compatible zk
                  transaction objects in your dapps.
                </p>

                <Link href="/dev">
                  <button className="cta">Explore SDK</button>
                </Link>
              </div>
              <div className="section-img-cont">
                <Image
                  src={codeblock}
                  width={300}
                  height={300}
                  className="p-16"
                  alt="paymaster codeblock"
                />
              </div>
            </header>
            <ul className="options">
              <li className="option">
                <article className="option-item">
                  <h3 className="font-semibold text-xl">JS Client Library</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Sit lectus ac et
                    turpis eu ultricies odio praesent in.
                  </p>
                  <button className="cta none">
                    <Image
                      src={npmIcon}
                      width={32}
                      height={32}
                      className="icon !w-8 !h-8"
                      alt="npm icon"
                    />
                    <span className="text text-paymasters-purple">JS Docs</span>
                  </button>
                </article>
              </li>
              <li className="option">
                <article className="option-item">
                  <h3 className="font-semibold text-xl">HTTP API</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Sit lectus ac et
                    turpis eu ultricies odio praesent in.
                  </p>
                  <button className="cta none">
                    <Image
                      src={codeIcon}
                      width={32}
                      height={32}
                      className="icon !w-8 !h-8"
                      alt="npm icon"
                    />
                    <span className="text text-paymasters-purple">
                      HTTP Docs
                    </span>
                  </button>
                </article>
              </li>
              <li className="option">
                <article className="option-item">
                  <h3 className="font-semibold text-xl">Web App</h3>
                  <p>
                    Lorem ipsum dolor sit amet consectetur. Sit lectus ac et
                    turpis eu ultricies odio praesent in.
                  </p>
                  <button className="cta none">
                    <Image
                      src={windowsIcon}
                      width={32}
                      height={32}
                      className="icon !w-8 !h-8"
                      alt="npm icon"
                    />
                    <span className="text text-paymasters-purple">
                      Make your first upload
                    </span>
                  </button>
                </article>
              </li>
            </ul>
            <section className="supported-languages">
              <h3 className="font-semibold text-xl">Supported Languages</h3>
              <ul className="supported-languages-list">
                <li className="item">
                  <button className="cta">Nodejs</button>
                </li>
                <li className="item">
                  <button className="cta">Solidity</button>
                </li>
                <li className="item">
                  <button className="cta">JavaScript</button>
                </li>
                <li className="item">
                  <button className="cta">TypeScript</button>
                </li>
                <li className="item">
                  <button className="cta">Cairo</button>
                </li>
              </ul>
            </section>
          </div>
        </section>
      </div>
      <section className="site-section partners-section">
        <div className="wrapper">
          <header className="section-header">
            <h2 className="font-semibold text-5xl text-center">Our Partners</h2>
          </header>
          <ul className="partners-list">
            {partners.map((partner) => (
              <li className="partner-item">
                <div className="img-cont flex items-center justify-center w-12 h-w-12">
                  <Image
                    src={partner.logo}
                    width={64}
                    height={64}
                    alt={partner.name}
                  />
                </div>
                <h3 className="font-medium text-lg">{partner.name}</h3>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="cta-section site-section">
        <div className="wrapper">
          <header className="section-header py-32 w-image inverse">
            <div className="section-content">
              <h2 className="font-semibold text-4xl">
                Get started, explore and create Paymasters
              </h2>
              <Link href="/dev">
                <button className="cta dark">Launch App</button>
              </Link>
            </div>
            <div className="section-img-cont">
              <Image
                src={paymasterLogo}
                width={300}
                height={300}
                className="p-16"
                alt="paymaster logo"
              />
            </div>
          </header>
        </div>
      </section>
    </>
  );
}

HomeDev.getLayout = function getLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
};
