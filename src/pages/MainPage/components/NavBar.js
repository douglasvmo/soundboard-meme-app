import React, { useEffect, useState } from 'react';
import { View, TouchableOpacity, Keyboard, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import appStyles from '~/styles';
import { HeartIcon } from './icons';
import TextInputSearch from './TextInputSearch';

import { useSelector } from 'react-redux';

function NavBar() {
  const adMobHeight = useSelector(state => state.adMobHeight);
  const [haveKeyboard, setHaveKeyboard] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', e => {
      setHaveKeyboard(true);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setHaveKeyboard(false);
    });
  }, []);

  return (
    <View
      style={{
        backgroundColor: appStyles.colors.primaryColor,
        bottom: haveKeyboard ? 250 - adMobHeight : 0
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <TextInputSearch />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('FAVORITES');
          }}
          style={{
            width: 52,
            height: 52,
            alignItems: 'center',
            justifyContent: 'center',
            margin: 1
          }}
        >
          <HeartIcon />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default React.memo(NavBar);
