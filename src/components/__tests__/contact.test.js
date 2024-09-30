import { render, screen } from "@testing-library/react";
import ContactUs from "../ContactUs";
import "@testing-library/jest-dom";
describe("Contact page test Cases", () => {
    beforeAll(()=>{
        console.log("Before All");
    })
    afterAll(()=>{
        console.log("After All");
    })
    beforeEach(()=>{
        console.log("Before Each");
    })
    afterEach(()=>{
        console.log("After Each");
    })
  test("should load button in  contact us component ", () => {
    render(<ContactUs />);
    //   const submit = screen.getByRole("button");
    const submit = screen.getByText("Submit");
    expect(submit).toBeInTheDocument;
  });

  test("should load input in contact us component ", () => {
    render(<ContactUs />);
    const message = screen.getByPlaceholderText("Message");
    expect(message).toBeInTheDocument;
  });

  //we can use test or it

  it("should load 2 input boxes in contact us component ", () => {
    render(<ContactUs />);
    const inputBoxes = screen.getAllByRole("textbox");
    // console.log("inputBoxes", inputBoxes);
    expect(inputBoxes.length).toBe(2);
  });
});
