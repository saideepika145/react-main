import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import useRestroMenu from "../utils/useRestroMenu";
import RestroCategory from "./RestroCategory";
import { useState } from "react";
const RestroMenu = () => {
  const { resId } = useParams();
  const [showIndex,setShowIndex]=useState(0)
  let restroInfo = useRestroMenu(resId);
  console.log("restroInfo", restroInfo);
  const { name, cuisines, costForTwoMessage } = restroInfo?.[2]?.card?.card
    ?.info || { name: "", cuisines: "", costForTwoMessage: "" };
  const itemCategories =
    restroInfo?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.filter(
      (c) =>
        c?.card?.card?.["@type"] ===
        "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory"
    );
  console.log("itemCategories", itemCategories);
  const recommend =
    restroInfo?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards?.findIndex(
      (obj) => {
        return obj?.card?.card?.title == "Recommended";
      }
    );
  console.log("index of recommend", recommend);
  const items = restroInfo?.[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards[
    recommend
  ]?.card?.card?.itemCards?.map((item) => {
    return {
      name: item?.card?.info?.name,
      id: item?.card?.info?.id,
      price: item?.card?.info?.price,
      image: item?.card?.info?.imageId,
    };
  });
  console.log("items in restro", items);
  return restroInfo === null ? (
    <Shimmer />
  ) : (
    <div className="text-center">
      <h1 className="font-bold text-2xl m-6">{name}</h1>
      <h1 className="font-bold text-lg m-2">
        {cuisines.join(", ")} - {costForTwoMessage}
      </h1>
      <h2>Menu</h2>
      {/* Accordian */}
      {itemCategories.map((category,index) => {
        //controlled components
        return (
          <RestroCategory
            key={category?.card?.card?.title}
            category={category?.card?.card}
            showItems={index==showIndex ?true:false}
            setShowIndex={setShowIndex}
            showIndex={showIndex}
            index={index}
          />
        );
      })}
    </div>
  );
};
export default RestroMenu;
