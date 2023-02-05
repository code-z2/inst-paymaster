import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SecureLandingPage from "../../pages/auth/[private]";

/*
 *  snapshots of the pages
 */
describe("Landing page ", () => {
  it("should render the coming soon landing page ", () => {
    const comingSoonLandingPage = render(<SecureLandingPage />);
    expect(comingSoonLandingPage).toMatchSnapshot();
  });
});
