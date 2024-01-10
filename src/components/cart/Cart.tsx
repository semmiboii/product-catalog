import CartItem from "./CartItem";

import { useSelector } from "react-redux";

import { CartState } from "../../redux/slices/cart-slice";

const Cart = () => {
  const cart: CartState = useSelector((state: any) => state.cart);

  return (
    <div className="w-full h-full overflow-scroll grid grid-cols-3 gap-10">
      <div className="col-span-2 h-full overflow-scroll">
        {cart.items.map(({product, quantity}) => (
          <CartItem product={product} key={product.id} quantity={quantity}/>
        ))}
      </div>
      <div>Checkout Options</div>
    </div>
  );
};

export default Cart;
