import React from "react";
import { useDispatch, useSelector} from "react-redux";
import { Link } from "react-router-dom";
import {
  ADD_TO_ENROLL,
  selectCartItems
} from "../../../redux/slice/cartSlice";
import Card from "../../card/Card";
import styles from "./ProductItem.module.scss";

const ProductItem = ({ product, grid, id, name, duration, desc, imageURL}) => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };

  const addToCart = (product) => {
    dispatch(ADD_TO_ENROLL(product));
  };

  // return -1 in case not found
  const isEnrollAdded = cartItems.findIndex((cart) => {
    return cart.id === id;
  });

  return (
    <Card cardClass={grid ? `${styles.grid}` : `${styles.list}`}>
      <Link to={`/product-details/${id}`}>
        <div className={styles.img}>
          <img src={imageURL} alt={name} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
        <p style={{ fontWeight: '500', color: 'orangered' }}>{duration}</p>
          <h4>{name}</h4>
          <p>{shortenText(desc, 25)}</p><br/>
        </div>
        {!grid && <p className={styles.desc}>{shortenText(desc, 200)}</p>}

        <button
          className="--btn --btn-primary"
          onClick={() => addToCart(product)}
        >
          {isEnrollAdded?"Enroll course":"Enrolled"}
        </button>
      </div>
    </Card>
  );
};

export default ProductItem;
