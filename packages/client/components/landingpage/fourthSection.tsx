import { Image } from "./";

function FourthSection() {
  return (
    <section className="fourth_section">
      <h4 className="text-center">Our Partners</h4>
      <div className="partners_logos">
        <span className="zksynk">
          <Image
            src="/assets/pm-logos/zkSynk.png"
            alt="zkSynk image"
            width={60}
            height={50}
            object-fit="cover"
            priority
          />
        </span>
        <span className="starknet">
          <Image
            src="/assets/pm-logos/StarkNet.png"
            alt="StarkNet image"
            width={60}
            height={50}
            object-fit="cover"
            priority
          />
        </span>
        <span className="bravos">
          <Image
            src="/assets/pm-logos/Braavos.png"
            alt="Bravos image"
            width={60}
            height={50}
            object-fit="cover"
            priority
          />
        </span>
        <span className="argent">
          <Image
            src="/assets/pm-logos/Argent.png"
            alt="Argent image"
            width={60}
            height={50}
            object-fit="cover"
            priority
          />
        </span>
        <span className="chainlink">
          <Image
            src="/assets/pm-logos/ChainLink.png"
            alt="ChainLink image"
            width={60}
            height={50}
            object-fit="cover"
            priority
          />
        </span>
        <span className="outlier">
          <Image
            src="/assets/pm-logos/Outlier.png"
            alt="Outlier image"
            width={60}
            height={50}
            object-fit="cover"
            priority
          />
        </span>
        <span className="dao">
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
