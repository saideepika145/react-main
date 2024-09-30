import { useDispatch } from "react-redux";
import { CDN_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice";

const ItemCard = (props) => {
  const { items } = props;
  // console.log("items", items);
  const dispatch = useDispatch();
  //Dispatch an item
  const handleClick = (item) => {
    dispatch(addItem(item));
  };
  return (
    <div>
      {items.map((item) => {
        return (
          <div data-testid="foodItems" className="p-4 border-grey-200 border-b-2 flex">
            <div className="w-9/12">
              <span className="py-2">{item?.card?.info?.name}</span>
              <span>- ₹{item?.card?.info?.price / 100}</span>
            </div>
            {/* <p>{item?.card?.info?.description}</p> */}
            <div className="w-3/12 py-4">
              <img
                src={
                  CDN_URL +
                  (item?.card?.info?.imageId || "feqyykx7xl6mfwlqzhr1")
                }
                className="w-full"
              />
              <div className="absolute">
                <button
                data-testid="addBtn"
                  className=" bg-black text-white px-1 rounded-lg text-sm"
                  onClick={() => handleClick(item)}
                >
                  ADD +
                </button>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
export default ItemCard;
