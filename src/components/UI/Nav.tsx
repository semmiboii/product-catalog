import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { createPortal } from "react-dom";
import Cart from "../cart/Cart";

const Nav = () => {
  return (
    <nav className="text-xl font-semibold flex h-[10vh] w-full justify-between items-center text-black">
      <h1>
        <NavLink to="/">ecommerce</NavLink>
      </h1>
      <div className="flex gap-6 items-center">
        <NavLink to="/catalog">catalog</NavLink>
        <NavLink to="/cart">
          <FaShoppingCart />
        </NavLink>
        <NavLink to="/user">user</NavLink>
      </div>
    </nav>
  );
};

export default Nav;
