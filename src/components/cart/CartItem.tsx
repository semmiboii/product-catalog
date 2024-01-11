import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
  CartItem as CartItemType,
  addToCart,
  removeFromCart,
} from "../../redux/slices/cart-slice";

import { FaMinus, FaPlus } from "react-icons/fa";

const CartItem: React.FC<CartItemType> = ({ product, quantity }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (
    <div className="md:grid md:grid-cols-3 flex flex-col border-2 bg-gray-300 mt-0 my-4 border-none outline-none shadow-md drop-shadow-md  overflow-hidden gap-5">
      <div
        className="md:w-auto h-32 w-full p-4 flex items-center md:justify-start justify-center overflow-hidden"
        onClick={() => {
          navigate(`/product/${product.id}`); //navigating to individual-product.
        }}
      >
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-full w-full object-contain"
        />
      </div>
      <div className="flex md:justify-center md:items-start items-center flex-col w-full md">
        <h4 className="bg-neutral-400 md:p-2 px-10 py-2 mx-2 md:mx-0 rounded-md md:inline-block w-auto text-center">
          {product.title}
        </h4>
        <h5 className="bg-lime-400 p-2 px-4 rounded-md mt-2 inline-block">
          {product.stock > 0 ? "In-Stock" : "Out-of-Stock"}
        </h5>
      </div>
      <div className="md:flex md:flex-col md:col-span-1 col-span-2 items-end justify-between my-5 mx-4 ">
        <div className="flex md:items-center justify-between h-full flex-row-reverse gap-5 col-span-2 w-full">
          <span className="bg-amber-500 p-2 px-4 rounded-md">
            $ {product.price}
          </span>
          <span className="bg-blue-300 flex items-center justify-center px-4 p-2 rounded-md">
            - {product.discountPercentage}%
          </span>
        </div>
        <div className="flex justify-between items-center bg-slate-400 md:w-24 w-full rounded-sm overflow-hidden md:mt-0 mt-5 ">
          <span
            className="bg-gray-500 flex justify-center items-center px-1 py-1"
            onClick={() => dispatch(removeFromCart(product.id))} //dispatching removeFromCart action to decrease or completely remove the item from cart.
          >
            <FaMinus />
          </span>
          <span>{quantity}</span>
          <span
            className="bg-gray-500 flex justify-center items-center px-1 py-1"
            onClick={() => dispatch(addToCart(product))} //dispatching addToCart action to increase or addItem to the cart.
          >
            <FaPlus />
          </span>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
