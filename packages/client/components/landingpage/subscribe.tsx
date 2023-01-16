import { Image } from "./";
import { styles } from "./";

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
      <p className=" mb-4">Subscribe to our news letter</p>
      <form>
        <input
          type="email"
          placeholder="Enter your email"
          name="subscribe"
          className=""
        />
        <button className="px-3 py-1  hover:bg-purple-900 bg-purple-600 m-2 rounded-md">
          Subscribe
        </button>
      </form>
    </section>
  );
}

export default Subscribe;
