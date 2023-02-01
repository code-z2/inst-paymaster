import { Image } from "..";
import styles from "../../styles/landing/firstsection.module.css"

function FirstSection() {
  return (
    <section className={styles.first_section}>
      <div className={styles.heading_section}>
        <h1>The only paymaster's access infrastructure you will need</h1>
        <p className="text-slate-400 my-6">
          Using paymaster to simplify zk transactions and provide
          <br /> superior ux to dapps
        </p>
        <button className="px-3 py-1 ">Coming soon</button>
      </div>
      <div className={styles.heading_image}>
        <Image
          src="/assets/pm-images/header_image.png"
          alt="paymaster-planet-logo"
          blurDataURL="/assets/pm-images/header_image.png"
          width={452}
          height={322}
          priority
        />
      </div>
      <div className={styles.planet_blur}></div>
    </section>
  );
}

export default FirstSection;
