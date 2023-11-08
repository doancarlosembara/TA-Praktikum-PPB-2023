import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import { moviesData } from '../constants';
import { fallbackMoviePoster, image185, image342, poster342 } from '../api/moviedb';
import { styles } from '../theme';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function MovieList({ title, hideSeeAll, data }) {
  const navigation = useNavigation();

  // Fungsi untuk menavigasi ke halaman lain saat tombol "See All" ditekan
  const navigateToAnotherScreen = () => {
    // Ganti 'HalamanLain' dengan nama yang sesuai untuk halaman yang ingin Anda tuju.
    navigation.navigate('TopRatedList');
  }

  return (
    <View style={{ marginBottom: 8, marginTop: 8 }}>
      <View style={{ marginLeft: 4, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text style={{ color: 'white', fontSize: 18, paddingLeft: 10,paddinRight: 10,paddingBottom: 10 }}>{title}</Text>
        {!hideSeeAll && (
          <TouchableOpacity onPress={navigateToAnotherScreen}>
            <Text style={[styles.text, { fontSize: 18 , padding: 10}]}>See All</Text>
          </TouchableOpacity>
        )}
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data.map((item, index) => {
          return (
            <TouchableOpacity key={index} onPress={() => navigation.push('Movie', item)}>
              <View style={{ marginBottom: 4, marginRight: 4 }}>
                <Image
                  source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                  style={{ width: width * 0.33, height: height * 0.22, borderRadius: 10 }}
                />
                <Text style={{ color: 'gray', marginLeft: 2 }}>
                  {item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
                </Text>
              </View>
            </TouchableOpacity>
          )
        })
}</ScrollView>
    </View>
  )
}
