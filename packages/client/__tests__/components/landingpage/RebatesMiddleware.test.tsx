import React from "react";
import "@testing-library/jest-dom";
import { RebatesMiddleware } from "../../../components";
import { render } from "@testing-library/react";

/*
 *  snapshots of the middleware section components
 */
describe("Middleware Section ", () => {
  it("Should render the middleware components ", () => {
    const home = render(<RebatesMiddleware />);
    expect(home).toMatchSnapshot();
  });
});
