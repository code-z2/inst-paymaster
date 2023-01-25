import { Image } from "../";


function FirstSection() {
  return (
    <section className="first_section">
      <div className="heading_section">
        <h1>The only paymaster's access infrastructure you will need</h1>
        <p className="text-slate-400 my-6">
          Using paymaster to simplify zk transactions and provide
          <br /> superior ux to dapps
        </p>
        <button className="px-3 py-1 ">Coming soon</button>
      </div>
      <div className="heading_image">
        <Image
          src="/assets/pm-images/header_image.png"
          alt="paymaster-planet-logo"
          blurDataURL="/assets/pm-images/header_image.png"
          width={522}
          height={522}
          priority
        />
      </div>
      <div className="planet_blur"></div>
    </section>
  );
}

export default FirstSection;
