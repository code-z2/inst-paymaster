import { Image } from "../";
import styles from "../../styles/landing/secondsection.module.css";

function SecondSection() {
  return (
    <section className={styles.second_section}>
      <div className={styles.chain_section}>
        <h2>On-Chain Rewards Middleware</h2>
        <p className="text-slate-400 my-6">
          Loyalty programs are a way we know to give back to our most loyal
          users and with account abstraction, it is possible to create a
          standalone incentive system. your users can earn a fraction of their
          transaction value each time they make a transaction. However building
          this system distinctively may incur additional miscellaneous. With
          paymasters, you can integrate chargebacks as a middleware.
        </p>
      </div>
      <div className={styles.chain_image}>
        <Image
          data-testid="chain_img"
          src="/assets/pm-images/chain_section4.png"
          alt="paymaster onchain image"
          blurDataURL="/assets/pm-images/chain_section4.png"
          width={500}
          height={400}
          object-fit="cover"
          priority
        />
      </div>
      <div className={styles.img_blur}></div>
    </section>
  );
}

export default SecondSection;
