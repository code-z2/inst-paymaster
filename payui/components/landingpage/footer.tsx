import { Image } from "./index";
import { styles } from "./index";

function Footer() {
  return (
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
  );
}

export default Footer;
