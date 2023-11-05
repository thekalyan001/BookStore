import React from "react";
import { Route, Routes } from "react-router-dom";
import AddProduct from "../../Components/admin/addProduct/AddProduct";
import Navbar from "../../Components/admin/navbar/Navbar";
import ViewProducts from "../../Components/admin/viewProducts/ViewProducts";

import styles from "./Admin.module.scss";

const Admin = () => {
  return (
    <div className={styles.admin}>
      <div className={styles.navbar}>
        <Navbar />
      </div>
      <div className={styles.content}>
        <Routes>
          <Route path="all-products" element={<ViewProducts />} />
          <Route path="add-product/:id" element={<AddProduct />} />
        </Routes>
      </div>
    </div>
  );
};

export default Admin;
