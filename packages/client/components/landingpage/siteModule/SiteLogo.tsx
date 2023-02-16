import Image from "next/image";
import logoIMG from "../../../public/assets/pm-logos/paymaster-logo.svg";

const SiteLogo = () => {
  return (
    <div className="site-logo">
      <Image src={logoIMG} width={24} height={24} alt="Paymaster Logo" />
      <span className="logo-text">Paymaster</span>
    </div>
  );
};

export default SiteLogo;
