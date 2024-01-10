import axios from "axios";

import { Suspense, lazy, memo } from "react";
import { useQuery } from "@tanstack/react-query";

import ProductFilter from "./product-ui/ProductFilter";
import Loading from "../UI/Loading";
import { useSelector } from "react-redux";

const ProductCard = lazy(() => import("./product-ui/ProductCard"));

export interface ProductType {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

export interface ProductCardProps {
  product: ProductType;
  key: number;
}

const Products: React.FC = () => {
  const { categoryFilter, priceRange } = useSelector(
    (state: any) => state.products
  );

  // Function to fetch all the products through axios.
  const fetchProducts = async () => {
    let url = "https://dummyjson.com/products";
    const res = await axios.get(url);
    const data = await res.data;

    return data;
  };

  // Fetching all the products through useQuery.

  const { data: allProducts, isSuccess } = useQuery({
    queryFn: fetchProducts,
    queryKey: ["products"],
  });

  const categoryFilteredProducts =
    isSuccess && allProducts && categoryFilter
      ? allProducts.products.filter(
          (product: ProductType) => product.category === categoryFilter
        )
      : isSuccess && allProducts && allProducts.products;

  const priceFilteredProducts = 
    isSuccess && categoryFilteredProducts && categoryFilteredProducts.filter((product: ProductType) => {
      const [min, max] = priceRange;
      if (product.price >= min && product.price <= max){
        return product
      }
    })

  // Checking if the data is fetched, then mapping the data to individual products.
  return (
    <div className="flex flex-row h-full overflow-scroll">
      <div className="hidden sm:block relative">
        <ProductFilter />
      </div>
      <Suspense fallback={<Loading />}>
        {isSuccess && priceFilteredProducts.length !== 0 && (
          <div className="h-full w-full grid lg:grid-cols-3 md:grid-cols-1 p-2 overflow-scroll gap-4">
            {priceFilteredProducts.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        {isSuccess && priceFilteredProducts.length === 0 && (
          <div className="text-3xl w-full h-full flex justify-center items-center">
            <h1>No Products Found</h1>
          </div>
        )}
      </Suspense>
    </div>
  );
};

export default memo(Products);
