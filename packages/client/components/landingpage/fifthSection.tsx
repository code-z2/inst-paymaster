import { Image } from "..";
import styles from "../../styles/landing/fifthsection.module.css";

/* Get started image component
 * An array of image sizes can be also be 
   incuded in the image component for responsiveness
 */
function FifthSection() {
  return (
    <section className={styles.fifth_section}>
      <div className={styles.get_started}>
        <h5>Get Started, Explore And Create Paymasters</h5>
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
