import { styles } from "./";

function Footer() {
  return (
    <div className={styles.bottom}>
      <hr className="" />
      <p>&copy; 2023 Paymasters. All rights reserved. </p>
      <ul>
        <li>
          <a href="#">Discord</a>{" "}
        </li>
        <li>
          <a href="#">Telegram </a>
        </li>
        <li>
          <a href="#">Twitter </a>
        </li>
        <li>
          <a href="#">Github</a>{" "}
        </li>
        <li>
          <a href="#">Contact</a>{" "}
        </li>
        <li>
          <a href="#">Privacy</a>{" "}
        </li>
      </ul>
    </div>
  );
}

export default Footer;
