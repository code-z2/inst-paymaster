import { Image, Link } from "../";
import codeblock from "../../public/assets/pm-images/codeblock.png";
import npmIcon from "../../public/assets/pm-icons/npm.svg";
import codeIcon from "../../public/assets/pm-icons/code.svg";
import windowsIcon from "../../public/assets/pm-icons/windows.svg";

import paymasterLogo from "../../public/assets/pm-logos/paymaster-logo.svg";
import { partners } from "./partners";

function BuildPaymasters() {
  return (
    <>
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
              <li key={partner.id} className="partner-item">
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

export default BuildPaymasters;
