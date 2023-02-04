import { Image } from "..";

/* Navbar for paymaster's list page */

function Paynav() {
  return (
    <nav className="active-paymaster-nav">
      <a href="/" className="paylogo">
        <Image
          data-testid="logo"
          src="/assets/pm-images/logo.png"
          blurDataURL="/assets/pm-images/logo.png"
          alt="paymaster logo"
          width={120}
          height={50}
          priority
        />
      </a>

      <ul className="list-ul">
        <li data-testid="list-items">
          {/* <a href="#" className="mx-1 py-1">
            Docs
          </a> */}
          <div>
            <select className="bg-black px-1 py-1 h-9" name="crypto">
              <option value="ethereum">
                {/* <Image
                  src="/assets/pm-icons/eth.png"
                  alt="paymaster ethereum icon"
                  width={10}
                  height={16}
                  priority
                /> */}
                Ethereum
              </option>
              <option value="ethereum">Ethereum</option>
            </select>
          </div>
        </li>
        <li data-testid="list-items">
          <button className="p-2  pm-0  w-30 sm:w-40 sm:after:content-['_Paymaster']  sm:h-9 bg-purple-600 rounded-md">
            Create
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Paynav;
