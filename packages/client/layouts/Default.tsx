import SiteHeader from "../components/landingpage/siteModule/SiteHeader";
import SiteLogo from "../components/landingpage/siteModule/SiteLogo";
import SiteNav from "../components/landingpage/siteModule/SiteNav";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SiteHeader>
        <SiteLogo />
        <SiteNav />
      </SiteHeader>
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
