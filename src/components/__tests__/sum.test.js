import sum from "../sum"

test("test sample 1",()=>{
    const result=sum(3,4);

    //Assertion
    expect(result).toBe(7);
})