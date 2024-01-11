import { Suspense, lazy, useState } from "react";
import { useSelector } from "react-redux";

import { CartState } from "../../redux/slices/cart-slice";
import { Reducers } from "../../redux/store";
import CheckoutItem from "./CheckoutItem";
import CheckoutModal from "./CheckoutModal";
import { createPortal } from "react-dom";

const CheckoutForm = lazy(() => import("./CheckoutForm"));

const Checkout = () => {
  const cart: CartState = useSelector((state: Reducers) => state.cart);

  const [modal, setModal] = useState(false);

  const modalElement = document.getElementById("modal");

  const onClick = () => {
    setModal(true);
  };

  const onUnmount = () => {
    setModal(false);
  };

  return (
    <div className="h-full overflow-scroll">
      <div className="mb-10">
        {cart.items.map(({ product, quantity }) => (
          <CheckoutItem
            product={product}
            quantity={quantity}
            key={product.id}
          />
        ))}
        <CheckoutItem type={"total"} total={cart.total} />
      </div>
      <Suspense fallback={<h1>Loading...</h1>}>
        <CheckoutForm onClick={onClick} />
      </Suspense>
      {modalElement &&
        modal &&
        createPortal(<CheckoutModal onUnmount={onUnmount} />, modalElement)}
    </div>
  );
};

export default Checkout;
