import Paynav from "./paynav";
import FirstSection from "./firstSection";
import SecondSection from "./secondSection";
import ThirdSection from "./thirdSection";
import JsClientSection from "./jsClientSection";
import FourthSection from "./fourthSection";
import FifthSection from "./fifthSection";
import Subscribe from "./subscribe";
import Footer from "./footer";
import React from "react";

const LandingPage = () => {
  // public landing page
  return (
    <div className="container scaleto100 mx-auto min-h-(65vh)">
      <div className="grid-container">
        <Paynav />
        <FirstSection />
        <Footer />
      </div>
    </div>
  );
};

export const SecureLandingPage = () => {
  // Coming soon private landing page
  return (
    <div className="container scaleto100 mx-auto  min-h-(65vh)">
  
        <Paynav />
        <FirstSection />
        <SecondSection />
        <ThirdSection />
        <JsClientSection />
        <FourthSection />
        <FifthSection />
        <Subscribe />
        <Footer />
     
    </div>
  );
};

export default LandingPage;
