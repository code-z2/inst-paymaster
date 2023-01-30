import ActiveNav from "./activeNav";
import Firstsection from "./firstSection";
import AllPaymasters from "./allpaymasters";
import Loadmore from "./loadmore";
import { Footer } from "..";

const ActivePaymaster = () => {
  return (
    <div className="container scaleto100 px-1 mx-auto  min-h-(65vh)">
      <ActiveNav />

      <div className="container w-[934px] mx-auto my-0">
        <Firstsection />
        <AllPaymasters />
        <Loadmore />
      </div>
      <Footer />
    </div>
  );
};

export default ActivePaymaster;
