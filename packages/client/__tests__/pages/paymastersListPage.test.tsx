import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import SecurePaymasterListPage from "../../pages/auth/[private]/activepaymaster";

/*
 *  snapshots of the paymasters list page
 */
describe("paymasters list page ", () => {
  it("should render the paymasters list page ", () => {
    const PaymasterListPage = render(<SecurePaymasterListPage />);
    expect(PaymasterListPage).toMatchSnapshot();
  });
});
