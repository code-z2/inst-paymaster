import { Image } from "./";
import { styles } from "./";

function Paynav() {
  return (
    <nav className="paynav">
      <a href="/" className="paylogo">
        <Image
          src="/assets/pm-images/logo.png"
          blurDataURL="/assets/pm-images/logo.png"
          alt="paymaster logo"
          width={130}
          height={120}
          priority
        />
      </a>

      <ul className="list-ul">
        <li>
          <a href="#" className="mx-1 py-1">
            Docs
          </a>
        </li>
        <li>
          <button
            className="px-2 m-0 py-1 w-40 hover:bg-purple-600 
        border-solid border-2 border-slate-400 rounded-md"
          >
            Coming Soon
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Paynav;
