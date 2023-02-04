import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Landingpage from "../../pages";
import SecureLandingPage from "../../pages/auth/[private]";
import SecurePaymasterListPage from "../../pages/auth/[private]/activepaymaster";

/*
 *  snapshots of the pages
 */
describe("Landing page ", () => {
  it("should render the landing page ", () => {
    const home = render(<Landingpage />);
    expect(home).toMatchSnapshot();
  });

  it("should render the coming soon landing page ", () => {
    const comingSoonLandingPage = render(<SecureLandingPage />);
    expect(comingSoonLandingPage).toMatchSnapshot();
  });

  it("should render the paymasters list page ", () => {
    const PaymasterListPage = render(<SecurePaymasterListPage />);
    expect(PaymasterListPage).toMatchSnapshot();
  });
});
