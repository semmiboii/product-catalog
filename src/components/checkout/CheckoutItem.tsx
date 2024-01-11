import { ProductType } from "../products/product-ui/Products";

interface CheckoutItemProps {
  type?: string;
  total?: number;
  product?: ProductType;
  quantity?: number;
}

const CheckoutItem: React.FC<CheckoutItemProps> = ({
  product,
  quantity,
  type,
  total,
}) => {
  return (
    <>
      {type !== "total" && (
        <div className="bg-gray-200 my-2 shadow-md drop-shadow-md p-4">
          <div className="grid grid-cols-3 place-items-center ">
            <h1 className="text-center bg-lime-300 p-2 py-3 w-full">
              {product?.title}
            </h1>
            <span className="text-center">Quantity - {quantity}</span>
            <span className="text-center">$ {product?.price}</span>
          </div>
        </div>
      )}
      {type === "total" && (
        <div className="bg-gray-200 my-2 shadow-md drop-shadow-md p-4">
          <div className="grid grid-cols-3 place-items-center ">
            <h1 className="text-center bg-blue-400 p-2 py-3 w-full col-start-1 col-end-1">
              Total
            </h1>
            <span className="text-center col-start-3 col-end-3 text-2xl font-bold">
              $ {total}
            </span>
          </div>
        </div>
      )}
    </>
  );
};

export default CheckoutItem;
