import React from 'react';
import { createStackNavigator, createBottomTabNavigator} from 'react-navigation';
import FreightBroHome from '../screens/FreightBroHome';
import SearchAndFilter from '../screens/SearchAndFilter';
import SortPage from '../screens/SortPage';
import FilterPage from '../screens/FilterPage';

const BottomTabs= createBottomTabNavigator (
    {
        Sort: SortPage,
        Liners: FilterPage,
    },
    {
        tabBarOptions: {
            labelStyle: {
                fontSize: 20,
                alignItems: 'center',
                justifyContent: 'center',
            },
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
            style: {
                justifyContent: 'center',
                alignItems: 'center'
            },
            titleStyle: {
                justifyContent: 'center',
                alignItems: 'center',
            },
        },
    },
    {
        navigationOptions: {
            title: 'Sort'
        }
    }
)
export const Root = createStackNavigator({
    Home: FreightBroHome,
    Search: BottomTabs
}, {
    initialScreenName: 'Home'
})