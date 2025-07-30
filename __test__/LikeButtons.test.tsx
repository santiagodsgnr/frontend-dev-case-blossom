import { render, fireEvent } from "@testing-library/react";
import LikeButton from "../components/LikeButton";
import { vi } from "vitest";

const toggleFavoriteMock = vi.fn();
const isFavoriteMock = vi.fn(() => false);

vi.mock("../store/useFavorite", () => {
  return {
    useFavorites: vi.fn(() => ({
      toggleFavorite: toggleFavoriteMock,
      isFavorite: isFavoriteMock,
    })) as unknown,
  };
});

describe("LikeButton", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("rendering correctly with the empty icon if not a favorite", () => {
    const { container } = render(<LikeButton id="1" />);
    const svg = container.querySelector("svg");
    expect(svg).toBeTruthy();
    expect(svg?.getAttribute("fill")).toBe("none");
  });

  it("render with full icon if you are a favorite", () => {
    isFavoriteMock.mockReturnValueOnce(true);
    const { container } = render(<LikeButton id="1" />);
    const svg = container.querySelector("svg");
    expect(svg?.getAttribute("fill")).toBe("#53C629");
  });

  it("call Toggyfavorite when clicking", () => {
    const { getByRole } = render(<LikeButton id="1" />);
    const button = getByRole("button");
    fireEvent.click(button);
    expect(toggleFavoriteMock).toHaveBeenCalledWith("1");
  });
});
