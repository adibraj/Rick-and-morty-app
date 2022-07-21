import React from "react";
import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import CharacterDetails from "./CharacterDetails";
import { FETCH_CHARACTER_DETAIL } from "../../hooks/useFetchCharacterDetailQuery";
import {
  CHARACTER_DETAIL_RESPONSE,
  CHARACTER_ID_2,
} from "../../__mock/characterDetails";

const ERROR_ID = "1";
const CHARACTER_MOCK_ID = "2";
const NOT_FOUND_ID = "3";

const CHARACTER_ERROR_MOCK = {
  request: {
    query: FETCH_CHARACTER_DETAIL,
    variables: {
      id: ERROR_ID,
    },
  },
  result: {},
  error: new Error("An error occurred"),
};

const CHARACTER_2_MOCK = {
  request: {
    query: FETCH_CHARACTER_DETAIL,
    variables: {
      id: CHARACTER_MOCK_ID,
    },
  },
  result: CHARACTER_DETAIL_RESPONSE,
};

// Empty Character if id in url path is entered invalid
const NO_CHARACTER_MOCK = {
  request: {
    query: FETCH_CHARACTER_DETAIL,
    variables: {
      id: NOT_FOUND_ID,
    },
  },
  result: { data: { character: null } },
};

const renderWithRouter = (initalPath?: string) => {
  render(
    <MemoryRouter initialEntries={initalPath ? [initalPath] : undefined}>
      <MockedProvider
        mocks={[NO_CHARACTER_MOCK, CHARACTER_ERROR_MOCK, CHARACTER_2_MOCK]}
        addTypename={false}
      >
        <Routes>
          <Route path="character/:characterId" element={<CharacterDetails />} />
        </Routes>
      </MockedProvider>
    </MemoryRouter>
  );
};

describe("Character Details Tests", () => {
  test("should render component without crashing", () => {
    renderWithRouter();
  });

  test("should display spinner when api call is pending", async () => {
    renderWithRouter(`/character/${CHARACTER_MOCK_ID}`);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    // wait for api response
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
  });

  test("should display no character message if invalid characterId provided", async () => {
    renderWithRouter(`/character/${NOT_FOUND_ID}`); // this will return empty character object
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    // wait for api response
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));
    expect(
      screen.getByText("Character details not found!!!")
    ).toBeInTheDocument();
  });

  test("should display error message if any error is thrown by api", async () => {
    renderWithRouter(`/character/${ERROR_ID}`); // this will return an error
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    // wait for api response
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    expect(
      screen.getByText("Something went wrong please try again")
    ).toBeInTheDocument();
  });

  test("should display all character properties", async () => {
    renderWithRouter(`/character/${CHARACTER_MOCK_ID}`);
    expect(screen.getByText(/Loading.../i)).toBeInTheDocument();
    // wait for api response
    await waitForElementToBeRemoved(() => screen.queryByText("Loading..."));

    expect(
      screen.getByRole("img", {
        name: /beth smith/i,
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("heading", {
        name: /beth smith/i,
      })
    ).toBeInTheDocument();

    // check if all episodes are rendered in table
    CHARACTER_ID_2.episode.forEach((episode) => {
      expect(
        screen.getByRole("rowheader", {
          name: episode.episode,
        })
      ).toBeInTheDocument();
    });
  });
});
