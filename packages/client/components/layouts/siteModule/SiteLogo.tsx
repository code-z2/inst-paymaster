import Image from "next/image";
import logoIMG from "../../../public/assets/pm-logos/paymaster-logo.svg";

const SiteLogo = () => {
  return (
    <div className="site-logo">
      <Image src={logoIMG} width={28} height={28} alt="Paymaster Logo" />
      <span className="logo-text">Paymasters</span>
    </div>
  );
};

export default SiteLogo;
