import { View, Text, Image, TouchableOpacity, Platform, Dimensions, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context';
import Loading from '../components/loading';
import { useNavigation } from '@react-navigation/native';
import { styles } from '../theme';

const ios = Platform.OS == 'ios';
const verticalMargin = ios ? '' : ' my-3';
var { width, height } = Dimensions.get('window');

export default function ProfileScreen() {
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);
    const [person, setPerson] = useState({
        name: 'Doan Carlos Embara',
        place_of_birth: 'Jakarta',
        gender: 1,  // 1: Female, 2: Male
        birthday: '14 November 2002',
        known_for_department: 'Keren',
        popularity: 100,  // Persentase popularitas
        biography: '"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."'
    });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setLoading(false);
    }, []);

    return (
        <ScrollView
            className="flex-1 bg-neutral-900"
            contentContainerStyle={{ paddingBottom: 20 }}>
            {/* Tombol kembali */}
            <SafeAreaView
                className={"flex-row justify-between items-center mx-4 z-10 " + verticalMargin}>
                <TouchableOpacity style={styles.background} className="rounded-xl p-1" onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                </TouchableOpacity>
            </SafeAreaView>

            {/* Detail pengguna */}
            {
                loading ? (
                    <Loading />
                ) : (
                    <View>
                        <View
                            className="flex-row justify-center"
                            style={{
                                shadowColor: 'gray',
                                shadowRadius: 40,
                                shadowOffset: { width: 0, height: 5 },
                                shadowOpacity: 1,
                            }}
                        >
                            <View
                                className="items-center rounded-full overflow-hidden h-72 w-72 border-neutral-500 border-2">
                                <Image
                                    source={require('../assets/images/Profile.jpg')}
                                    style={{ height: height * 0.43, width: width * 0.74 }}
                                />
                            </View>
                        </View>

                        <View className="mt-6">
                            <Text className="text-3xl text-white font-bold text-center">
                                {person.name}
                            </Text>
                            <Text className="text-neutral-500 text-base text-center">
                                {person.place_of_birth}
                            </Text>
                        </View>

                        <View className="mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full ">
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Gender</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {person.gender === 1 ? 'Male' : 'Female'}
                                </Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Birthday</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {person.birthday}
                                </Text>
                            </View>
                            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
                                <Text className="text-white font-semibold">Known for</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {person.known_for_department}
                                </Text>
                            </View>
                            <View className="px-2 items-center">
                                <Text className="text-white font-semibold">Popularity</Text>
                                <Text className="text-neutral-300 text-sm">
                                    {person.popularity.toFixed(2)} %
                                </Text>
                            </View>
                        </View>

                        <View className="my-6 mx-4 space-y-2">
                            <Text className="text-white text-lg">Biography</Text>
                            <Text className="text-neutral-400 tracking-wide">
                                {person.biography ? person.biography : 'N/A'}
                            </Text>
                        </View>
                    </View>
                )
            }
        </ScrollView>
    )
}
