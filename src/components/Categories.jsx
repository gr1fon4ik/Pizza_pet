import React from 'react';

const Categories = ({ value, onClickCategory }) => {
  const categories = ['Все', 'Мясные', 'Вегетарианская', 'Гриль', 'Острые', 'Закрытые'];

  const categoriesComponents = categories.map((categoryName, index) => {
    return (
      <li
        onClick={() => onClickCategory(index)}
        className={value === index ? 'active' : ''}
        key={index}>
        {' '}
        {categoryName}{' '}
      </li>
    );
  });

  return (
    <div className="categories">
      <ul>{categoriesComponents}</ul>
    </div>
  );
};

export default Categories;
