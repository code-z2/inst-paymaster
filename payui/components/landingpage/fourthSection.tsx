import { Image } from "./index";
import { styles } from "./index";

function FourthSection() {
  return (
    <section className={styles.fourth_section}>
      <h4 className="text-center">Our Partners</h4>
      <div className={styles.partners_logos}>
        <span className={styles.zksynk}>
          <Image
            src="/assets/pm-logos/zkSynk.png"
            alt="zkSynk image"
            width={60}
            height={50}
            object-fit="cover"
            priority
          />
        </span>
        <span className={styles.starknet}>
          <Image
            src="/assets/pm-logos/StarkNet.png"
            alt="StarkNet image"
            width={60}
            height={50}
            object-fit="cover"
            priority
          />
        </span>
        <span className={styles.bravos}>
          <Image
            src="/assets/pm-logos/Braavos.png"
            alt="Bravos image"
            width={60}
            height={50}
            object-fit="cover"
            priority
          />
        </span>
        <span className={styles.argent}>
          <Image
            src="/assets/pm-logos/Argent.png"
            alt="Argent image"
            width={60}
            height={50}
            object-fit="cover"
            priority
          />
        </span>
        <span className={styles.chainlink}>
          <Image
            src="/assets/pm-logos/ChainLink.png"
            alt="ChainLink image"
            width={60}
            height={50}
            object-fit="cover"
            priority
          />
        </span>
        <span className={styles.outlier}>
          <Image
            src="/assets/pm-logos/Outlier.png"
            alt="Outlier image"
            width={60}
            height={50}
            object-fit="cover"
            priority
          />
        </span>
        <span className={styles.dao}>
          <Image
            src="/assets/pm-logos/developer_dao.png"
            alt="developer_dao image"
            width={60}
            height={50}
            object-fit="cover"
            priority
          />
        </span>
      </div>
    </section>
  );
}

export default FourthSection;
