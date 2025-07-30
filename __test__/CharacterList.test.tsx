import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import CharacterList from "../components/CharacterList";
import { describe, it, expect, vi } from "vitest";

vi.mock("../hooks/useWindowSize", () => ({
  useWindowSize: () => true,
}));

vi.mock("../components/LikeButton", () => ({
  default: () => <div data-testid="like-button" />,
}));

describe("CharacterList", () => {
  const mockCharacters = [
    {
      id: 1,
      name: "Rick Sanchez",
      image: "rick.png",
      species: "Human",
      status: "Active",
    },
    {
      id: 2,
      name: "Morty Smith",
      image: "morty.png",
      species: "Human",
      status: "Active",
    },
  ];

  it("should render the title", () => {
    render(
      <MemoryRouter>
        <CharacterList title="Favorites" characters={mockCharacters} />
      </MemoryRouter>
    );

    expect(screen.getByRole("heading", { name: /favorites/i })).not.toBeNull();
  });

  it("should render all character items", () => {
    render(
      <MemoryRouter>
        <CharacterList title="Characters" characters={mockCharacters} />
      </MemoryRouter>
    );

    expect(screen.getByText("Rick Sanchez")).not.toBeNull();
    expect(screen.getByText("Morty Smith")).not.toBeNull();
  });

  it("should highlight the active character in desktop mode", () => {
    window.history.pushState({}, "", "/?character=1");

    render(
      <MemoryRouter>
        <CharacterList title="Characters" characters={mockCharacters} />
      </MemoryRouter>
    );
  });
});
