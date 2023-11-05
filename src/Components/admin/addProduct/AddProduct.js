import { addDoc, collection, doc, setDoc, Timestamp } from "firebase/firestore";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { db, storage } from "../../../firebase/config";
import Card from "../../card/Card";
import Loader from "../../loader/Loader";
import styles from "./AddProduct.module.scss";
import { selectProducts } from "../../../redux/slice/productSlice";
import { selectEmail, selectUserName } from "redux/slice/authSlice";

const categories = [
  { id: 1, name: "Development" },
  { id: 2, name: "Business" },
  { id: 3, name: "Environment" },
  { id: 4, name: "Fashion" },
  { id: 5, name: "Marketing" },
  { id: 6, name: "Music" },
];
const course_status = [
  { id: 1, name: "Open" },
  { id: 2, name: "Closed" },
  { id: 3, name: "In Progress" },
];
const initialState = {
  name: "",
  imageURL: "",
  duration: 0,
  category: "",
  status: "",
  instructor: "",
  desc: "",
  location: "",
};

const AddProduct = () => {
  const { id } = useParams();
  const products = useSelector(selectProducts);

  const productEdit = products.find((item) => item.id === id);
  console.log(productEdit);

  const [product, setProduct] = useState(() => {
    const newState = detectForm(id, { ...initialState }, productEdit);
    return newState;
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const ImgInputRef = useRef(null); //image file

  function detectForm(id, f1, f2) {
    if (id === "ADD") {
      return f1;
    }
    return f2;
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };


  const handleImageChange = async (e) => {
    const file = e.target.files[0];

    const storageRef = ref(storage, `eshop/${Date.now()}${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        alert(error.message);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setProduct({ ...product, imageURL: downloadURL });
          alert("Image uploaded successfully.");
        });
      }
    );
  };

  const addProduct = (e) => {
    e.preventDefault();
    // console.log(product);
    setIsLoading(true);

    try {
      const docRef = addDoc(collection(db, "products"), {
        name: product.name,
        imageURL: product.imageURL,
        duration: product.duration,
        category: product.category,
        status: product.status,
        instructor: product.instructor,
        desc: product.desc,
        location: product.location,
        createdAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      setUploadProgress(0);
      setProduct({ ...initialState });

      alert("Product uploaded successfully.");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };

  const editProduct = (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (product.imageURL !== productEdit.imageURL) {
      const storageRef = ref(storage, productEdit.imageURL);
      deleteObject(storageRef);
    }

    try {
      setDoc(doc(db, "products", id), {
        name: product.name,
        imageURL: product.imageURL,
        duration: product.duration,
        category: product.category,
        status: product.status,
        instructor: product.instructor,
        desc: product.desc,
        location: product.location,
        createdAt: productEdit.createdAt,
        editedAt: Timestamp.now().toDate(),
      });
      setIsLoading(false);
      alert("Product Edited Successfully");
      navigate("/admin/all-products");
    } catch (error) {
      setIsLoading(false);
      alert(error.message);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.product}>
        <h2>{detectForm(id, "Add New Course", "Edit Course")}</h2>
        <Card cardClass={styles.card}>
          <form onSubmit={detectForm(id, addProduct, editProduct)}>
            <label>Product name:</label>
            <input
              type="text"
              placeholder="Course name"
              required
              name="name"
              value={product.name}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Instructor Name:</label>
            <input
              type="text"
              placeholder="Instructor name"
              required
              name="instructor"
              value={product.instructor}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Course Category:</label>
            <select
              required
              name="category"
              value={product.category}
              onChange={(e) => handleInputChange(e)}
            >
              <option
                value=""
                disabled
              >
                -- choose product category --
              </option>
              {categories.map((cat) => {
                return (
                  <option
                    key={cat.id}
                    value={cat.name}
                  >
                    {cat.name}
                  </option>
                );
              })}
            </select>

            <label>Course Status:</label>
            <select
              required
              name="status"
              value={product.status}
              onChange={(e) => handleInputChange(e)}
            >
              <option
                value=""
                disabled
              >
                -- choose product category --
              </option>
              {course_status.map((cat) => {
                return (
                  <option
                    key={cat.id}
                    value={cat.name}
                  >
                    {cat.name}
                  </option>
                );
              })}
            </select>


            <label>Product image:</label>
            <Card cardClass={styles.group}>
              {uploadProgress === 0 ? null : (
                <div className={styles.progress}>
                  <div
                    className={styles["progress-bar"]}
                    style={{ width: `${uploadProgress}%` }}
                  >
                    {uploadProgress < 100
                      ? `Uploading ${uploadProgress}`
                      : `Upload Complete ${uploadProgress}%`}
                  </div>
                </div>
              )}

              <input
                type="file"
                accept="image/*"
                placeholder="Product Image"
                name="image"
                required
                ref={ImgInputRef}
                onChange={(e) => handleImageChange(e)}
              />

              {product.imageURL === "" ? null : (
                <input
                  type="text"
                  // required
                  placeholder="Image URL"
                  name="imageURL"
                  value={product.imageURL}
                  disabled
                />
              )}
            </Card>

            <label>Course Duration:</label>
            <input
              type="text"
              placeholder="Course Duration"
              required
              name="duration"
              value={product.duration}
              onChange={(e) => handleInputChange(e)}
            />
            
            <label>Course Location:</label>
            <input
              type="text"
              placeholder="Course location"
              required
              name="location"
              value={product.location}
              onChange={(e) => handleInputChange(e)}
            />

            <label>Product Description</label>
            <textarea
              name="desc"
              required
              value={product.desc}
              onChange={(e) => handleInputChange(e)}
              cols={30}
              rows={10}
            ></textarea>

            <button className="--btn --btn-primary">
              {detectForm(id, "Save Product", "Edit Product")}
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default AddProduct;
