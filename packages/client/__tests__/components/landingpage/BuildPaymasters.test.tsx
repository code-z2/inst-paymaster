import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { BuildPaymasters } from "../../../components";

/*
 *  snapshots of the buildpaymasters section components
 */
describe("Build paymasters Section ", () => {
  it("should render the build components ", () => {
    const home = render(<BuildPaymasters />);
    expect(home).toMatchSnapshot();
  });
});
