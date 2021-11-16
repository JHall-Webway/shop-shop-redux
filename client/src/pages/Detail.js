import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import {
  r_UPDATE_PRODUCTS,
  r_UPDATE_CART_QUANTITY,
  r_ADD_TO_CART,
  r_REMOVE_FROM_CART
} from '../utils/reducers';

import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../utils/queries';

import { idbPromise } from '../utils/helpers';

import Cart from '../components/Cart';
import spinner from '../assets/spinner.gif';

function Detail() {
  const { products, cart } = useSelector(({ global }) => global)
  const dispatch = useDispatch();
  const { id } = useParams();
  const [currentProduct, setCurrentProduct] = useState({});
  const { loading, data } = useQuery(QUERY_PRODUCTS);

  useEffect(() => {
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    } else if (data) {
      dispatch(r_UPDATE_PRODUCTS(data.products));

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch(r_UPDATE_PRODUCTS(indexedProducts));
      });
    };
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch(r_UPDATE_CART_QUANTITY({ _id: id, quantity: parseInt(itemInCart.purchaseQuantity) + 1 }));
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch(r_ADD_TO_CART({ ...currentProduct, purchaseQuantity: 1 }));
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1});
    }
  };
  const removeFromCart = () => {
    dispatch(r_REMOVE_FROM_CART(currentProduct._id));
    idbPromise('cart', 'delete', { ...currentProduct });
  };
  return (
    <>
      {currentProduct ? (
        <div className="container my-1">
          <Link to="/">← Back to Products</Link>

          <h2>{currentProduct.name}</h2>

          <p>{currentProduct.description}</p>

          <p>
            <strong>Price:</strong>${currentProduct.price}{' '}
            <button onClick={addToCart}>Add to Cart</button>
            <button
            disabled={!cart.find(p => p._id === currentProduct._id)}
            onClick={removeFromCart}
            >Remove from Cart</button>
          </p>

          <img
            src={`/images/${currentProduct.image}`}
            alt={currentProduct.name}
          />
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
      <Cart />
    </>
  );
}

export default Detail;
