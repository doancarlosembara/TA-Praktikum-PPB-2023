import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../theme';
import MovieScreen from '../screens/MovieScreen';
import { ChevronLeftIcon, TrashIcon } from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fallbackMoviePoster, image500 } from '../api/moviedb';

export default function Bookmarks() {
  const navigation = useNavigation();
  const [bookmarkedMovies, setBookmarkedMovies] = useState([]);

  const marginR = '20%';

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
    removeButton: {
      backgroundColor: 'red',
      padding: 8,
      borderRadius: 10,
    },
    removeButtonText: {
      color: 'white',
    },
    movieItem: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    movieTitle: {
      color: 'white',
    },
  });

  const fetchBookmarkedMovies = async () => {
    try {
      const bookmarks = await AsyncStorage.getItem('bookmarks');
  
      if (bookmarks) {
        setBookmarkedMovies(JSON.parse(bookmarks));
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat mengambil data bookmark: ', error);
    }
  }

  const removeBookmark = async (movieId) => {
    try {
      const updatedBookmarks = bookmarkedMovies.filter((movie) => movie.id !== movieId);
      setBookmarkedMovies(updatedBookmarks);
      await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedBookmarks));
    } catch (error) {
      console.error('Terjadi kesalahan saat menghapus bookmark: ', error);
    }
  }

  useEffect(() => {
    fetchBookmarkedMovies();
  }, []);

  return (
    <View style={{ marginBottom: 8, padding: 15 }} className="flex-1 bg-neutral-900">
      <SafeAreaView style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
        </TouchableOpacity>
        <Text style={[styles.container, styles.text]}>Bookmarked Movies</Text>
      </SafeAreaView>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }} className="flex-1 bg-neutral-900">
        <View style={{ padding: 15 }}>
          {bookmarkedMovies.length > 0 ? (
            bookmarkedMovies.map((movie, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('Movie', { id: movie.id })}
                style={styles.movieItem}
              >
                <Image
                  source={{ uri: image500(movie.poster_path) || fallbackMoviePoster }}
                  style={{ width: 50, height: 75 }}
                />
                <Text style={styles.movieTitle}>{movie.title}</Text>
                <TouchableOpacity
                  style={styles.removeButton}
                  onPress={() => removeBookmark(movie.id)}
                >
                  <TrashIcon size={24} color="white" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))
          ) : (
            <Text style={{ fontSize: 18, color: 'white', textAlign: 'center', marginTop: 20 }}>
              Anda belum menambahkan film apa pun ke bookmark Anda.
            </Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
