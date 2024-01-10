import { RiShoppingCartLine } from "react-icons/ri";

import { ProductType } from "../Products";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { setCart } from "../../../redux/slices/cart-slice";

interface ProductCardProps {
  key: number;
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  console.log(cart);

  const handleRedirect = () => {
    navigate(`/product/${product.id}`);
  };

  const cartHandler = () => {
    dispatch(setCart(product));
  };

  return (
    <div
      key={product.id}
      className="min-h-66 flex flex-col justify-between bg-neutral-300 rounded-lg p-2 capitalize"
    >
      <div className="h-60 w-full" onClick={handleRedirect}>
        <img
          src={product.thumbnail}
          alt={product.thumbnail}
          className=" object-contain h-full w-full"
        />
      </div>
      <div className="flex justify-between py-5">
        <h3>
          {product.title.length > 10
            ? `${product.title.substring(0, 30)}...`
            : product.title.substring(0, 30)}
        </h3>
        <h3>${product.price}</h3>
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
