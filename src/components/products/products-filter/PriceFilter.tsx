import { Slider } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

import { setPriceRange } from "../../../redux/slices/products-slice";
import { Store } from "../../../redux/store";

const PriceFilter = () => {
  const price = useSelector((state: Store) => state.products.priceRange);
  const dispatch = useDispatch();

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    dispatch(setPriceRange(newValue as [number, number]));
  };

  const marks = [
    { value: 0, label: "$0" },
    { value: 500, label: "$500" },
    { value: 1000, label: "$1000" },
  ];

  return (
    <>
      <h3 className="pb-4 uppercase font-black">PRICE</h3>
      <Slider
        value={price}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        marks={marks}
        min={0}
        max={1000}
      />
    </>
  );
};

export default PriceFilter;
