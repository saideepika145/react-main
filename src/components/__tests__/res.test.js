import { render,screen } from "@testing-library/react";
import { MOCK_DATA } from "../mocks/resMockData";
import Res,{withPromotedLabel} from "../Res";
import "@testing-library/jest-dom"
it("should render res card",()=>{
    render(<Res resData={MOCK_DATA}/>);
    const name=screen.getByText("Raajbagh Restaurant")
    expect(name).toBeInTheDcoument;
}); 
it("should render res with promotedlabel ",()=>{
    const RestroPromoted = withPromotedLabel(Res);
    render(<RestroPromoted resData={MOCK_DATA}/>);
    const promoted=screen.getByText("Promoted")
    expect(promoted).toBeInTheDcoument;
}); 