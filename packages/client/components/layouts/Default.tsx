import SiteFooter from "./siteModule/SiteFooter";
import SiteHeader from "./siteModule/SiteHeader";
import SiteLogo from "./siteModule/SiteLogo";
import SiteNav from "./siteModule/SiteNav";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <SiteHeader>
        <SiteLogo />
        <SiteNav />
      </SiteHeader>
      <main>{children}</main>
      <SiteFooter />
    </>
  );
};

export default DefaultLayout;
