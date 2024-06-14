import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../app/page";

describe("Page", () => {
  test("renders learn react link", () => {
    render(<Page />);
    const linkElement = screen.getByText(/learn react/i);
    expect(linkElement).toBeDefined();
  });
});
