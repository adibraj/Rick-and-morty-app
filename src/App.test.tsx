import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import { MemoryRouter } from "react-router-dom";
import App from "./App";

describe("App Tests", () => {
  test("should render component without crashing", async () => {
    render(
      <MemoryRouter>
        <MockedProvider>
          <App />
        </MockedProvider>
      </MemoryRouter>
    );
  });

  test("should render character detail component", async () => {
    const characterDetailRoute = "/character/12";

    render(
      <MemoryRouter initialEntries={[characterDetailRoute]}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </MemoryRouter>
    );
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    // back to list button is rendered in character detail component
    expect(screen.getByText(/back to list/i)).toBeInTheDocument();
  });

  test("should redirect to index route for all invalid route", async () => {
    const invalidRoute = "/some/invalid";

    render(
      <MemoryRouter initialEntries={[invalidRoute]}>
        <MockedProvider>
          <App />
        </MockedProvider>
      </MemoryRouter>
    );

    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    expect(
      screen.getByRole("textbox", {
        name: /search character/i,
      })
    ).toBeInTheDocument();
  });
});
