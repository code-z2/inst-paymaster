import { Image } from "./index";
import { styles } from "./index";

function Paynav() {
  return (
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
  );
}

export default Paynav;
