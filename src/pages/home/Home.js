import React, { useEffect } from "react";
import Product from "../../Components/product/Product";
//Home page
const Home = () => {
  const url = window.location.href;

  useEffect(() => {
    const scrollToProducts = () => {
      if (url.includes("#products")) {
        window.scrollTo({
          top: 700,
          behavior: "smooth",
        });
        return;
      }
    };
    scrollToProducts();
  }, [url]);

  return (
    <div>
      <Product />
    </div>
  );
};

export default Home;
