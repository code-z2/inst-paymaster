import { styles } from "./";
import Paynav from "./paynav";
import FirstSection from "./firstSection";
import SecondSection from "./secondSection";
// import ThirdSection from "./thirdSection";
// import FourthSection from "./fourthSection";
// import FifthSection from "./fifthSection";
// import Subscribe from "./subscribe";
import Footer from "./footer";

const LandingPage = () => {
  return (
    <div className="main-container">
      <Paynav />
      <FirstSection />
      <SecondSection />
      {/* coming soon section*/}

      {/* 
      <ThirdSection />
      <FourthSection />
      <FifthSection /> 
       <Subscribe /> */}
      <Footer />
    </div>
  );
};

export default LandingPage;
