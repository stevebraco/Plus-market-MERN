import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct, updateProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import { PRODUCT_UPDATE_RESET } from "../constants/productConstants";
import Axios from 'axios'
import FadeIn from "react-fade-in";


const ProductEditScreen = (props) => {
  const productId = props.match.params.id;
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState("");

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productCreate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;
  console.log(productUpdate);

  const dispatch = useDispatch();

  useEffect(() => {
    if (successUpdate) {
      props.history.push("/productlist");
    }
    if (!product || product._id !== productId || successUpdate) {
      dispatch({ type: PRODUCT_UPDATE_RESET });
      dispatch(detailsProduct(productId));
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setCategory(product.category);
      setCountInStock(product.countInStock);
    }
  }, [dispatch, product, productId, successUpdate, props.history]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        category,
        countInStock,
      })
    );
  };
  const [loadingUpload, setLoadingUpload] = useState(false);
  const [errorUpload, setErrorUpload] = useState('');

  const userSignin = useSelector((state) => state.userSignin);
  const { userInfo } = userSignin;

  const uploadFileHandler = async (e) => {
    const file = e.target.files[0];
    const bodyFormData = new FormData();
    bodyFormData.append('image', file);
    setLoadingUpload(true);
    try {
      const { data } = await Axios.post('/api/uploads/s3', bodyFormData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${userInfo.token}`,
        },
      });
      setImage(data);
      setLoadingUpload(false);
    } catch (error) {
      setErrorUpload(error.message);
      setLoadingUpload(false);
    }
  };

  return (
    <FadeIn>
      <form className="form" onSubmit={submitHandler}>
        <div>
          <h1 className="heading">Edit {productId} </h1>
        </div>
        {loadingUpdate && <LoadingBox></LoadingBox>}
        {errorUpdate && <p> {errorUpdate} </p>}
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <p> {error} </p>
        ) : (
          <>
            <div className="form__group">
              <label htmlFor="email">name</label>
              <input
                type="text"
                placeholder="Enter Name"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="form__group">
              <label htmlFor="email">price</label>
              <input
                type="text"
                placeholder="Enter Email"
                id="price"
                value={price}
                required
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div className="form__group">
              <label htmlFor="image">Image</label>
              <input
                id="image"
                type="text"
                placeholder="Enter image"
                value={image}
                onChange={(e) => setImage(e.target.value)}
              ></input>
            </div>
            <div className="form__group">
              <label htmlFor="imageFile">Image File</label>
              <input
                id="imageFile"
                type="file"
                placeholder="choose image"
                onChange={uploadFileHandler}
              ></input>
               {loadingUpload && <LoadingBox></LoadingBox>}
              {errorUpload && (
                <p>{errorUpload}</p>
              )}
            </div>
            <div className="form__group">
              <label htmlFor="email">count in stock</label>
              <input
                type="text"
                placeholder="Enter count in stock"
                id="price"
                value={countInStock}
                required
                onChange={(e) => setCountInStock(e.target.value)}
              />
            </div>
            <div className="form__group">
              <label htmlFor="email">category</label>
              <input
                type="text"
                placeholder="Enter Category"
                id="price"
                value={category}
                required
                onChange={(e) => setCategory(e.target.value)}
              />
            </div>

            <button className="btn" type="submit">
                Update
              </button>
            
          </>
        )}
      </form>
    </FadeIn>
  );
};

export default ProductEditScreen;
