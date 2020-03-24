import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import AdMobBanner from '~/components/AdMobBanner';
import HomeScreen from '~/pages/MainPage/MainPage';
import FavoritePage from '~/pages/FavoritePage';

import appStyles from '~/styles';

const Stack = createStackNavigator();

function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name='HOME'
          component={HomeScreen}
          options={{
            headerStyle: { backgroundColor: appStyles.colors.primaryColor },
            headerTitleAlign: 'center',
            headerTintColor: appStyles.colors.yellow
          }}
        />
        <Stack.Screen
          name='FAVORITES'
          component={FavoritePage}
          options={{
            headerStyle: { backgroundColor: appStyles.colors.primaryColor },
            headerTitleAlign: 'center',
            headerTintColor: appStyles.colors.yellow
          }}
        />
      </Stack.Navigator>
      <AdMobBanner />
    </NavigationContainer>
  );
}

export default Routes;
