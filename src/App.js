import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import Dashboard from "./components/admin/Dashboard";
import Profile from "./components/admin/Profile";
import Category from "./components/admin/category/Category";
import ViewCategory from "./components/admin/category/ViewCategory";
import EditCategory from "./components/admin/category/EditCategory";
import EditProduct from "./components/admin/product/EditProduct";
import AddProduct from "./components/admin/product/AddProduct";
import ViewProduct from "./components/admin/product/ViewProduct";
import Login from "./components/frontend/auth/Login";
import Register from "./components/frontend/auth/Register";
import Home from "./components/frontend/Home";
import MasterLayout from "./layouts/admin/MasterLayout";
import axios from "axios";
import About from "./components/frontend/About";
import Contact from "./components/frontend/Contact";
import CollectionCategory from "./components/frontend/collections/CollectionCategory";
import CollectionProduct from "./components/frontend/collections/CollectionProduct";

axios.defaults.baseURL = "http://localhost:8000/";
axios.defaults.headers.common["X-CSRF-TOKEN"] =
  localStorage.getItem("auth_token");

axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

// axios.defaults.withCredentials = true;
// axios.interceptors.request.use(function (config) {
//   const token = localStorage.getItem("auth_token");
//   config.headers.Authorization = token ? `Bearer ${token}` : "";
// });

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/">
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/collection/" element={<CollectionCategory />} />
          <Route path="/collection/:slug" element={<CollectionProduct />} />
        </Route>

        <Route
          path="/login"
          element={
            localStorage.getItem("auth_token") ? <Navigate to="/" /> : <Login />
          }
        />
        <Route
          path="/register"
          element={
            localStorage.getItem("auth_token") ? (
              <Navigate to="/" />
            ) : (
              <Register />
            )
          }
        />
        <Route
          path="/admin"
          element={
            localStorage.getItem("auth_token") ? <MasterLayout /> : <Register />
          }
        >
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/profile" element={<Profile />} />

          <Route path="/admin/add-category" element={<Category />} />
          <Route path="/admin/view-category" element={<ViewCategory />} />
          <Route path="/admin/edit-category/:id" element={<EditCategory />} />

          <Route path="/admin/add-product" element={<AddProduct />} />
          <Route path="/admin/view-product" element={<ViewProduct />} />
          <Route path="/admin/edit-product/:id" element={<EditProduct />} />
        </Route>
        <Route
          path="/admin/"
          element={<Navigate to="/admin/dashboard" replace />}
        />
      </Routes>
    </div>
  );
}

export default App;
