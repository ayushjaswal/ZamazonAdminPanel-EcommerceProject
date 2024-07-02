import React from "react";
import { store } from "./store/store.ts";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import "./index.css";
import Dashboard from "./Dashboard/Dashboard.tsx";
import Products from "./Products/Products.tsx";
import Orders from "./Orders/Orders.tsx";
import Categories from "./Categories/Categories.tsx";
import Settings from "./Auth/Settings/Settings.tsx";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ProtectedRoute from "./ProtectedRoute.tsx";
import Login from "./Auth/Login.tsx";
import NewProduct from "./Products/New Product/NewProduct.tsx";
import EditProduct from "./Products/Edit Product/EditProduct.tsx";
import EditCategory from "./Categories/Edit Category/EditCategory.tsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <App />,
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />,
      </ProtectedRoute>
    ),
  },
  {
    path: "products",
    element: (
      <ProtectedRoute>
        <Products />,
      </ProtectedRoute>
    ),
  },
  {
    path: "orders",
    element: (
      <ProtectedRoute>
        <Orders />,
      </ProtectedRoute>
    ),
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "categories",
    element: (
      <ProtectedRoute>
        <Categories />,
      </ProtectedRoute>
    ),
  },
  {
    path: "settings",
    element: (
      <ProtectedRoute>
        <Settings />
      </ProtectedRoute>
    ),
  },
  {
    path: "products/newproduct",
    element: (
      <ProtectedRoute>
        <NewProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "products/editproduct/:id",
    element: (
      <ProtectedRoute>
        <EditProduct />
      </ProtectedRoute>
    ),
  },
  {
    path: "categories/edit-category/:id",
    element: (
      <ProtectedRoute>
        <EditCategory />
      </ProtectedRoute>
    ),
  },
]);
const googleClientId = process.env.REACT_APP_OAUTH_CLIENT_ID!;
function App() {
  return (
    <React.StrictMode>
      <GoogleOAuthProvider clientId={googleClientId}>
        <Provider store={store}>
          <RouterProvider router={router} />
        </Provider>
      </GoogleOAuthProvider>
    </React.StrictMode>
  );
}

export default App;
