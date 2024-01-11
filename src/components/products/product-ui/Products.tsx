import axios from "axios";

import { useSelector } from "react-redux";
import { Suspense, lazy, memo, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import ProductFilter from "../products-filter/ProductFilter";
import MobileFilter from "../products-filter/MobileFilter";
import Loading from "../../UI/Loading";
import { createPortal } from "react-dom";

const ProductCard = lazy(() => import("./ProductCard"));

export interface ProductType {
  // defining the type-definition for the product we recieve through the dummyAPI.
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
  // defining the ProductCard Component Props.
  product: ProductType;
  key: number;
}

const Products: React.FC = () => {
  const { categoryFilter, priceRange } = useSelector(
    // destructuring filters from redux-store products-state.
    (state: any) => state.products
  );

  const modal = document.getElementById("modal");
  const [modalOpen, setModalOpen] = useState(false);

  const onClick = () => {
    // onclick for the modal
    setModalOpen(true);
  };

  const onUnmount = () => {
    // unmount the modal by clicking close button.
    setModalOpen(false);
  };

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
    isSuccess &&
    categoryFilteredProducts &&
    categoryFilteredProducts.filter((product: ProductType) => {
      const [min, max] = priceRange;
      if (product.price >= min && product.price <= max) {
        return product;
      }
    });

  // Checking if the data is fetched, then mapping the data to individual products.
  return (
    <div className="bg-[#92C7CF] rounded-md border-none flex flex-row h-full overflow-scroll">
      <div className="hidden sm:block relative">
        <ProductFilter />
      </div>
      <Suspense fallback={<Loading />}>
        {isSuccess && priceFilteredProducts.length !== 0 && (
          <div className="h-full w-full grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-1 p-2 overflow-scroll gap-4">
            {priceFilteredProducts.map((product: ProductType) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
        {isSuccess && priceFilteredProducts.length === 0 && (
          <div className="text-3xl w-full h-full flex justify-center items-center">
            <h1 className="bg-white p-4 px-6 shadow-md drop-shadow-md ">
              No Products Found
            </h1>
          </div>
        )}
      </Suspense>
      <button
        className="bg-emerald-400 active:bg-lime-400 px-4 py-2 text-sm md:hidden absolute bottom-8" // ProductFilter for mobile right here.
        onClick={onClick}
      >
        FILTER
      </button>
      {modal &&
        modalOpen &&
        createPortal(
          <div className="xs:block md:hidden">
            <MobileFilter onUnmount={onUnmount} />
          </div>,
          modal
        )}
    </div>
  );
};

export default memo(Products);
