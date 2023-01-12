import styles from '../../styles/Home.module.css';
import {Image }from './index';

const LandingPage = () => {
     return (
        <div className={styles.container}>
          <div className='h-screen p-0 m-0'>
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
            <li ><a href="#" className='mx-1 py-1'>Docs</a></li>
            <li><button className='px-3 py-1 hover:bg-purple-600 
            border-solid border-2 border-slate-400 rounded-md'>Launch App</button></li>
           </ul>
           </nav>
           <section className={styles.first_section}>
            <div className={styles.heading_section}>
              <h1>
                The only paymaster's access infrastructure you will need
              </h1>
              <p className='text-slate-400 my-6'>Using paymaster to simplify zk transactions and provide superior ux to dapps</p>
              <button className='px-3 py-1 w-40 hover:bg-purple-900 bg-purple-600 
            border-solid border-2 border-slate-400 rounded-md'>Launch App</button>
            </div>
            <div className={styles.heading_image}>
            <Image
              src="/assets/pm-images/header_image.png"
              alt="paymaster-planet-logo"
              width={520}
              height={500}
              priority
              />
            </div>
           </section>
           </div>
           <section className={styles.second_section}>
            <div className={styles.chain_section}>
               <h2>On-Chain Rewards Middleware</h2>
               <p className='text-slate-400 my-6'>
               Loyalty programs are a way we know to give back to our most loyal users and with account abstraction, 
               it is possible to create a standalone incentive system. your users can earn a fraction of their 
               transaction value each time they make a transaction. However building this system distinctively 
               may incur additional miscellaneous. With paymasters, you can integrate chargebacks as a middleware.
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
        </div>
     )
}


export default LandingPage