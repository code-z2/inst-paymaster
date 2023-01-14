import styles from "../../styles/Home.module.css";
import { Image } from "./index";

const LandingPage = () => {
  return (
    <div className={styles.container}>
      <nav className={styles.paynav}>
        <a href="/" className={styles.paylogo}>
          <Image
            src="/assets/pm-images/logo.png"
            alt="paymaster logo"
            width={120}
            height={30}
            priority
          />
        </a>

        <ul>
          <li>
            <a href="#" className="mx-1 py-1">
              Docs
            </a>
          </li>
          <li>
            <button
              className="px-3 py-1 w-30 hover:bg-purple-600 
            border-solid border-2 border-slate-400 rounded-md"
            >
              Launch App
            </button>
          </li>
        </ul>
      </nav>
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

      <section className={styles.second_section}>
        <div className={styles.chain_section}>
          <h2>On-Chain Rewards Middleware</h2>
          <p className="text-slate-400 my-6">
            Loyalty programs are a way we know to give back to our most loyal
            users and with account abstraction, it is possible to create a
            standalone incentive system. your users can earn a fraction of their
            transaction value each time they make a transaction. However
            building this system distinctively may incur additional
            miscellaneous. With paymasters, you can integrate chargebacks as a
            middleware.
          </p>
        </div>
        <div className={styles.chain_image}>
          <Image
            src="/assets/pm-images/chain_section3.png"
            alt="paymaster onchain image"
            width={600}
            height={500}
            object-fit="cover"
            priority
          />
        </div>
      </section>

      <section className={styles.third_section}>
        {/* <div className={styles.chain_section}>
               <h2>On-Chain Rewards Middleware</h2>
               <p className='text-slate-400 my-6'>
               Loyalty programs are a way we know to give back to our most loyal users and with account abstraction, 
               it is possible to create a standalone incentive system. your users can earn a fraction of their 
               transaction value each time they make a transaction. However building this system distinctively 
               may incur additional miscellaneous. With paymasters, you can integrate chargebacks as a middleware.
               </p>
            </div> */}

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
          <h5 className="">
            Much More Than <br />
            Transactions
          </h5>

          <p className="text-slate-400 text-sm my-6">
            An aggregation of paymasters for users to have access to Ethereum
            protocols without incurring gas costs or unnecessary onboarding
            cost.
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

          <h5>More Visible Than Macro</h5>
          <p className="text-slate-400 my-6">
            More visible than macro Explore a wide range of Paymasters, find
            protocols with Paymaster support . Get more value when using dapps.
          </p>
        </div>
        <div className={styles.third_section_third_content}>
          <span style={{ marginLeft: "50px" }}>
            <Image
              src="/assets/pm-icons/ads_click.svg"
              alt="paymasters icon"
              width={32}
              height={30}
              object-fit="cover"
              priority
            />
          </span>
          <h5>
            Ux More Superior Than <br /> Superior
          </h5>
          <p className="text-slate-400 my-6">
            Create custom paymasters that does what you want or targets a group
            or community without complexity. Craft innovative transaction flows
            for your users.
          </p>
        </div>
        <div className={styles.third_section_img}>
          <Image
            src="/assets/pm-images/flower_img.png"
            alt="paymaster flower image"
            width={450}
            height={600}
            object-fit="cover"
            priority
          />
        </div>
        <div className={styles.flower_image}></div>
        <div className={styles.overlap_flower}>
          <div className={styles.code_snapshot}>
            <Image
              src="/assets/pm-images/code_img.png"
              alt="paymaster code snapshot"
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
              className="px-3 py-1 w-40 hover:bg-purple-900 bg-purple-600 
              rounded-md"
            >
              Explore SDK
            </button>
          </div>
        </div>
      </section>
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
            alt="paymaster getstarted image"
            width={974}
            height={259}
            object-fit="cover"
            priority
          />
        </div>
      </section>
      <section className={styles.subscribe_section}>
        <div className={styles.subscribe_logo}>
          <Image
            src="/assets/pm-images/logo.png"
            alt="paymaster logo"
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
      <div className={styles.bottom}>
        <hr className="border-1 border-slate-400 " />
        <p>&copy; 2023 Paymasters. All rights reserved. </p>
        <ul>
          <li>
            <a>Discord</a>{" "}
          </li>
          <li>
            <a>Telegram </a>
          </li>
          <li>
            <a>Twitter </a>
          </li>
          <li>
            <a>Github</a>{" "}
          </li>
          <li>
            <a>Contact</a>{" "}
          </li>
          <li>
            <a>Privacy</a>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default LandingPage;
