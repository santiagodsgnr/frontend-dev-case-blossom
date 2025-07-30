import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SortButton from "../components/SortButton";
import { describe, it, expect, vi } from "vitest";

describe("SortButton", () => {
  it("should toggle from ascending to descending when clicked", async () => {
    const setSortOrder = vi.fn();

    render(<SortButton sortOrder="asc" setSortOrder={setSortOrder} />);
    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(setSortOrder).toHaveBeenCalledWith(expect.any(Function));

    const stateFn = setSortOrder.mock.calls[0][0];
    const result = stateFn("asc");

    expect(result).toBe("desc");
  });

  it("should toggle from descending to ascending when clicked", async () => {
    const setSortOrder = vi.fn();

    render(<SortButton sortOrder="desc" setSortOrder={setSortOrder} />);
    const button = screen.getByRole("button");

    await userEvent.click(button);

    expect(setSortOrder).toHaveBeenCalledWith(expect.any(Function));

    const stateFn = setSortOrder.mock.calls[0][0];
    const result = stateFn("desc");

    expect(result).toBe("asc");
  });
});
