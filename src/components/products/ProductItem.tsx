import axios from "axios";

import { useLoaderData } from "react-router-dom";
import { ProductType } from "./Products";

import { FaRegStar, FaShoppingBasket } from "react-icons/fa";
import { Carousel } from "react-responsive-carousel";

import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/slices/cart-slice";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const ProductItem = () => {
  const product = useLoaderData() as ProductType;
  console.log(product); 

  const dispatch = useDispatch();

  const handleCart = () => {
    dispatch(addToCart(product));
  };

  return (
    product && (
      <div className="h-full w-full flex lg:flex-row flex-col gap-10 overflow-scroll relative">
        <div className="w-full">
          <Carousel>
            {product.images.map((image) => (
              <div key={image} className=" md:h-72 lg:h-96">
                <img src={image} className="object-contain h-full" />
              </div>
            ))}
          </Carousel>
        </div>
        <div className="w-full pt-5 flex flex-col gap-5">
          <div className="flex flex-col gap-10">
            <div className="flex gap-10 flex-col md:flex-row">
              <h1 className="text-4xl font-black flex justify-center items-center">
                {product.title}
              </h1>
              <div className="flex justify-between md:flex-row md:gap-5">
                <span className="flex items-center gap-2 bg-green-400 p-4 rounded-md">
                  {product.rating} <FaRegStar />
                </span>
                <span className="text-md font-normal bg-black text-white px-6 py-2 rounded-md flex justify-center items-center">
                  Brand - {product.brand}
                </span>
              </div>
              <span className="text-end flex items-center justify-center bg-lime-400 p-4 rounded-md">
                {product.category}
              </span>
            </div>
            <span className="w-auto text-xl font-semibold bg-emerald-400 p-4 rounded-md">
              {product.description}
            </span>
          </div>
          <div className="flex gap-4">
            <span className="text-2xl text-teal-600  border-2 border-teal-600 w-auto text-center rounded-md p-4">
              $ {product.price}
            </span>
            <span className="text-lg text-gray-600 flex items-center justify-center">
              - {product.discountPercentage} %
            </span>
            <span className="text-xl flex items-center justify-center bg-amber-300 p-4 rounded-md">
              stock - {product.stock}
            </span>
          </div>
          <button
            className="bg-neutral-300 p-5 rounded-md flex md:w-full items-center justify-center gap-4 active:bg-lime-300"
            onClick={handleCart}
          >
            ADD TO CART <FaShoppingBasket size="20px" />
          </button>
        </div>
      </div>
    )
  );
};

export async function loader({ request, params }: string | any) {
  console.log(request);
  
  const { productID } = params;
  const res = await axios.get(`https://dummyjson.com/products/${productID}`);
  const data = await res.data;
  return data;
}

export default ProductItem;
