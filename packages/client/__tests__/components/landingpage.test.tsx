import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  SecondSection,
  ThirdSection,
  FourthSection,
  Subscribe,
  JsClientSection,
  FifthSection,
  Footer,
  Paynav,
  Landingpage,
  Hero,
} from "../../components";

/*
 *  Landing page paymasters components
 *
 *
 */
describe("Landing page components", () => {
  it("should render the landing page component", () => {
    render(<Landingpage />);
  });

  it("Navbar should have a logo and two list items", async () => {
    render(<Paynav />);
    const logo = screen.getByRole("img");
    const list = await screen.findAllByTestId("list-items");

    expect(logo).toHaveAttribute("alt", "paymaster logo");
    expect(list.length).toBe(2);
  });

  it("Should display hero section heading and image ", async () => {
    render(<Hero />);
    const img = screen.getByTestId("planet_img");
    const heading = screen.getByRole("heading");
    const btn = screen.getByRole("button");

    expect(btn).toBeInTheDocument();
    expect(heading.textContent).toBe(
      "The only paymaster's access infrastructure you will need"
    );
    expect(img).toHaveAttribute("alt", "paymaster-planet-logo");
  });

  it("Should display second section heading and image ", async () => {
    render(<SecondSection />);
    const img = screen.getByTestId("chain_img");
    const heading = screen.getByRole("heading");

    expect(heading.textContent).toBe("On-Chain Rewards Middleware");
    expect(img).toHaveAttribute("alt", "paymaster onchain image");
  });

  it("Should display third section heading and images ", async () => {
    render(<ThirdSection />);
    const img = screen.getByTestId("flower-img");
    const headings = screen.getAllByRole("heading");
    const btn = screen.getByRole("button");

    expect(btn).toBeInTheDocument();
    expect(headings.length).toBe(4);
    expect(headings[3].textContent).toBe("Build Paymasters");
    expect(img).toHaveAttribute("alt", "paymaster flower image");
  });

  it("Should display partners logos in the Fourth section", () => {
    render(<FourthSection />);
    const allImgs = screen.getAllByRole("img");
    const heading = screen.getByRole("heading");

    expect(heading.textContent).toBe("Our Partners");
    expect(allImgs.length).toBeGreaterThan(5);
  });

  it("Should display Client library section", () => {
    render(<JsClientSection />);

    const headings = screen.getAllByRole("heading");

    expect(headings[0].textContent).toBe("JS Client Library");
    expect(headings[1].textContent).toBe("HTTP API");
    expect(headings[2].textContent).toBe("Web App");
    expect(headings[3].textContent).toBe("Supported Languages");
  });

  it("Should display Client library section", () => {
    render(<FifthSection />);

    const heading = screen.getByRole("heading");
    const img = screen.getByRole("img");
    const btn = screen.getByRole("button");

    expect(heading.textContent).toBe(
      "Get Started, Explore And Create Paymasters"
    );
    expect(img).toHaveAttribute("alt", "paymaster getstarted image");
    expect(btn).toBeInTheDocument();
  });

  it("Should display Client library section", () => {
    render(<Subscribe />);

    const input = screen.getByRole("textbox");
    const subscribebtn = screen.getByRole("button", {
      name: "Subscribe",
    });

    expect(input).not.toBeRequired();
    expect(input).toBeInTheDocument();
    expect(subscribebtn).toBeInTheDocument();
  });

  it("Should display the footer section", async () => {
    render(<Footer />);

    const listItems = screen.getAllByTestId("footer-list-item");
    const text = await screen.findByText(
      "© 2023 Paymasters. All rights reserved."
    );

    expect(listItems.length).toBe(6);
    expect(text).toBeInTheDocument();
  });
});
