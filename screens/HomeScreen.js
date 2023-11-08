import { UserIcon, BookmarkIcon, TrophyIcon, BellSnoozeIcon} from 'react-native-heroicons/solid';
import { View, Text, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import {Bars3CenterLeftIcon, HeartIcon, MagnifyingGlassIcon} from 'react-native-heroicons/outline'
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import MovieList2 from '../components/movieList2';
import { StatusBar } from 'expo-status-bar';
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../api/moviedb';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { styles } from '../theme';

const ios = Platform.OS === 'ios';

export default function HomeScreen() {

  const [trending, setTrending] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [isFavourite, toggleFavourite] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();


  useEffect(()=>{
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  },[]);

  const getTrendingMovies = async ()=>{
    const data = await fetchTrendingMovies();
    console.log('got trending', data.results.length)
    if(data && data.results) setTrending(data.results);
    setLoading(false)
  }
  const getUpcomingMovies = async ()=>{
    const data = await fetchUpcomingMovies();
    console.log('got upcoming', data.results.length)
    if(data && data.results) setUpcoming(data.results);
  }
  const getTopRatedMovies = async ()=>{
    const data = await fetchTopRatedMovies();
    console.log('got top rated', data.results.length)
    if(data && data.results) setTopRated(data.results);
  }
  const navigateTopRatedScreen = () => {
    // Ganti 'HalamanLain' dengan nama yang sesuai untuk halaman yang ingin Anda tuju.
    navigation.navigate('TopRatedList');
  }
  const navigateUpcomingScreen = () => {
    // Ganti 'HalamanLain' dengan nama yang sesuai untuk halaman yang ingin Anda tuju.
    navigation.navigate('UpcomingList');
  }
  const navigateProfileScreen = () => {
    // Ganti 'HalamanLain' dengan nama yang sesuai untuk halaman yang ingin Anda tuju.
    navigation.navigate('ProfileScreen');
  }
  const navigateBookmarksScreen = () => {
    // Ganti 'HalamanLain' dengan nama yang sesuai untuk halaman yang ingin Anda tuju.
    navigation.navigate('BookmarksScreen');
  }
  const navigateFavouritesScreen = () => {
    // Ganti 'HalamanLain' dengan nama yang sesuai untuk halaman yang ingin Anda tuju.
    navigation.navigate('FavouritesScreen');
  }


  return (
    <View className="flex-1 bg-neutral-800">
      {/* search bar */}
      <SafeAreaView className={ios? "-mb-2": "mb-3"}>
        <StatusBar style="light" />
        <View className="flex-row justify-between items-center mx-4">
          <Text 
            className="text-white text-3xl font-bold">
              <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Search')}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        loading? (
          <Loading />
        ):(
          <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{paddingBottom: 10}}
          >

            {/* Trending Movies Carousel */}
            { trending.length>0 && <TrendingMovies data={trending} /> }

            {/* upcoming movies row */}
            { upcoming.length>0 && <MovieList title="Top Rated" data={topRated} /> }
            

            {/* top rated movies row */}
            { topRated.length>0 && <MovieList2 title="Upcoming" data={upcoming} /> }

          </ScrollView>
        )
      }
      <SafeAreaView className={ios ? '-mb-2' : 'mb-3'}>
  <StatusBar style="light" />
  <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingLeft: 50, paddingRight: 50}}>
    <TouchableOpacity onPress={navigateProfileScreen}>
      <UserIcon size="35" color={isFavourite ? theme.background : '#eab308'} />
    </TouchableOpacity>
    <TouchableOpacity onPress={navigateTopRatedScreen}>
      <BellSnoozeIcon size="35" color={isFavourite ? theme.background : '#eab308'} />
    </TouchableOpacity>
    <TouchableOpacity onPress={navigateUpcomingScreen}>
      <TrophyIcon size="35" color={isFavourite ? theme.background : '#eab308'} />
    </TouchableOpacity>
    <TouchableOpacity onPress={navigateBookmarksScreen}>
      <BookmarkIcon size="35" color={isFavourite ? theme.background : '#eab308'} />
    </TouchableOpacity>
    <TouchableOpacity onPress={navigateFavouritesScreen}>
  <HeartIcon size="35" color="#eab308" />
</TouchableOpacity>


  </View>
</SafeAreaView>

  </View>
      

   
  )
}
