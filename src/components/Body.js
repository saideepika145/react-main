import Res, { withPromotedLabel } from "./Res";
// import restList from "../utils/mockData";
import { useContext, useEffect, useState } from "react";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/UserContext";
const Body = () => {
  // const [listOfRest,setListOfRest]=useState(restList);
  const [listOfRest, setListOfRest] = useState([]);
  const [filteredRest, setFilteredRest] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const { loggedInUser, setUserName } = useContext(UserContext);
  const RestroPromoted = withPromotedLabel(Res);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    setLoading(true);
    let res = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=21.99740&lng=79.00110&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );
    const data = await res.json();
    console.log("data jdnked", data);
    // console.log(
    //   "json",
    //   data?.data?.cards[2].card?.card?.gridElements?.infoWithStyle.restaurants
    // );
    const restroIndex = data?.data?.cards.findIndex((obj) => {
      return (
        obj?.card?.card?.gridElements?.infoWithStyle.restaurants != undefined
      );
    });
    console.log("restroIndex", restroIndex);
    let extracted = data?.data?.cards[
      restroIndex
    ].card?.card?.gridElements?.infoWithStyle.restaurants.map((res) => {
      return res.info;
    });
    // console.log("extracted", extracted);
    setListOfRest(extracted);
    setFilteredRest(extracted);
    setLoading(false);
  };
  const handleClick = () => {
    // console.log("before",restList.length)
    let filtered = listOfRest.filter((res) => res.avgRating > 4);
    // console.log("after",filtered.length)
    setListOfRest(filtered);
    setFilteredRest(filtered);
  };

  const onlineStatus = useOnlineStatus();
  if (!onlineStatus) {
    //to test this u can navigate to inspect tab -> under -> network tab-> select offline in dropdown
    return (
      <h1>Looks like you're offline.Please check your internet connection</h1>
    );
  }
  // console.log("load",loading)
  return (
    <>
      {/* {console.log("heee", listOfRest)} */}
      {listOfRest.length === 0 ? (
        <Shimmer />
      ) : (
        <div className="body">
          <div className="px-4 py-2 m-4 filter flex align-super">
            <input
              data-testid="searchText"
              type="text"
              className="mx-2 my-1 border border-solid border-black"
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
            />
            <button
              name="search"
              className="px-4 bg-green-100 rounded-lg"
              onClick={async () => {
                const filtered = listOfRest.filter((res) => {
                  return res.name
                    ?.toUpperCase()
                    .includes(searchText.toUpperCase());
                });
                setFilteredRest(filtered);
              }}
            >
              Search
            </button>
            <button
              data-testid="top"
              className="mx-4 px-2 bg-green-100 rounded-lg"
              onClick={handleClick}
            >
              Top rated restaurant
            </button>
            <div className="px-4">
              {/* Every time u type username through userContext
              1. username in header and about page will also change accordingly as
              ==> u passed setUserName as value to userCOntext in app.js file */}
              <label>UserName : </label>
              <input
                type="text"
                className="px-2 py-1 border border-solid border-black"
                value={loggedInUser}
                onChange={(event) => setUserName(event.target.value)}
              />
            </div>
          </div>

          <div className="flex flex-wrap">
            {
              // restaurant
              filteredRest.map((restaurant) => (
                <Link to={"/restro/" + restaurant.id}>
                  {!restaurant.veg ? (
                    <RestroPromoted key={restaurant.id} resData={restaurant} />
                  ) : (
                    <Res key={restaurant.id} resData={restaurant} />
                  )}
                </Link>
              ))
            }
          </div>
        </div>
      )}
      ;
    </>
  );
};
export default Body;
