import React, { useEffect } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Animated,
  Share,
  Button,
  Keyboard
} from 'react-native';

import TouchableMeme from '~/components/Button';

import NavBar from './components/NavBar';

import { useDispatch, useSelector } from 'react-redux';
import { TOUCH } from '~/store/types';

import appStyles from '~/styles';

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#4b4b4b'
  }
});

function MainPage() {
  const dispatch = useDispatch();
  const memeList: array = useSelector(state => state.memeList);
  const _TextAnimation = new Animated.Value(0);

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `HELO`
      });

      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View
      style={style.wrapper}
      onTouchStart={() => {
        dispatch({ type: TOUCH });
      }}
    >
      <FlatList
        data={memeList}
        keyExtractor={item => item.id}
        numColumns={3}
        initialNumToRender={10}
        overScrollMode='never'
        showsVerticalScrollIndicator
        onEndReachedThreshold={0.2}
        onEndReached={e => {
         Animated.timing(_TextAnimation, {
              toValue: 0,
              duration: 500
         }).start();
      
        }}
        renderItem={({ item }) => <TouchableMeme item={item} />}
      />
      <Animated.View
        style={{
          marginBottom: _TextAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [-100, 0]
          }),
          zIndex: 0
        }}
      >
        <Button title='HELO' onPress={onShare} />
      </Animated.View>
      <NavBar />
    </View>
  );
}

export default React.memo(MainPage);
