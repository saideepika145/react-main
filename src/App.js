import React, { lazy, Suspense, useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import Header from "./components/Header";
import "../index.css";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Body from "./components/Body";
import About from "./components/About";
import Error from "./components/Error";
import RestroMenu from "./components/RestroMenu";
import Shimmer from "./components/Shimmer";
import UserContext from "./utils/UserContext";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";
import Cart from "./components/Cart";
import ContactUs from "./components/ContactUs";
// import Grocery from "./components/Grocery";
const Grocery = lazy(() => import("./components/Grocery"));
console.log("isndie App.js");
const AppLayout = () => {
  const [userName,setUserName]=useState("Default User");
  useEffect(()=>{
    setUserName("Arya Stark");
  },[])
  return (
    // from userContext here value is Default User
    <Provider store={appStore}>
    <UserContext.Provider value={{ loggedInUser: userName,setUserName }}>
      {/* // from userContext here value is Arya Stark */}
      <div className="app">
        {/* <UserContext.Provider value={{ loggedInUser: "Deepika Areti" }}>*/}
        <UserContext.Provider value={{ loggedInUser: userName }}>
          {/* // from userContext here value is Deepika Areti */}
          <Header />
        </UserContext.Provider>
        {/* <Body /> */}
        <Outlet />
      </div>
    </UserContext.Provider>
    </Provider>
  );
  // return (
  //   <Router>
  //     <Routes>
  //       <Route path="/" element={ (
  //   <div className="app">
  //     <Header />
  //     <Body />
  //   </div>
  // )} />
  //       <Route path="/about" element={<About />} />
  //     </Routes>
  //   </Router>
  // );
};
const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Body />,
      },
      {
        path: "/about",
        element: <About />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/grocery",
        element: (
          <Suspense fallback={<Shimmer />}>
            <Grocery />
          </Suspense>
        ),
      },
      {
        path: "/restro/:resId",
        element: <RestroMenu />,
      },
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<RouterProvider router={appRouter} />);
// root.render(<AppLayout />);
// export function AppLayout;

// const heading = React.createElement("h1",{id:"heading"},"Hello world from react");
// const root= ReactDOM.createRoot(document.getElementById("root"));
// root.render(heading)
// import React from "react";
// import ReactDOM from "react-dom/client";
// // const Title=()=>{
// //    <h1 id="head">Hello from title</h1>
// // }
// const title = <h1 id="head">Hello from title</h1>;
// // const parent = React.createElement(
// //   "div",
// //   { id: "parent" },
// //   React.createElement(
// //     "div",
// //     { id: "child" },
// //     [React.createElement("h1", { id: "heading" }, "This is h1kjj"),React.createElement("h2", { id: "h2" }, "This is h2")]
// //   )
// // );
// // const jsonHeading=<h1 id="heading">Hello from JSX</h1>
// const HeadComponent = () => {
//   return (
//     <div>
//       {/* <Title/>\ */}
//       {title}
//       <h1 id="heading">Hello from functional component</h1>
//     </div>
//   );
// };
// const root = ReactDOM.createRoot(document.getElementById("root"));
// // root.render(parent);
// root.render(<HeadComponent />);
