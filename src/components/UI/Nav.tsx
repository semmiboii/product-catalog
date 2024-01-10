import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Nav = () => {
  return (
    <nav className="text-xl font-semibold flex h-[10vh] w-full justify-between items-center text-black">
      <h1>
        <NavLink to="/">ecommerce</NavLink>
      </h1>
      <div className="flex gap-6 items-center">
        <NavLink to="/cart" className="flex items-center gap-2">
          <FaShoppingCart /> Cart
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
