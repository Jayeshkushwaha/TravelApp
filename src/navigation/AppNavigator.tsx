import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from '../screens/SplashScreen';
import TabNavigator from './TabNavigator';
import DestinationDetailScreen from '../screens/DestinationDetailScreen';

export type RootStackParamList = {
  Splash: undefined;
  Explore: undefined;
  DestinationDetail: {
    destination: {
      image: string;
      title: string;
      location: string;
      price?: string;
      rating?: string;
      description: string;
      users?: string[];
      userCount?: number;
    };
  };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={SplashScreen} />
      <Stack.Screen name="Explore" component={TabNavigator} />
      <Stack.Screen name="DestinationDetail" component={DestinationDetailScreen} />
    </Stack.Navigator>
  );
};

export default AppNavigator;