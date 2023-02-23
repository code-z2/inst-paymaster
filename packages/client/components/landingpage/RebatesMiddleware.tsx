import { Image, Link } from "../";
import rebatesIllustration from "../../public/assets/pm-images/rebates-middleware.svg";
import searchIcon from "../../public/assets/pm-icons/search.svg";
import clickIcon from "../../public/assets/pm-icons/ads_click.svg";
import exchangeIcon from "../../public/assets/pm-icons/component_exchange.svg";
import abstractSphere from "../../public/assets/pm-images/abstract-sphere.png";
import circles from "../../public/assets/pm-images/elipses.svg";

function RebatesMiddleware() {
  return (
    <>
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
    </>
  );
}

export default RebatesMiddleware;
