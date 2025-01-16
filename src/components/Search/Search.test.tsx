import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Search from "./Search";

jest.mock("framer-motion", () => ({
  motion: {
    div: function MockDiv(props: any) {
      const { children, ...rest } = props;
      return React.createElement("div", rest, children);
    },
    li: function MockLi(props: any) {
      const { children, ...rest } = props;
      return React.createElement("li", rest, children);
    },
  },
  AnimatePresence: function MockAnimatePresence(props: any) {
    return React.createElement(React.Fragment, null, props.children);
  },
}));

describe("Search Component", () => {
  const mockOnSelect = jest.fn();
  const defaultProps = {
    onSelect: mockOnSelect,
    placeholder: "Search...",
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders with placeholder text", () => {
    render(<Search {...defaultProps} />);
    expect(screen.getByPlaceholderText("Search...")).toBeInTheDocument();
  });

  it("shows loading state while searching", async () => {
    render(<Search {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "react" } });
    expect(screen.getByText("Loading...")).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.queryByText("Loading...")).not.toBeInTheDocument();
    });
  });

  it("displays search results", async () => {
    render(<Search {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "react" } });

    await waitFor(() => {
      expect(screen.getByText("React Basics")).toBeInTheDocument();
      expect(screen.getByText("React Hooks Demo")).toBeInTheDocument();
    });
  });

  it("filters results based on search query", async () => {
    render(<Search {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "typescript" } });

    await waitFor(() => {
      expect(screen.getByText("TypeScript Tutorial")).toBeInTheDocument();
      expect(screen.queryByText("React Basics")).not.toBeInTheDocument();
    });
  });

  it("handles item selection via click", async () => {
    render(<Search {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "react" } });

    await waitFor(() => {
      fireEvent.click(screen.getByText("React Basics"));
    });

    expect(mockOnSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        id: "1",
        title: "React Basics",
        category: "Frontend",
      })
    );
  });

  it("handles keyboard navigation", async () => {
    render(<Search {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "react" } });

    await waitFor(() => {
      expect(screen.getByText("React Basics")).toBeInTheDocument();
    });

    // Press arrow down to focus first item
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(screen.getByText("React Basics").parentElement).toHaveClass(
      "bg-blue-50"
    );

    // Press arrow down again to focus second item
    fireEvent.keyDown(input, { key: "ArrowDown" });
    expect(screen.getByText("React Hooks Demo").parentElement).toHaveClass(
      "bg-blue-50"
    );

    // Press enter to select focused item
    fireEvent.keyDown(input, { key: "Enter" });
    expect(mockOnSelect).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "React Hooks Demo",
      })
    );
  });

  it("clears input when clear button is clicked", async () => {
    render(<Search {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "react" } });

    await waitFor(() => {
      const clearButton = screen.getByRole("button");
      fireEvent.click(clearButton);
    });

    expect(input).toHaveValue("");
    expect(mockOnSelect).toHaveBeenCalledWith(null);
  });

  it('shows "No results found" message when no matches', async () => {
    render(<Search {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "nonexistent" } });

    await waitFor(() => {
      expect(screen.getByText("No results found.")).toBeInTheDocument();
    });
  });

  it("closes dropdown when Escape key is pressed", async () => {
    render(<Search {...defaultProps} />);
    const input = screen.getByPlaceholderText("Search...");

    fireEvent.change(input, { target: { value: "react" } });

    await waitFor(() => {
      expect(screen.getByText("React Basics")).toBeInTheDocument();
    });

    fireEvent.keyDown(input, { key: "Escape" });

    expect(screen.queryByText("React Basics")).not.toBeInTheDocument();
  });
});
