import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import MovieScreen from '../screens/MovieScreen';
import PersonScreen from '../screens/PersonScreen';
import SearchScreen from '../screens/SearchScreen';
import TopRatedList from '../screens/TopRatedList';
import UpcomingList from '../screens/UpcomingList';
import ProfileScreen from '../screens/ProfileScreen';
import BookmarksScreen from '../screens/BookmarksScreen';
import FavouritesScreen from '../screens/FavouritesScreen';


const Stack = createNativeStackNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" options={{ headerShown: false }} component={HomeScreen} />
        <Stack.Screen name="Movie" options={{ headerShown: false }} component={MovieScreen} />
        <Stack.Screen name="Person" options={{ headerShown: false }} component={PersonScreen} />
        <Stack.Screen name="Search" options={{ headerShown: false }} component={SearchScreen} />
        <Stack.Screen name="TopRatedList" options={{ headerShown: false }} component={TopRatedList} />
        <Stack.Screen name="ProfileScreen" options={{ headerShown: false }} component={ProfileScreen} />
        <Stack.Screen name="UpcomingList" options={{ headerShown: false }} component={UpcomingList} />
        <Stack.Screen name="BookmarksScreen" options={{ headerShown: false }} component={BookmarksScreen} />
        <Stack.Screen name="FavouritesScreen" options={{ headerShown: false }} component={FavouritesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
