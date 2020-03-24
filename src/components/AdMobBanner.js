import React, { useState } from 'react';
import { View } from 'react-native';

import { AdMobBanner } from 'expo-ads-admob';
import { useSelector, useDispatch } from 'react-redux';
import { ADMOB } from '~/store/types';

export default function AdMobBannerComponent() {
  const height = useSelector(state => state.adMobHeight);
  const dispatch = useDispatch();

  return (
    <View style={{ height }}>
      <AdMobBanner
        bannerSize='smartBannerLandscape'
        adUnitID='ca-app-pub-3940256099942544/6300978111'
        onDidFailToReceiveAdWithError={erro => {
          console.log(erro);
          if (height !== 0) {
            dispatch({ type: ADMOB, value: 0 });
          }
        }}
        onAdViewDidReceiveAd={() => {
          dispatch({ type: ADMOB, value: 50 });
        }}
        servePersonalizedAds
      />
    </View>
  );
}
