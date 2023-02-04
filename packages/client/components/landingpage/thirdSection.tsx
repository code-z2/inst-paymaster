import { Image } from "../";
import styles from "../../styles/landing/thirdsection.module.css";

function ThirdSection() {
  return (
    <section className={styles.third_section}>
      <div className={styles.third_section_first_content}>
        <span>
          <Image
            src="/assets/pm-icons/component_exchange.svg"
            alt="paymasters icon"
            width={35}
            className="mb-2"
            height={30}
            object-fit="cover"
            priority
          />
        </span>
        <h5 className="font-bold text-2xl">
          Much More Than <br />
          Transactions
        </h5>

        <p className="text-slate-400 text-sm my-6">
          An aggregation of paymasters for users to have access to Ethereum
          protocols without incurring gas costs or unnecessary onboarding cost.
        </p>
      </div>
      <div className={styles.third_section_second_content}>
        <span>
          <Image
            src="/assets/pm-icons/search.svg"
            alt="paymasters search icon"
            width={32}
            className="mb-2"
            height={30}
            object-fit="cover"
            priority
          />
        </span>

        <h5 className="font-bold text-2xl">More Visible Than Macro</h5>
        <p className="text-slate-400 my-6">
          More visible than macro Explore a wide range of Paymasters, find
          protocols with Paymaster support . Get more value when using dapps.
        </p>
      </div>
      <div className={styles.third_section_third_content}>
        <span>
          <Image
            src="/assets/pm-icons/ads_click.svg"
            alt="paymasters icon"
            blurDataURL="/assets/pm-icons/ads_click.svg"
            width={32}
            height={30}
            object-fit="cover"
            priority
          />
        </span>
        <h5 className="font-bold text-2xl">
          Ux More Superior Than <br /> Superior
        </h5>
        <p className="text-slate-400 my-6">
          Create custom paymasters that does what you want or targets a group or
          community without complexity. Craft innovative transaction flows for
          your users.
        </p>
      </div>
      <div className={styles.third_section_img}>
        <Image
          data-testid="flower-img"
          src="/assets/pm-images/flower_img.png"
          alt="paymaster flower image"
          blurDataURL="/assets/pm-images/flower_img.png"
          width={450}
          height={600}
          object-fit="cover"
          priority
        />
      </div>
      <div className={styles.flower_image_blur}></div>
      <div className={styles.overlap_flower}>
        <div className={styles.code_snapshot}>
          <Image
            src="/assets/pm-images/code_img.png"
            alt="paymaster code snapshot"
            blurDataURL="/assets/pm-images/code_img.png"
            width={550}
            height={600}
            object-fit="cover"
            priority
          />
        </div>

        <div className={styles.build_paymaster}>
          <h2>Build Paymasters</h2>
          <p className="text-slate-400 my-6">
            Integrate our typescript SDK to form paymasters compatible zk
            transaction objects in your dapps. Explore SDK
          </p>
          <button
            className="px-3 py-2 w-40 hover:bg-purple-900 bg-purple-600 
        rounded-md"
          >
            Explore SDK
          </button>
        </div>
        <div className={styles.build_blur}></div>
      </div>
    </section>
  );
}

export default ThirdSection;
