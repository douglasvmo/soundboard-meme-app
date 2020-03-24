import { AsyncStorage } from 'react-native';

import memeList from './memeList';

const APP_STORAGE_KEY = '@FANNY_BUTTON';

export const getItemFromStorage = async (
  key: string,
  defaultValue: any
): any => {
  try {
    const value =
      (await AsyncStorage.getItem(`${APP_STORAGE_KEY}:${key}`)) || defaultValue;

    return value;
  } catch (error) {
    console.log(error);
  }

  return defaultValue;
};

export const persistItemInStorage = async (
  key: string,
  value: any
): Promise<void> => {
  try {
    await AsyncStorage.setItem(`${APP_STORAGE_KEY}:${key}`, value.toString());
  } catch (err) {
    console.log(err);
  }
};

export const removeItemFromStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(`${APP_STORAGE_KEY}:${key}`);
  } catch (err) {
    console.log(err);
  }
};

export const removeMemeFromFavorite = async id => {
  try {
    let value;
    await getItemFromStorage('like', []).then(response => {
      value = JSON.parse(response);

      const index = value.indexOf(id);
      if (index > -1) {
        value.splice(index, 1);
        persistItemInStorage('like', JSON.stringify(value)).then(() => {
          // favoriteControler.dispatch({ type: 'decrement' });
        });
      }
    });
    return value.length;
  } catch (erro) {
    return false;
  }
};

export const saveMameFromFavorite = async id => {
  let value;
  try {
    await getItemFromStorage('like', '[]').then(response => {
      value = JSON.parse(response);

      if (value.indexOf(id) == -1) {
        value.push(id);
        persistItemInStorage('like', JSON.stringify(value));
      }
    });
    return value.length;
  } catch (erro) {
    return false;
  }
};

export const getFavoriteListMemeObj = async (): Promise<void> => {
  const favoriteList = [];
  try {
    await getItemFromStorage('like', '[]').then(response => {
      arrayFavoriteId = JSON.parse(response);
      arrayFavoriteId.forEach(id => {
        memeList.forEach(meme => {
          if (id === meme.id) {
            favoriteList.push(meme);
          }
        });
      });
    });

    return favoriteList;
  } catch (erro) {
    console.log(erro);
  }
};
