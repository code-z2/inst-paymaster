import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Hero } from "../../../components";

/*
 *  snapshots of the hero components
 */
describe("Hero Section ", () => {
  it("should render the Hero section ", () => {
    const home = render(<Hero />);
    expect(home).toMatchSnapshot();
  });
});
