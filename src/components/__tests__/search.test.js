import { act, fireEvent, render, screen } from "@testing-library/react";
import Body from "../Body";
import { MOCK_DATA } from "../mocks/resApiMockData";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";

global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => {
      return Promise.resolve(MOCK_DATA);
    },
  });
});

it("should search for restaurants card in body for res text input", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });
  const searchBtn = screen.getByRole("button", { name: "Search" });

  const searchtext = screen.getByTestId("searchText");

  //mocking tytping something in search bar
  fireEvent.change(searchtext, { target: { value: "res" } });
  //mocking search button click
  fireEvent.click(searchBtn);
  const cards = screen.getAllByTestId("resCard");
  expect(cards.length).toBe(3);
});
it("should render top rated restaurants in Body component", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Body />
      </BrowserRouter>
    );
  });
    const topRatedBtn = screen.getByRole("button",{name:"Top rated restaurant"});
    console.log("buttons",topRatedBtn)
    // const topRatedBtn = screen.getByTestId("top");
    fireEvent.click(topRatedBtn);
    const topRatedRes = screen.getAllByTestId("resCard");
    expect(topRatedRes.length).toBe(11);
});
