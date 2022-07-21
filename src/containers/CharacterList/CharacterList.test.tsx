import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import CharacterList from "./CharacterList";
import { MemoryRouter } from "react-router-dom";
import {
  CHARACTERS,
  FILTERED_CHARACTERS,
  LISTING_QUERY_MOCKS,
} from "../../__mock/characterList";

const renderWithRouter = () => {
  render(
    <MemoryRouter>
      <MockedProvider mocks={LISTING_QUERY_MOCKS} addTypename={false}>
        <CharacterList />
      </MockedProvider>
    </MemoryRouter>
  );
};
describe("CharacterList Tests", () => {
  test("should render component without crashing", async () => {
    renderWithRouter();
  });
  test("should display spinner when api call is pending", async () => {
    renderWithRouter();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
  });

  test("should hide spinner when api response received", async () => {
    renderWithRouter();
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    // Rick Sanchez is the name for first character in the mock hence it should be rendered
    expect(await screen.findByText(/Rick Sanchez/i)).toBeInTheDocument();
    expect(screen.queryByText(/Loading.../i)).not.toBeInTheDocument();
  });

  test("should show correct total pages from the api response", async () => {
    renderWithRouter();
    // wait for api response
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();

    //total page count from the mock is 42, hence goto page 42 button should be rendered
    expect(
      await screen.findByRole("button", {
        name: /go to page 42/i,
      })
    ).toBeInTheDocument();
  });

  test("should render all characters that are received from api", async () => {
    renderWithRouter();
    // wait for api response
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    // check if all characters are rendered
    CHARACTERS.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
  });

  test("should render characters filtered by name if search text is entered", async () => {
    renderWithRouter();
    // wait for api response
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    // Search Rick in search box mock for same is added to display just 2 characters
    const searchEl = screen.getByRole("textbox", {
      name: /search character/i,
    });
    userEvent.type(searchEl, "Rick");
    expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    // should render new characters based on mock
    FILTERED_CHARACTERS.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });

    // As only 2 characters are returned so there should not be go to page 2 button
    expect(
      screen.queryByRole("button", {
        name: /go to page 2/i,
      })
    ).not.toBeInTheDocument();
  });

  test("should reset page once search text in entered", async () => {
    renderWithRouter();

    // Wait for API response
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    // Click on page 2 button
    const goToPage2El = screen.getByRole("button", {
      name: /go to page 2/i,
    });
    userEvent.click(goToPage2El);
    expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();

    // verify if current active page button is 2`
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(
      screen.getByRole("button", {
        name: /page 2/i,
      })
    ).toHaveAttribute("aria-current", "true");

    // Enter text Rick in search box, mock for same is added to display just 2 characters
    const searchEl = screen.getByRole("textbox", {
      name: /search character/i,
    });
    userEvent.type(searchEl, "Rick");
    expect(await screen.findByText(/Loading.../i)).toBeInTheDocument();
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    // Current active page should be 1
    expect(
      screen.queryByRole("button", {
        name: /page 2/i,
      })
    ).not.toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /page 1/i,
      })
    ).toBeInTheDocument();
  });

  test("should render characters filtered by gender if gender filter selected", async () => {
    renderWithRouter();
    // wait for api response
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    // click on filter button
    const filterEl = screen.getByRole("button", {
      name: /filter/i,
    });
    userEvent.click(filterEl);

    // verify dropdown is opened and gender group button is visible
    expect(screen.getByTitle("filter-group-status")).toBeInTheDocument();

    // click on male filter button
    const maleFilterButton = screen.getByRole("button", {
      name: "Male",
    });
    expect(maleFilterButton).toBeInTheDocument();
    userEvent.click(maleFilterButton);

    // Filtered list should be rendered after response
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    FILTERED_CHARACTERS.forEach((character) => {
      expect(screen.getByText(character.name)).toBeInTheDocument();
    });
  });
});
