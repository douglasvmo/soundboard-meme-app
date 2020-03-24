import React from 'react';
import { useSelector } from 'react-redux';

import { View, StyleSheet, FlatList, Animated } from 'react-native';

import TouchableMeme from '~/components/Button/TouchableFavoriteMeme';

import { getFavoriteListMemeObj } from '~/utils/useAsyncStorage';

const style = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#4b4b4b'
  }
});

function FavoritePage() {
  const favorite = useSelector(state => state.favorite);
  const [favList, setFavList] = React.useState([]);

  const _TextAnimation = new Animated.Value(0);

  React.useEffect(() => {
    getFavoriteListMemeObj().then(list => {
      setFavList(list);
    });
  }, [favorite.number]);

  return (
    <View style={style.wrapper}>
      <FlatList
        data={favList}
        extraData={true}
        keyExtractor={item => item.id}
        numColumns={2}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          Animated.timing(_TextAnimation, {
            toValue: 1,
            duration: 300
          }).start();
        }}
        renderItem={({ item }) => <TouchableMeme item={item} />}
      />
      <Animated.View
        style={{
          flex: 1,
          position: 'absolute',
          bottom: 0,
          marginBottom: _TextAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 55]
          })
        }}
      >
        <Animated.Text></Animated.Text>
      </Animated.View>
    </View>
  );
}

export default FavoritePage;
