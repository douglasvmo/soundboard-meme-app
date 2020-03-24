import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Animated,
  FlatList,
  TouchableOpacity
} from 'react-native';

import { useSelector, useDispatch } from 'react-redux';
import { SEARCH_NEW_DATA } from '~/store/types';
import memeList from '~/utils/memeList';

import { IosSearch } from './icons';

import _ from 'lodash';

export default function TextInputSearch() {
  const dispatch = useDispatch();
  // revisar

  function contains({ name }, query) {
    let nameQuery = name.toLowerCase();
    if (nameQuery.includes(query)) {
      return true;
    }
    return false;
  }

  function handleSearch(textValue) {
    const formatedQuery = textValue.toLowerCase();
    let filtredData = _.filter(memeList, item => contains(item, formatedQuery));

    dispatch({ type: SEARCH_NEW_DATA, filtredData });
  }

  //revisar

  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          height: 38,
          fontSize: 16,
          color: 'rgba(0, 0, 0, 0.7)',
          backgroundColor: 'rgba(255, 255, 255, 0.3)',
          borderRadius: 20,
          paddingLeft: 30,
          marginHorizontal: 15
        }}
      >
        <View style={{ position: 'absolute', top: 7, left: 7 }}>
          <IosSearch />
        </View>

        <TextInput style={{ flex: 1 }} onChangeText={handleSearch} />
      </View>
    </View>
  );
}
