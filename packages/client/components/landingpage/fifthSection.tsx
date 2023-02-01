import { Image } from "..";
import styles from "../../styles/landing/fifthsection.module.css"

function FifthSection() {
  return (
    <section className={styles.fifth_section}>
      <div className={styles.get_started}>
        <h5>Get Started, Explore And Create Paymasters </h5>
        <button
          className="px-3 py-1
       mt-6 rounded-md"
        >
          Launch App
        </button>
      </div>

      <div className={styles.get_started_image}>
        <Image
          src="/assets/pm-images/Frame55.png"
          blurDataURL="assets/pm-images/Frame55.png"
          alt="paymaster getstarted image"
          width={974}
          height={300}
          object-fit="cover"
          priority
        />
      </div>
    </section>
  );
}

export default FifthSection;
