import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux';
import { Ionicons } from '@expo/vector-icons';

import appStyles from '~/styles';

export function HeartIcon() {
  const favorite = useSelector(state => state.favorite);

  const [heartSize, setHeartSize] = useState(28);

  useEffect(() => {
    if (favorite.isIncremented) {
      setHeartSize(38);
      setTimeout(() => {
        setHeartSize(28);
      }, 300);
    }
  }, [favorite.number]);

  return <Ionicons name='md-heart' size={heartSize} color='red' />;
}

export function IosSearch() {
  return <Ionicons name='ios-search' size={24} />;
}
