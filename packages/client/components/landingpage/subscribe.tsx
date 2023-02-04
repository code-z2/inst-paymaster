import { Image } from "../";
import styles from "../../styles/landing/subscribe.module.css";

function Subscribe() {
  return (
    <section className={styles.subscribe_section}>
      <div className={styles.subscribe_logo}>
        <Image
          src="/assets/pm-images/logo.png"
          alt="paymaster logo"
          blurDataURL="/assets/pm-images/logo.png"
          width={120}
          height={30}
          priority
        />
      </div>
      <p className=" mb-1"></p>
      <form>
        <label htmlFor="subscribe">Subscribe to our news letter</label>
        <br />
        <input
          type="email"
          id="subscribe"
          placeholder="Enter your email"
          name="subscribe"
          className="pl-2"
        />

        <button
          name="subscribe"
          className="px-3 py-1  hover:bg-purple-900 bg-purple-600 m-2 rounded-md"
        >
          Subscribe
        </button>
      </form>
    </section>
  );
}

export default Subscribe;
