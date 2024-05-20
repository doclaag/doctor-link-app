import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { globalColors, globalStyles } from '../theme';
import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native'; // Agrega esta importación para StackActions
import { URL_DOCTORS, API_TOKEN } from '@env';

interface Doctor {
  id: string,
  name: string;
  last_name: string;
  gender: number;
  speciality: string;
  phone: string;
  no_collegiate: string;
}

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [page, setPage] = useState(1);
  const [dataLength, setDataLength] = useState(1);
  const navigation = useNavigation(); // Usa el hook useNavigation aquí

  const consultAPI = useCallback(async (page: number, query: string) => {
    const headers = new Headers({
      'Authorization': `Bearer ${API_TOKEN}`,
      'Content-Type': 'application/json'
    });

    const requestOptions = {
      method: 'GET',
      headers: headers
    };

    try {
      const response = await fetch(`${URL_DOCTORS}?page=${page}&limit=8&query=${query}`, requestOptions);
      const data: Doctor[] = await response.json();
      setDoctors(prevDoctors => (page === 1 ? data : [...prevDoctors, ...data]));
      setDataLength(data.length);
      console.log(data);
    } catch (error) {
      console.error(error);
      // TODO: Handle error in a user-friendly way
    }
  }, []);

  useEffect(() => {
    consultAPI(page, searchQuery);
  }, [consultAPI, page]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      consultAPI(1, searchQuery);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, consultAPI]);

  const handleScroll = (event: { nativeEvent: { contentOffset: { y: number; }; layoutMeasurement: { height: number; }; contentSize: { height: number; }; }; }) => {
    if (dataLength === 8 && event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height >= event.nativeEvent.contentSize.height) {
      setPage(prevPage => prevPage + 1);
    }
  };

  return (
    <View style={globalStyles.containerSearchScreen}>
      <Text style={globalStyles.welcomeText}>Bienvenido <Text style={{ color: globalColors.secondary }}>Juanito</Text></Text>
      <Text style={globalStyles.subtitle}>Busca el doctor que más se adapte a tus necesidades</Text>

      <Searchbar
        placeholder="Buscar doctor"
        onChangeText={setSearchQuery}
        value={searchQuery}
        icon={'search-circle-outline'}
        style={globalStyles.searchbar}
      />

      <ScrollView style={globalStyles.scrollView} onScroll={handleScroll}>
        {doctors.filter(doctor => {
          const fullName = `${doctor.name} ${doctor.last_name}`;
          return fullName.toLowerCase().includes(searchQuery.toLowerCase());
        }).map((doctor) => (
          <TouchableOpacity
            key={doctor.id}
            style={globalStyles.cardContainer}
            onPress={() => navigation.dispatch(StackActions.push('DoctorInformationScreen', { doctorId: doctor.id }))}
          >
            <View style={globalStyles.cardContent}>
              <Image
                source={doctor.gender === 0 ? require('../../assets/img/doctor.png') : require('../../assets/img/doctora.png')}
                style={globalStyles.imageSearchDoctor}
              />
              <View style={globalStyles.cardTextContainer}>
                <Text style={globalStyles.doctorName}>{`${doctor.name} ${doctor.last_name}`}</Text>
                <Text style={globalStyles.speciality}>{doctor.speciality}</Text>
                <Text style={globalStyles.phone}>{doctor.phone}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
