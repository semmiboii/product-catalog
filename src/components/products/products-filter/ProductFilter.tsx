import axios from "axios";

import { useQuery } from "@tanstack/react-query";

import ProductFilterItem from "./ProductFilterItem";

const ProductFilter = () => {
  const fetchCategories = async () => {
    const url = "https://dummyjson.com/products/categories"; // fetching data from dummyjson.com/products - FakeAPI
    const res = await axios.get(url);
    const data = await res.data;

    return data;
  };

  const { data: allCategories, isSuccess } = useQuery({
    // using useQuery hook provided by @tanstack/query to get all information about the query.
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  return (
    <div className="h-full bg-emerald-400 outline-none min-w-80 drop-shadow-2xl p-1 flex flex-col justify-center overflow-scroll">
      <ProductFilterItem categories={allCategories} isSuccess={isSuccess} />
    </div>
  );
};

export default ProductFilter;
