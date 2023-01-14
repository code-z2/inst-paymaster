import { Image } from "./index";
import { styles } from "./index";

function FirstSection() {
  return (
    <section className={styles.first_section}>
      <div className={styles.heading_section}>
        <h1>The only paymaster's access infrastructure you will need</h1>
        <p className="text-slate-400 my-6">
          Using paymaster to simplify zk transactions and provide
          <br /> superior ux to dapps
        </p>
        <button
          className="px-3 py-1 w-40 hover:bg-purple-900 bg-purple-600 
        border-solid border-2 border-slate-400 rounded-md"
        >
          Launch App
        </button>
      </div>
      <div className={styles.heading_image}>
        <Image
          src="/assets/pm-images/header_image.png"
          alt="paymaster-planet-logo"
          width={570}
          height={600}
          priority
        />
      </div>
    </section>
  );
}

export default FirstSection;
