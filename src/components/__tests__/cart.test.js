import { fireEvent, render, screen, act } from "@testing-library/react";
import Cart from "../Cart";
import { Provider } from "react-redux";
import appStore from "../../utils/appStore";
import { MOCK_DATA } from "../mocks/resMemuMockData";
import RestroMenu from "../RestroMenu";
import Header from "../Header";
import { BrowserRouter } from "react-router-dom";
import "@testing-library/jest-dom";
global.fetch = jest.fn(() => {
  return Promise.resolve({
    json: () => Promise.resolve(MOCK_DATA),
  });
});
it("should render cart", async () => {
  await act(async () => {
    render(
      <BrowserRouter>
        <Provider store={appStore}>
          <Cart />
          <RestroMenu />
          {/* <RestroCategory/> */}
          <Header />
        </Provider>
      </BrowserRouter>
    );
  });
  const accordianHeader = screen.getByText("Starters (5)");
  fireEvent.click(accordianHeader);
  const foodItems = screen.getAllByTestId("foodItems");
  expect(foodItems.length).toBe(5);
  const addBtn = screen.getAllByTestId("addBtn");
  console.log("addBtns", addBtn);
  //click on add cart 1
  fireEvent.click(addBtn[0]);
  //now cart 1 should be there in header
  expect(screen.getByText("Cart (1 items)")).toBeInTheDocument();
  expect(screen.getAllByTestId("foodItems").length).toBe(6);
  //click on add cart 1 more time
  fireEvent.click(addBtn[1]);
  //now cart 2 should be there in header
  expect(screen.getByText("Cart (2 items)")).toBeInTheDocument();
  expect(screen.getAllByTestId("foodItems").length).toBe(7);
  const clearCart = screen.getByRole("button", { name: "Clear Cart" });
  //click on clear cart
  fireEvent.click(clearCart);
  //since starters are 5 , food items will be 5
  expect(screen.getAllByTestId("foodItems").length).toBe(5);

  //click ceared the cart below H1 should be there in cart page
  expect(screen.getByText("Cart is Empty. Please add items to cart.")).toBeInTheDocument();
});
