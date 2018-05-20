import React from 'react';
import { createStackNavigator } from 'react-navigation';
import FreightBroHome from '../screens/FreightBroHome';

export const Root = createStackNavigator({
    Home: FreightBroHome
})
