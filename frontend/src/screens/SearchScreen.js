import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { searchProducts } from "../actions/productActions";
import LoadingBox from "../components/LoadingBox";
import MessageBox from "../components/MessageBox";
import Product from "../components/Product";

const SearchScreen = () => {
  const { name = "all" } = useParams();
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;
  console.log(products);

  useEffect(() => {
    dispatch(searchProducts({ name: name !== 'all' ? name : '' }));
  }, [dispatch, name]);
  return (
    <section className="product">
        <div className="row">
        {loading ? (
          <LoadingBox></LoadingBox>
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <div>{products.length} Results</div>
        )}
      </div>
    {loading ? (
      <LoadingBox></LoadingBox>
    ) : error ? (
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <>
        {products.length === 0 && (
          <MessageBox>No Product Found</MessageBox>
        )}
            <div className="box-container">
          {products.map((item) => (
            <Product key={item._id} item={item}></Product>
          ))}
        </div>
      </>
    )}
  </section>
  );
};

export default SearchScreen;
