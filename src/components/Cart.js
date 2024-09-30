import { useDispatch, useSelector } from "react-redux";
import ItemCard from "./ItemCard";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log("cartItems", cartItems);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  };
  return (
    <div className="text-center">
      <div className="text-lg font-bold p-4">Cart</div>
      <div className="w-6/12 m-auto">
        <button
          className="p-2 m-2 bg-black text-white rounded-lg"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        <ItemCard items={cartItems} />
        {cartItems.length==0 && <h1 className="text-center">Cart is Empty. Please add items to cart.</h1>}
      </div>
    </div>
  );
};
export default Cart;
