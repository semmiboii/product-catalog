import { useSelector } from "react-redux";

import Products from "../products/Products.js";
import Footer from "./Footer.js";
import Nav from "./Nav.js";

const Layout = () => {
  return (
    <main className="text-black px-10 flex flex-col justify-between h-[100vh]">
      <Nav />
      <div className="h-[80vh]">
        <Products />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
