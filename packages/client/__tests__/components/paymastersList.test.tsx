import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  PaymastersList,
  ActiveNav,
  Allpaymasters,
  FirstSection,
} from "../../components";

/*
 *  active paymasters components
 * 
 
*/
describe("Paymasters list component", () => {
  it("should render the active paymaster component", () => {
    render(<PaymastersList />);
  });

  it("Navbar should have a logo and two list items", async () => {
    render(<ActiveNav />);
    const logo = screen.getByTestId("logo");
    const list = await screen.findAllByTestId("list-items");

    expect(logo).toHaveAttribute("alt", "paymaster logo");
    expect(list.length).toBe(2);
  });

  it("Active paymaster should display an image ", async () => {
    render(<Allpaymasters />);
    const img = screen.getAllByTestId("activeimg");
    const heading = screen.getByRole("heading");
    const requirements = await screen.findAllByText("Requirements");

    expect(requirements[0]).toBeVisible();
    expect(heading.textContent).toBe("All paymasters");
    expect(img.length).toBeGreaterThan(0);
  });

  it("Should show the active paymaster in use", async () => {
    render(<FirstSection />);
    const img = screen.getByTestId("test_img");
    const heading = screen.getAllByRole("heading");

    expect(heading[0].textContent).toBe("Active paymaster");
    expect(heading[1].textContent).toBe("Active");
    expect(img).toHaveAttribute("alt", "paymaster active logo");
  });
});
