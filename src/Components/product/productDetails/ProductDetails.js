import styles from "./ProductDetails.module.scss";

import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import spinnerImg from "../../../Assets/spinner.png"

import { useDispatch, useSelector } from "react-redux";
import {
  ADD_TO_ENROLL,
  selectCartItems,
} from "../../../redux/slice/cartSlice";
import useFetchDocument from "../../../customHooks/useFetchDocument";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const { document } = useFetchDocument("products", id);

  const cart = cartItems.find((cart) => cart.id === id);

  // return -1 in case not found
  const isEnrollAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  

  useEffect(() => {
    setProduct(document);
  }, [document]);

  const addToEnroll = (product) => {
    dispatch(ADD_TO_ENROLL(product));
  };

  /**
   * @name kalyan mishra
   * @date 04-11-23
   * @description clicking on any product will show detailed view of course
   */
  return (
    <section>
      <div className={`container ${styles.product}`}>
        <h2>Product Details</h2>
        <div>
          <Link to="/#products">&larr; Back To Products</Link>
        </div>
        {product === null ? (
          <img src={spinnerImg} alt="Loading" style={{ width: "50px" }} />
        ) : (
          <>
            <div className={styles.details}>
              <div className={styles.img}>
                <img src={product.imageURL} alt={product.name} />
              </div>
              <div className={styles.content}>
                <h3>{product.name}</h3>
                <p className={styles.duration}> <b>Duration </b>{product.duration}</p>
                
                {/* if enrolled then show in progress else show open or close */}
                <p>
                  <b>Status: </b> {isEnrollAdded ?product.status : "In Progress"}
                </p>
                <p>
                  <b>Instructor: </b> {product.instructor}
                </p>

                <p>
                  <b>Location</b> {product.location}
                </p>

                <p> <b>Description </b>{product.desc}</p>
         
                <button
                  className="--btn --btn-primary"
                  onClick={() => addToEnroll(product)}
                >
                  {isEnrollAdded?"Enroll course":"Enrolled"}
                  
                </button>

              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductDetails;
