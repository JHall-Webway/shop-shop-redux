import React, 
{ useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { r_UPDATE_CATEGORIES, r_UPDATE_CURRENT_CATEGORY } from '../../utils/reducers';

import { useQuery } from '@apollo/client';
import { QUERY_CATEGORIES } from '../../utils/queries';

import { idbPromise } from '../../utils/helpers';


function CategoryMenu() {
  const categories = useSelector(({ global }) => global.categories);
  const dispatch = useDispatch();
  const { loading, data: categoryData } = useQuery(QUERY_CATEGORIES);

  const handleClick = id => {
    dispatch(r_UPDATE_CURRENT_CATEGORY(id));
  };

  useEffect(() => {
    if (categoryData) {
      dispatch(r_UPDATE_CATEGORIES(categoryData.categories));
      categoryData.categories.forEach(category => {
        idbPromise('categories', 'put', category)
      });
    } else if (!loading) {
      idbPromise('categories', 'get').then(categories => {
        dispatch(r_UPDATE_CATEGORIES(categories));
      });
    };
  }, [categoryData, dispatch, loading]);

  return (
    <div>
      <h2>Choose a Category:</h2>
      {categories.map((item) => (
        <button
          key={item._id}
          onClick={() => {
            handleClick(item._id)
          }}
        >
          {item.name}
        </button>
      ))}
    </div>
  );
}

export default CategoryMenu;
