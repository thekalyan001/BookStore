import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  REMOVE_FROM_ENROLLED,
  SAVE_URL,
  selectCartItems,
} from "../../redux/slice/cartSlice";
import styles from "./Enrolled.module.scss";
import { FaDrupal, FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { selectIsLoggedIn } from "../../redux/slice/authSlice";

const Enrolled = () => {
  const courseItem= useSelector(selectCartItems);
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectIsLoggedIn);

  const navigate = useNavigate();

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_ENROLLED(cart));
  };

  useEffect(() => {
    dispatch(SAVE_URL(""));
  }, [courseItem, dispatch]);


  return (
    <section>
      <div className={`container ${styles.table}`}>
        <h2>Course List</h2>
        {courseItem.length === 0 ? (
          <>
            <p>Your Course list is currently empty.</p>
            <br />
            <div>
              <Link to="/#products">&larr; Continue shopping</Link>
            </div>
          </>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>s/n</th>
                  <th>Course name</th>
                  <th>Instructor</th>
                  <th>Category</th>
                  <th>Duration</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {courseItem.map((cart, index) => {
                  const { id, name, instructor, imageURL, category, duration } = cart;
                  return (
                    <tr key={id}>
                      <td>{index + 1}</td>
                      <td>
                      <Link to={`/product-details/${id}`}>
                        <p>
                          <b>{name}</b>
                        </p>
                         
                        <img
                          src={imageURL}
                          alt={name}
                          style={{ width: "100px" }}
                        />
                        </Link>
                      </td>
                      <td>{instructor}</td>
                      <td>{category}</td>
                      <td>
                      <td>{duration}</td>
                      </td>
                      <td className={styles.icons}>
                        <FaTrashAlt
                          size={19}
                          color="red"
                          onClick={() => removeFromCart(cart)}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
      </div>
    </section>
  );
};

export default Enrolled;
