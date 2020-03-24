import { createStore } from 'redux';
import { TOUCH, NEW_FAVORITE, SEARCH_NEW_DATA, ADMOB } from './types';
import memeList from '~/utils/memeList';

const initialState = {
  touch: 0,
  favorite: { number: 0, isIncremented: false },
  memeList,
  adMobHeight: 0
};

function addTouch(state) {
  return { ...state, touch: state.touch + 1 };
}
function addFavorite(state, length) {
  let isIncremented = false;
  if (state.favorite.number < length) {
    isIncremented = true;
  }

  return { ...state, favorite: { number: length, isIncremented } };
}

function searchData(state, data) {
  return { ...state, memeList: data };
}

function admob(state, value) {
  return { ...state, adMobHeight: value };
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case TOUCH:
      return addTouch(state);
    case NEW_FAVORITE:
      return addFavorite(state, action.length);
    case SEARCH_NEW_DATA:
      return searchData(state, action.filtredData);
    case ADMOB:
      return admob(state, action.value);
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
