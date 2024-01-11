import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import { Toaster } from "react-hot-toast";

import store from "./redux/store";

import Layout from "./components/UI/Layout";
import Products from "./components/products/product-ui/Products";
import Cart from "./components/cart/Cart";
import Checkout from "./components/checkout/Checkout";
import ProductItem, {
  loader as productItemLoader,
} from "./components/products/product-ui/ProductItem";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import "./App.css";

// --------------------------------------------------------------------------------------

const queryClient = new QueryClient(); // queryClient object made for react-query.
let persistor = persistStore(store); // persistor to persist the redux-store.

const router = createBrowserRouter([
  // browser-router to define app-routes.
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Products />,
      },
      {
        path: "/product/:productID",
        loader: productItemLoader,
        element: <ProductItem />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
    ],
  },
]);

// passing providers and persistGate for access to the information of the react-router and react-persist.
function App() {
  return (
    <>
      <Toaster position="bottom-right" reverseOrder={false} />
      <QueryClientProvider client={queryClient}>
        <Provider store={store}>
          <PersistGate persistor={persistor}>
            <RouterProvider router={router}></RouterProvider>
          </PersistGate>
        </Provider>
      </QueryClientProvider>
    </>
  );
}

export default App;
