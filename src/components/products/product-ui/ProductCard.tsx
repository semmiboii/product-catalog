import { RiShoppingCartLine } from "react-icons/ri";

import { ProductType } from "../Products";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { addToCart } from "../../../redux/slices/cart-slice";
import { FaStar } from "react-icons/fa";

interface ProductCardProps {
  key: number;
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleRedirect = () => {
    navigate(`/product/${product.id}`);
  };

  const cartHandler = () => {
    dispatch(addToCart(product));
  };

  return (
    <div
      key={product.id}
      className="h-66 flex flex-col justify-between bg-neutral-300 rounded-lg p-2 capitalize"
    >
      <div className="h-full w-full" onClick={handleRedirect}>
        <img
          src={product.thumbnail}
          alt={product.thumbnail}
          className=" object-cover h-full w-full"
        />
      </div>
      <div className="flex justify-between items-center py-5">
        <h3 className="bg-emerald-400 px-4 py-1 rounded-md">
          {product.title.length > 10
            ? `${product.title.substring(0, 30)}...`
            : product.title.substring(0, 30)}
        </h3>
        <span className="flex items-center gap-2 bg-green-400 px-4 py-1 rounded-md">
          <FaStar/>
          {product.rating}
        </span>
        <h3 className="bg-amber-400 px-4 py-1 rounded-md">${product.price}</h3>
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
