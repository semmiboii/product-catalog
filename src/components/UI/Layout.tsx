import { Outlet } from "react-router-dom";
import Footer from "./Footer.js";
import Nav from "./Nav.js";

const Layout = () => {
  return (
    <main className="text-black px-10 flex flex-col justify-between h-screen">
      <Nav />
      <div className="h-4/5">
        <Outlet />
      </div>
      <Footer />
    </main>
  );
};

export default Layout;
