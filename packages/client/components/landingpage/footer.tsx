function Footer() {
  return (
    <footer className="bottom pl-2">
      <hr className="" />
      <p>&copy; 2023 Paymasters. All rights reserved. </p>
      <ul>
        <li data-testid="footer-list-item">
          <a href="#">Discord</a>{" "}
        </li>
        <li data-testid="footer-list-item">
          <a href="#">Telegram </a>
        </li>
        <li data-testid="footer-list-item">
          <a href="#">Twitter </a>
        </li>
        <li data-testid="footer-list-item">
          <a href="#">Github</a>{" "}
        </li>
        <li data-testid="footer-list-item">
          <a href="#">Contact</a>{" "}
        </li>
        <li data-testid="footer-list-item">
          <a href="#">Privacy</a>{" "}
        </li>
      </ul>
    </footer>
  );
}

export default Footer;
