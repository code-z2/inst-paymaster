import { Image } from "./";
import { styles } from "./";

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
          src="/assets/pm-images/chain_section3.png"
          alt="paymaster onchain image"
          width={600}
          height={500}
          object-fit="cover"
          priority
        />
      </div>
    </section>
  );
}

export default SecondSection;
