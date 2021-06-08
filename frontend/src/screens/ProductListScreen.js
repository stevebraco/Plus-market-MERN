import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createProduct, listProducts } from '../actions/productActions';
import LoadingBox from '../components/LoadingBox';
import { PRODUCT_CREATE_RESET } from '../constants/productConstants';
import FadeIn from "react-fade-in";


const ProductListScreen = (props) => {
    const dispatch = useDispatch()

    const productList = useSelector((state) => state.productList);
    const { loading, error, products } = productList;

    const productCreate = useSelector((state) => state.productCreate);
    const { loading: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct } = productCreate;
    
    const createdHandler = () => {
        dispatch(createProduct())
    }

    useEffect(() => {
        if(successCreate) {
            dispatch({ type: PRODUCT_CREATE_RESET})
            props.history.push(`/product/${createdProduct._id}/edit`)
        }
        dispatch(listProducts())
    }, [dispatch, props.history, successCreate, createdProduct])

    return (
        <FadeIn>
            <h1>Products</h1>
            <button type="button" className="btn" onClick={createdHandler}>
          Create Product
        </button>

        {loadingCreate && <LoadingBox></LoadingBox>}
      {errorCreate && <p> {errorCreate} </p>}
            {loading ? (
        <LoadingBox></LoadingBox>
      ) : error ? (
        <p> {error} </p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Price</th>
              <th>Category</th>
              <th>Brand</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>{product._id}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>{product.category}</td>
                <td>{product.brand}</td>
                <td>
                  <button
                    type="button"
                    className="smaill"
                    onClick={() =>
                      props.history.push(`/product/${product._id}/edit`)
                    }
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    className="small"
                    // onClick={() => deleteHandler(product)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
        </FadeIn>
    )
}

export default ProductListScreen
