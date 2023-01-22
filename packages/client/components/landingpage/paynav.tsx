import { Image } from "./";

function Paynav() {
  return (
    <nav className="paynav">
      <a href="/" className="paylogo">
        <Image
          src="/assets/pm-images/logo.png"
          blurDataURL="/assets/pm-images/logo.png"
          alt="paymaster logo"
          width={120}
          height={50}
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
            className="px-1 m-0 py-1  lg:w-40 hover:bg-purple-600 
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
