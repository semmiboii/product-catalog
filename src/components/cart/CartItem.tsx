import { FaMinus, FaPlus } from "react-icons/fa";

import { CartItem, addToCart, removeFromCart } from "../../redux/slices/cart-slice";
import { useDispatch } from "react-redux";


const CartItem: React.FC<CartItem> = ({ product, quantity }) => {  
  const dispatch = useDispatch();

  return (
    <div className="grid grid-cols-3 border-2 border-emerald-400 mt-0 my-4 rounded-lg overflow-hidden gap-5">
      <div className="w-auto p-4 flex items-center">
        <img
          src={product.thumbnail}
          alt={product.title}
          className="h-32 w-52 object-contain"
        />
      </div>
      <div className="flex items-start flex-col w-full pt-5">
          <h4 className="bg-emerald-500 p-2 px-4 rounded-md mt-2 inline-block">
            {product.title}
          </h4>
          <h5 className="bg-lime-400 p-2 px-4 rounded-md mt-2 inline-block">
            STOCK - <span className="font-semibold text-lg">{product.stock}</span>
          </h5>
      </div>
        <div className="flex flex-col items-end justify-between py-10 pr-5">
          <code className="bg-amber-500 p-2 mr-2 rounded-md">
            $ {product.price}
          </code>
          <div className="flex justify-between bg-gray-300 mt-10 mr-2 w-20 rounded-sm overflow-hidden">
            <span
             className="bg-gray-500 flex justify-center items-center px-1 py-1"
             onClick = {() => dispatch(removeFromCart(product.id))}
            >
              <FaMinus />
            </span>
            <span>{quantity}</span>
            <span
              className="bg-gray-500 flex justify-center items-center px-1 py-1"
              onClick={() => dispatch(addToCart(product))}
            >
              <FaPlus />
            </span>
          </div>
      </div>
    </div>
  );
};

export default CartItem;
