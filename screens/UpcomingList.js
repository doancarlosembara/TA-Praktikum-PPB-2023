import { ArrowLeftIcon, ChevronLeftIcon } from 'react-native-heroicons/outline';
import { styles, theme } from '../theme';
import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, Dimensions, TouchableOpacity, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { fetchUpcomingMovies, fallbackMoviePoster, image185 } from '../api/moviedb';

const { width, height } = Dimensions.get('window');

export default function UpcomingList() {
  const navigation = useNavigation();
  const [UpcomingMovies, setUpcomingMovies] = useState([]);

  useEffect(() => {
    // Mengambil data film yang akan datang saat komponen dimuat
    fetchUpcomingMovies().then((data) => {
      setUpcomingMovies(data.results);
    });
  }, []);

  // Ganti persentase margin kanan yang Anda inginkan
  const marginR = '25%';

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

  // Fungsi untuk membagi daftar film yang akan datang menjadi 2 baris
  const splitUpcomingMovies = () => {
    const rows = [];
    const itemsPerRow = 2;

    for (let i = 0; i < UpcomingMovies.length; i += itemsPerRow) {
      const row = UpcomingMovies.slice(i, i + itemsPerRow);
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
          Upcoming Movies
        </Text>
      </View>

      <ScrollView
        vertical
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {splitUpcomingMovies().map((row, rowIndex) => (
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
