import React, { useEffect } from 'react';

import {
  View,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  Text,
  StyleSheet,
  Vibration,
  Animated
} from 'react-native';

import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { useDispatch } from 'react-redux';
import store from '~/store';
import { NEW_FAVORITE } from '~/store/types';

import appStyles from '~/styles';

import {
  saveMameFromFavorite,
  getItemFromStorage,
  removeMemeFromFavorite
} from '~/utils/useAsyncStorage';
import shareMeme from '~/utils/shareMeme';
import {
  checkUseAudio,
  PlayAudio,
  watchWhenStopedAndReturnFalse
} from '~/utils/useAudioSound';

function TouchableMeme({ item }) {
  const dispatch = useDispatch();

  const { meme, name, img, id, color } = item;
  const _LongPressAnimation: Object = new Animated.Value(1);
  const [isFocused, setIsFocused] = React.useState(false);
  const [isfavorite, setIsFavorite] = React.useState(false);
  const [isPressed, setIsPressed] = React.useState(false);

  useEffect(() => {
    getItemFromStorage('like', '[]').then(arrayId => {
      JSON.parse(arrayId).forEach(favoriteId => {
        if (id === favoriteId) {
          setIsFavorite(true);
        }
      });
    });
  }, []);

  store.subscribe(() => {
    if (isFocused) {
      setIsFocused(false);
      Animated.timing(_LongPressAnimation, {
        toValue: 1,
        duration: 0
      }).start();
    }
  });

  const handlePress = () => {
    checkUseAudio(meme).then(resp => {
      if (resp) {
        setIsPressed(true);

        PlayAudio().then(() => {
          watchWhenStopedAndReturnFalse().then(value => setIsPressed(value));
        });
      } else {
        setIsPressed(false);
      }
    });
  };

  const handleLongPress = () => {
    Animated.timing(_LongPressAnimation, {
      toValue: 0,
      duration: 300
    }).start(() => {
      setIsFocused(true);
      Vibration.vibrate(100);
    });
  };

  const handleShareButton = () => {
    shareMeme(meme, name);
    Vibration.vibrate(50);
  };

  const handleFavoriteButton = () => {
    if (!isfavorite) {
      saveMameFromFavorite(id).then(length => {
        dispatch({ type: NEW_FAVORITE, length });
      });

      setIsFavorite(true);
    } else {
      removeMemeFromFavorite(id).then(length => {
        dispatch({ type: NEW_FAVORITE, length });
      });

      setIsFavorite(false);
    }

    Vibration.vibrate([20, 100, 100, 100]);
  };

  return (
    <>
      <View style={style.memeWrapper}>
        {/* <Text style={{ textAlign: 'center' }}>{touch}</Text> */}
        <Animated.View
          style={{
            height: 35,
            width: 35,
            backgroundColor: appStyles.colors.lightGray,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            left: _LongPressAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [15, 30]
            }),
            top: _LongPressAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 20]
            }),
            opacity: _LongPressAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0]
            }),
            position: 'absolute',
            zIndex: 2
          }}
        >
          <TouchableOpacity
            onPress={handleShareButton}
            style={{
              height: isFocused ? 40 : 0,
              width: isFocused ? 40 : 0,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <FontAwesome name='share-alt' size={20} />
          </TouchableOpacity>
        </Animated.View>
        <Animated.View
          style={{
            height: 35,
            width: 35,
            backgroundColor: appStyles.colors.lightGray,
            borderRadius: 20,
            justifyContent: 'center',
            alignItems: 'center',
            right: _LongPressAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [15, 30]
            }),
            top: _LongPressAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, 20]
            }),
            opacity: _LongPressAnimation.interpolate({
              inputRange: [0, 1],
              outputRange: [1, 0]
            }),
            position: 'absolute',
            zIndex: 2
          }}
        >
          <TouchableOpacity
            onPress={handleFavoriteButton}
            style={{
              height: isFocused ? 40 : 0,
              width: isFocused ? 40 : 0,
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            {!isfavorite && <Ionicons name='ios-heart' size={20} color='red' />}
            {isfavorite && (
              <Ionicons name='ios-heart-dislike' size={20} color='red' />
            )}
          </TouchableOpacity>
        </Animated.View>
        <TouchableWithoutFeedback
          onLongPress={handleLongPress}
          onPress={handlePress}
        >
          <Animated.View
            style={{
              flex: 1,
              justifyContent: 'center',

              transform: [
                {
                  scale: _LongPressAnimation.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1]
                  })
                }
              ]
            }}
          >
            <Image
              source={img}
              style={{
                height: 70,
                position: 'absolute',
                zIndex: 3,
                top: isPressed ? 5 : 0,
                resizeMode: 'contain',
                alignSelf: 'center'
              }}
            />
            <Image
              source={require('~assets/transparent_button_pressed.png')}
              style={{
                height: 100,
                zIndex: 2,
                position: 'absolute',
                top: -5,
                resizeMode: 'contain',
                alignSelf: 'center',
                opacity: isPressed ? 1 : 0
              }}
            />
            <Image
              source={require('~assets/transparent_button_normal.png')}
              style={{
                height: 100,
                zIndex: 2,
                position: 'absolute',
                top: -5,
                resizeMode: 'contain',
                alignSelf: 'center',
                opacity: isPressed ? 0 : 1
              }}
            />
            <View
              style={{
                height: 90,
                width: 96,
                borderRadius: 45,
                backgroundColor: appStyles.colors.random(color),
                alignSelf: 'center'
              }}
            ></View>

            <Text style={style.textName}>{name}</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
}
const style = StyleSheet.create({
  memeWrapper: {
    flex: 1,
    maxWidth: 150,
    margin: 10,
    marginHorizontal: 20
  },

  textName: {
    flex: 1,
    flexDirection: 'row',
    textAlign: 'center',
    maxWidth: 150,
    color: '#d2dae2',
    fontWeight: 'bold'
  },
  menuWrapper: {
    position: 'absolute',
    top: 30
  }
});

export default React.memo(TouchableMeme);
