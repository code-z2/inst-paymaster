import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Landingpage from "../../pages";
import SecureLandingPage from "../../pages/auth/[private]";
import SecurePaymasterListPage from "../../pages/auth/[private]/activepaymaster";

/*
 *  snapshots of the index page
 */
describe("Landing page ", () => {
  it("should render the landing page ", () => {
    const home = render(<Landingpage />);
    expect(home).toMatchSnapshot();
  });
});
