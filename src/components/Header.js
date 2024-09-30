import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import { useContext,useState } from "react";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
const Header = () => {
  let onlineStatus = useOnlineStatus();
  const { loggedInUser } = useContext(UserContext);
  const [loginStatus, setLoginStatus] = useState("Login");
  // console.log("logged",loggedInUser)
  const handleLogin = () => {
    if (loginStatus == "Login") {
      setLoginStatus("Logout");
    } else {
      setLoginStatus("Login");
    }
  };
  //subscribing to store using a selector
  const cartItems = useSelector((store) => store.cart.items);
  console.log("cartItems", cartItems);
  return (
    <div className="flex justify-between shadow-lg bg-cyan-100 text-center sm:bg-yellow-50">
      <div className="logo-container">
        <img
          className="w-32"
          src="data:image/jpeg;base64,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"
        ></img>
      </div>

      <div className="mx-4 px-4 align-middle">
        <ul className="flex px-4 m-4">
          <li className="px-4">Online Status : {onlineStatus ? "🟢" : "🔴"}</li>
          <li className="px-4">
            <Link to="/about">About</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Contact Us</Link>
          </li>
          <li className="px-4">
            <Link to="/">Home</Link>
          </li>
          <li className="px-4" name={loginStatus}>
            <button onClick={handleLogin}>{loginStatus}</button>
          </li>
          <li className="px-4 font-bold text-xl">
            <Link to="/cart">Cart ({cartItems.length} items)</Link>
          </li>
          <li className="px-4">
            <Link to="/grocery">Grocery</Link>
          </li>

          <li className="px-4">{loggedInUser}</li>
        </ul>
      </div>
    </div>
  );
};
export default Header;
