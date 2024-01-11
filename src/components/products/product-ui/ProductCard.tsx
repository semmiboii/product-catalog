import { RiShoppingCartLine } from "react-icons/ri";

import { ProductType } from "./Products";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../../../redux/slices/cart-slice";
import { FaStar } from "react-icons/fa";

interface ProductCardProps {
  // creating interface for props of product-card
  key: number;
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRedirect = () => {
    navigate(`/product/${product.id}`); // on-click a item from the products navigate to the individual product-page.
  };

  const cartHandler = () => {
    dispatch(addToCart(product)); //  dispatching addToCart function from the products page
  };

  return (
    <div
      key={product.id}
      className=" h-max relative inline-flex flex-col bg-[#AAD7D9] rounded-lg p-2 capitalize"
    >
      <div
        className=" h-60 w-full flex items-center justify-center"
        onClick={handleRedirect}
      >
        <img
          src={product.thumbnail}
          alt={product.thumbnail}
          className=" object-cover h-full w-full rounded-md"
        />
      </div>
      <h3 className="bg-emerald-400 px-4 py-1 mt-2 rounded-md">
        {product.title.length > 30
          ? `${product.title.substring(0, 30)}...`
          : product.title}
      </h3>
      <div className="grid grid-cols-2 gap-2 justify-between items-center py-5">
        <span className="flex items-center justify-center gap-2 bg-green-500 px-4 py-1 rounded-md">
          <FaStar />
          {product.rating}
        </span>
        <h3 className="bg-amber-400 px-4 py-1 rounded-md flex justify-center">
          ${product.price}
        </h3>
      </div>
      <button
        className="flex w-full items-center justify-center gap-4 bg-white py-2 rounded-lg active:bg-emerald-300"
        onClick={cartHandler}
      >
        Add to Cart
        <RiShoppingCartLine />
      </button>
    </div>
  );
};

export default ProductCard;
