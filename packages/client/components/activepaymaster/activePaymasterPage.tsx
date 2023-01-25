import ActiveNav from "./activeNav";
import {
  ActivePaymasterFirstSection,
  AllPaymasters,
  Footer,
  Loadmore,
  Singlelist,
} from "..";

const ActivePaymaster = () => {
  return (
    <div className="container xl:px-40 mx-auto  min-h-(65vh)">
      <ActiveNav />

      <div className="container w-[934px] mx-auto my-0">
        <ActivePaymasterFirstSection />
        <AllPaymasters />
        <Singlelist />
        <Singlelist />
        <Loadmore />
      </div>
      <Footer />
    </div>
  );
};

export default ActivePaymaster;
