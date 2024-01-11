import { useDispatch, useSelector } from "react-redux";
import { Slider } from "@mui/material";

import { setPriceRange } from "../../../redux/slices/products-slice";
import { Reducers } from "../../../redux/store";

const PriceFilter = () => {
  const price = useSelector((state: Reducers) => state.products.priceRange);
  const dispatch = useDispatch();

  const handlePriceChange = (event: Event, newValue: number | number[]) => {
    dispatch(setPriceRange(newValue as [number, number]));
  };

  const marks = [
    { value: 1, label: "1" },
    { value: 500, label: "500" },
    { value: 1000, label: "1000" },
    { value: 2000, label: "2000" },
  ];

  return (
    <>
      <h3 className="pb-4 uppercase font-black">PRICE - $</h3>
      <Slider
        value={price}
        onChange={handlePriceChange}
        valueLabelDisplay="auto"
        marks={marks}
        min={1}
        max={2000}
      />
    </>
  );
};

export default PriceFilter;
