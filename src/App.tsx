import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";

import store from "./redux/store";

import Layout from "./components/UI/Layout";
import Products from "./components/products/Products";
import Cart from "./components/cart/Cart";
import ProductItem, {
  loader as productItemLoader,
} from "./components/products/ProductItem";

import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

import "./App.css";

const queryClient = new QueryClient();

let persistor = persistStore(store);

const router = createBrowserRouter([
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
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <PersistGate persistor={persistor}>
          <RouterProvider router={router}></RouterProvider>
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  );
}

export default App;
