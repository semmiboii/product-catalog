import CartItem from "./CartItem";

import { useSelector } from "react-redux";

import { CartState } from "../../redux/slices/cart-slice";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const cart: CartState = useSelector((state: any) => state.cart); //fetching cart-state from cart-store
  const navigate = useNavigate();

  const handleNavigateToCheckout = () => {
    navigate("/checkout"); // navigating to checkout.
  };

  return (
    <div className="w-full h-full overflow-scroll lg:grid lg:grid-cols-3 gap-10 flex flex-col">
      <div className="col-span-2 h-full w-full overflow-scroll">
        {cart.items.map(
          (
            { product, quantity } // mapping each cart-item to individual CartItem component.
          ) => (
            <CartItem product={product} key={product.id} quantity={quantity} />
          )
        )}
      </div>
      <div className="flex justify-between items-center h-20">
        <h1 className="text-2xl font-bold">
          Total - $<span>{cart.total}</span>
        </h1>
        <button
          className="md:h-20 bg-emerald-400 p-4 active:bg-lime-400"
          onClick={handleNavigateToCheckout}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;
