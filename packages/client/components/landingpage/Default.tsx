import Hero from "./Hero";
import RebatesMiddleware from "./RebatesMiddleware";
import BuildPaymasters from "./BuildPaymasters";

// Coming soon landing page
// In progress
function Default() {
  return (
    <>
      <Hero />
      <RebatesMiddleware />
      <BuildPaymasters />
    </>
  );
}

// Public landing page
// Minimal
export const UnSecureLandingPage = () => {
  return (
    <>
      <Hero />
    </>
  );
};

export default Default;
