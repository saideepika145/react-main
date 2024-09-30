import { useState } from "react";
import ItemCard from "./ItemCard";

const RestroCategory = (props) => {
  return (
    <div>
      <div className="w-6/12 m-auto bg-gray-100  shadow-lg p-2 my-4 rounded-lg">
        {/* Accordian Header */}
        <div
          className="flex justify-between cursor-pointer"
          onClick={() => {
            if (props.showIndex !== props.index) {
              console.log("index is not equal", props.index, props.showIndex);
              props.setShowIndex(props.index);
            } else {
              console.log("index is equal", props.index,props.showIndex);
              props.setShowIndex(-1);
            }
          }}
        >
          <span className="font-bold">
            {props.category.title} ({props.category.itemCards.length})
          </span>
          <span>🔽</span>
        </div>
        {/* Accordian Body */}
        <div>
          {props.showItems && (
            <ItemCard key={props.index} items={props.category.itemCards} />
          )}
        </div>
      </div>
    </div>
  );
};
export default RestroCategory;
