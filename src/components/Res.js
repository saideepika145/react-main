import { CDN_URL } from "../utils/constants";
const Res = (props) => {
  const {
    cloudinaryImageId,
    name,
    cuisines,
    costForTwo,
    avgRatingString,
    sla,
  } = props.resData;
  return (
    <div data-testid="resCard" className="m-4 p-4 w-[200px] border border-solid border-gray-400 bg-gray-100 h-[450px] rounded-lg hover:bg-gray-300">
      <img alt="res" src={CDN_URL + cloudinaryImageId}></img>
      <h3 className="font-bold py-2 text-lg">{name}</h3>
      <h4>{cuisines.join(", ")}</h4>
      <h4>{avgRatingString} rating</h4>
      <h4>{costForTwo}</h4>
      <h4>{sla.deliveryTime} minutes</h4>
    </div>
  );
};


//higher order components - important interview questionl
export const withPromotedLabel=(Res)=>{
  return (props)=>{
    return (
      <>
      <label className="absolute bg-black text-white m-2 p-2 rounded-lg">Promoted</label>
      <Res {...props}/>
      </>
    )
  }
}

export default Res;
