import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { r_UPDATE_PRODUCTS } from '../../utils/reducers';

import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';

import { idbPromise } from '../../utils/helpers';

import ProductItem from '../ProductItem';
import spinner from '../../assets/spinner.gif';

function ProductList() {
  const products = useSelector(({ global }) => global.products);
  const currentCategory = useSelector(({ global }) => global.currentCategory)
  const reduxDispatch = useDispatch();
  const { loading, data } = useQuery(QUERY_PRODUCTS);
  useEffect(() => {
    if (data) {
      reduxDispatch(r_UPDATE_PRODUCTS(data.products))
      data.products.forEach(product => {
        idbPromise('products', 'put', product);
      });
    } else if (!loading) {
      idbPromise('products', 'get').then(products => {
        reduxDispatch(r_UPDATE_PRODUCTS(products))
      })
    };
  }, [data, loading, reduxDispatch]);
  function filterProducts() {
    if (!currentCategory) {
      return products;
    }
    return products.filter(product => product.category._id === currentCategory)
  };
  return (
    <div className="my-2">
      <h2>Our Products:</h2>
      {products.length ? (
        <div className="flex-row">
          {filterProducts().map((product) => (
            <ProductItem
              key={product._id}
              _id={product._id}
              image={product.image}
              name={product.name}
              price={product.price}
              quantity={product.quantity}
            />
          ))}
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
