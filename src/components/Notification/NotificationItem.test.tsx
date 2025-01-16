// src/components/NotificationItem/NotificationItem.test.tsx
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import notificationReducer, {
  removeNotification,
} from "../../store/notificationSlice";
import { NotificationItem } from "./NotificationItem";
import { CommonProps } from "components/Search/Search.test";

jest.mock("framer-motion", () => ({
  motion: {
    div: ({ children, ...props }: CommonProps) => (
      <div data-testid="motion-div" {...props}>
        {children}
      </div>
    ),
  },
}));

describe("NotificationItem", () => {
  const createTestStore = () =>
    configureStore({
      reducer: {
        notifications: notificationReducer,
      },
    });

  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  it("renders with correct message and type", () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <NotificationItem id="test-id" message="Test message" type="success" />
      </Provider>
    );

    expect(screen.getByText("Test message")).toBeInTheDocument();
    expect(screen.getByTestId("motion-div")).toHaveClass("bg-green-500");
  });

  it("applies correct background color based on type", () => {
    const store = createTestStore();
    const { rerender } = render(
      <Provider store={store}>
        <NotificationItem id="test-id" message="Test message" type="error" />
      </Provider>
    );

    expect(screen.getByTestId("motion-div")).toHaveClass("bg-red-500");

    rerender(
      <Provider store={store}>
        <NotificationItem id="test-id" message="Test message" type="info" />
      </Provider>
    );

    expect(screen.getByTestId("motion-div")).toHaveClass("bg-blue-500");
  });

  it("dispatches removeNotification when close button is clicked", () => {
    const store = createTestStore();
    const mockDispatch = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <NotificationItem id="test-id" message="Test message" type="success" />
      </Provider>
    );

    const closeButton = screen.getByRole("button");
    fireEvent.click(closeButton);

    expect(mockDispatch).toHaveBeenCalledWith(removeNotification("test-id"));
  });

  it("auto-dismisses after 3 seconds", () => {
    const store = createTestStore();
    const mockDispatch = jest.spyOn(store, "dispatch");

    render(
      <Provider store={store}>
        <NotificationItem id="test-id" message="Test message" type="success" />
      </Provider>
    );

    expect(mockDispatch).not.toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(mockDispatch).toHaveBeenCalledWith(removeNotification("test-id"));
  });

  it("cleans up timer on unmount", () => {
    const store = createTestStore();
    const mockDispatch = jest.spyOn(store, "dispatch");

    const { unmount } = render(
      <Provider store={store}>
        <NotificationItem id="test-id" message="Test message" type="success" />
      </Provider>
    );

    unmount();

    // Fast-forward time by 3 seconds
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    // Verify the notification was not removed after unmount
    expect(mockDispatch).not.toHaveBeenCalled();
  });
});
