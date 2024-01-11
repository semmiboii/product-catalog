import { NavLink } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";

const Nav = () => {
  return (
    <nav className="text-xl font-semibold flex h-[10vh] w-full justify-between items-center text-black">
      <h1 className=" hover:text-[#92C7CF] transition-colors">
        <NavLink to="/">ecommerce</NavLink>
      </h1>
      <div className="flex gap-6 items-center hover:text-[#92C7CF] transition-colors">
        <NavLink to="/cart" className="flex items-center gap-2">
          <FaShoppingCart />
        </NavLink>
      </div>
    </nav>
  );
};

export default Nav;
