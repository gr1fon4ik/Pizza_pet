import React from 'react';

import qs from 'qs';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import Categories from '../components/Categories';
import Sort, { sortList } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import PizzaSkeleton from '../components/PizzaBlock/PizzaSkeleton';
import Pagination from '../components/Pagination';
import { setCategoryid, setCurrentPage, setFilters } from '../redux/slices/filterSlise';
import { fetchPizzas } from '../redux/slices/pizzasSlice';

const MainPage = ({}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const activeIndexCat = useSelector((state) => state.filter.categoryId);
  const { items, status } = useSelector((state) => state.pizzas);

  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const activeIndexSort = useSelector((state) => state.filter.sort);
  const currentPage = useSelector((state) => state.filter.currentPage);
  const searchValue = useSelector((state) => state.filter.searchValue);

  const onClickCategory = (id) => {
    dispatch(setCategoryid(id));
  };

  const onChangePage = (num) => {
    dispatch(setCurrentPage(num));
  };

  const fetchPizza = async () => {
    const category = activeIndexCat > 0 ? `category=${activeIndexCat}` : '';
    const search = searchValue ? `search=${searchValue}` : '';

    dispatch(fetchPizzas({ category, search, currentPage, activeIndexSort }));
  };

  //if its not a  1-st render and we are change params, then save params to redux
  React.useEffect(() => {
    if (isMounted.current) {
      const qString = qs.stringify({
        sortProperty: activeIndexSort.sortProperty,
        category: activeIndexCat,
        currentPage,
      });
      navigate(`?${qString}`);
    }
    isMounted.current = true;
  }, [activeIndexCat, activeIndexSort, currentPage]);

  //if its not a 1-st render,then check URl an dsave it
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sort = sortList.find((obj) => obj.sortProperty === params.sortProperty);
      dispatch(setFilters({ ...params, sort }));
      isSearch.current = true;
    }
  }, []);

  //if we have params from URL and we have
  React.useEffect(() => {
    if (!isSearch.current) {
      fetchPizza();
    }
    isSearch.current = false;
    window.scrollTo(0, 0);
  }, [activeIndexCat, activeIndexSort, searchValue, currentPage]);

  const pizzas = items.map((values) => <PizzaBlock {...values} key={values.id} />);
  const skelet = [...new Array(6)].map((_, index) => <PizzaSkeleton key={index} />);

  return (
    <div className="container">
      <div className="content__top">
        <Categories value={activeIndexCat} onClickCategory={onClickCategory} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      {status === 'error' ? (
        <div className="content__error">
          <h2>Одна ошибка и ты ошибся</h2>
          <p>ауф! Я хачу питсы</p>
        </div>
      ) : (
        <div className="content__items">{status === 'loading' ? skelet : pizzas}</div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};

export default MainPage;
