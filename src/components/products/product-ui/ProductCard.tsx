import { RiShoppingCartLine } from "react-icons/ri";
import { ProductType } from "../Products";

interface ProductCardProps {
  key: number;
  product: ProductType;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div
      key={product.id}
      className="min-h-66 flex flex-col justify-between bg-neutral-300 rounded-lg p-2 capitalize"
    >
      <div className="h-40 w-full">
        <img
          src={product.images[0]}
          alt={product.images[0]}
          className=" object-contain h-40 w-full"
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
      <button className="flex w-full items-center justify-center gap-4 bg-white py-2 rounded-lg active:bg-emerald-300">
        Add to Cart
        <RiShoppingCartLine />
      </button>
    </div>
  );
};

export default ProductCard;
