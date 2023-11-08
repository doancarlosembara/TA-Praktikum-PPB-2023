import { useNavigation, useRoute } from '@react-navigation/native';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image185, image342, image500 } from '../api/moviedb';
import { SafeAreaView } from 'react-native-safe-area-context';
import React, { useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FavouritesScreen() {
  const [favourites, setFavourites] = useState([]);
  const navigation = useNavigation();


  useEffect(() => {
    loadFavourites();
  }, []);

  const loadFavourites = async () => {
    try {
      const storedFavourites = await AsyncStorage.getItem('Favourites');
      if (storedFavourites) {
        const favouritesData = JSON.parse(storedFavourites);
        setFavourites(favouritesData);
      }
    } catch (error) {
      console.error('Terjadi kesalahan saat memuat orang-orang favorit: ', error);
    }
  };

  const removeFromFavourites = async (id) => {
    try {
      const updatedFavourites = favourites.filter((person) => person.id !== id);
      setFavourites(updatedFavourites);
      await AsyncStorage.setItem('Favourites', JSON.stringify(updatedFavourites));
    } catch (error) {
      console.error('Terjadi kesalahan saat menghapus dari favorit: ', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
<SafeAreaView style={styles.header}>
  <TouchableOpacity onPress={() => navigation.goBack()}>
    <ChevronLeftIcon size={28} strokeWidth={2.5} color="white" />
  </TouchableOpacity>
  <Text style={[styles.text, styles.centeredText, { color: 'yellow' }]}>Favourites Actor</Text>
</SafeAreaView>



      <View>
        {favourites.length > 0 ? (
          favourites.map((person) => (
            <View key={person.id} style={styles.card}>
              <View style={styles.imageContainer}>
                <Image
                  source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                  style={styles.image}
                />
              </View>
              <Text style={styles.name}>{person.name}</Text>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => removeFromFavourites(person.id)}
              >
                <Text style={styles.removeButtonText}>Hapus dari Favorit</Text>
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noFavoritesText}>
            Anda belum menambahkan orang apa pun ke favorit Anda.
          </Text>
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#121212', // Warna latar belakang yang lebih gelap
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#eab308',
    marginBottom: 10,
    marginTop: 10,
  },
  card: {
    alignItems: 'center',
    marginVertical: 10,
    marginHorizontal: 20,
    padding: 20,
    backgroundColor: '#1f1f1f', // Warna latar belakang card
    borderRadius: 10,
  },
  imageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#eab308', // Warna border gambar
  },
  image: {
    width: 150,
    height: 150,
  },
  name: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    marginTop: 10,
  },
  removeButton: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  removeButtonText: {
    color: 'white',
    textAlign: 'center',
  },
  noFavoritesText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
    marginTop: 20,
  },
  centeredText: {
    flex: 1, // Membuat teks berada di tengah secara horizontal
    textAlign: 'center',
          fontSize: 24,
      fontWeight: 'bold',
      color: '#eab308',
      marginBottom: 10,
      marginTop: 10,
  },  
});
