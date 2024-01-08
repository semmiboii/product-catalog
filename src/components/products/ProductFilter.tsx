import axios from "axios"

import { useQuery } from "@tanstack/react-query"

import ProductFilterCell from "./ProductFilterCell"

const ProductFilter = () => {

  const fetchCategories = async() => {
    const url = 'https://dummyjson.com/products/categories';
    const res = await axios.get(url);
    const data = await res.data;

    return data;
  }

  const {data: allCategories, isSuccess } = useQuery({
    queryKey: ['categories'],
    queryFn: fetchCategories
  })

  return (
    <div className='border-2 border-gray-300 outline-none h-full min-w-80 rounded-md'>
      <h1 className="uppercase font-extrabold pl-2 pt-2 text-center text-2xl">Filter</h1>
      <ProductFilterCell cell="Categories" categories={allCategories} isSuccess={isSuccess}/>
      <ProductFilterCell cell="Price" />
    </div>
  )
}

export default ProductFilter