import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { styles, theme } from '../theme';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, TouchableWithoutFeedback, StyleSheet  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchTopRatedMovies, fallbackMoviePoster, image185 } from '../api/moviedb';

const { width, height } = Dimensions.get('window');

export default function TopRatedList() {
  const navigation = useNavigation();
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const marginR = '25%'; // Ganti dengan persentase margin kanan yang Anda inginkan

  const styles = StyleSheet.create({
    container: {
      marginRight: marginR,
    },
    text: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#eab308',
      marginBottom: 10,
      marginTop: 10,
    },
  });

  useEffect(() => {
    // Mengambil data film teratas saat komponen dimuat
    fetchTopRatedMovies().then((data) => {
      setTopRatedMovies(data.results);
    });
  }, []);

  // Fungsi untuk membagi daftar film teratas menjadi 3 baris
  const splitTopRatedMovies = () => {
    const rows = [];
    const itemsPerRow = 2;

    for (let i = 0; i < topRatedMovies.length; i += itemsPerRow) {
      const row = topRatedMovies.slice(i, i + itemsPerRow);
      rows.push(row);
    }

    return rows;
  };

  return (
    <View style={{ marginBottom: 8, padding: 15 }} className="flex-1 bg-neutral-900">
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <Text style={[styles.container, styles.text]}>
          Top Rated Movies
        </Text>
      </View>

      <ScrollView
        vertical
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {splitTopRatedMovies().map((row, rowIndex) => (
          <View key={rowIndex} style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
            {row.map((item, index) => (
              <TouchableWithoutFeedback
                key={item.id}
                onPress={() => navigation.push('Movie', item)}
              >
                <View style={{ alignItems: 'center', width: '48%' }}>
                  <Image
                    source={{ uri: image185(item.poster_path) || fallbackMoviePoster }}
                    style={{ width: '100%', height: height * 0.33, borderRadius: 25 }}
                  />
                  <Text style={{ fontSize: 20, color: 'white', marginTop: 10 }}>
                    {item.title.length > 14 ? item.title.slice(0, 14) + '...' : item.title}
                  </Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
