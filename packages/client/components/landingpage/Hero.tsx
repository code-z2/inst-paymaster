import { Image, Link } from "../";
import heroIllustration from "../../public/assets/pm-images/paymaster-hero-illustration.svg";

function Hero() {
  return (
    <section className="hero-section site-section">
      <div className="wrapper w-image">
        <div className="hero-content section-content">
          <h1 className="font-semibold text-5xl leading-normal">
            The only paymasters access infrastructure you will need
          </h1>
          <p>
            Using paymasters to simplify zk transactions and provide superior UX
            to dapps.
          </p>
          <Link href="/">
            <button className="cta">Coming soon</button>
          </Link>
        </div>
        <div className="hero-img-cont section-img-cont">
          <Image src={heroIllustration} alt="Paymaster Hero Illustration" />
        </div>
      </div>
    </section>
  );
}

export default Hero;
