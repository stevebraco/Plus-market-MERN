import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { detailsProduct } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import FadeIn from "react-fade-in";

const ProductDetailsScreen = (props) => {
  const productId = props.match.params.id;

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, product, error } = productDetails;

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(detailsProduct(productId));
  }, [dispatch, productId]);
  return (
    <FadeIn>
      {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <p> {error} </p>
      ) : (
        <div> 
          <p>{product.name} </p>
          <img src={product.image} alt="" srcset="" />
          </div>
      )}
    </FadeIn>
  );
};

export default ProductDetailsScreen;
