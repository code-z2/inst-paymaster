import React from "react";
import { useRouter } from "next/router";
import { render, screen } from "@testing-library/react";
import mockRouter from "next-router-mock";
import { LandingPageLayout, Hero } from "../../../components";

jest.mock("next/router", () => require("next-router-mock"));
/*
 *  snapshots of the Layout of the landing page components
 */
describe("Layout of the Landing page ", () => {
  it("mocks the useRouter hook", () => {
    // Set the initial url:
    mockRouter.push("/");
  });
  it("should render the child components ", () => {
    const home = render(
      <LandingPageLayout>
        {" "}
        <Hero />{" "}
      </LandingPageLayout>
    );
    expect(home).toMatchSnapshot();
  });
});
