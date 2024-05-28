import React, { useCallback, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { globalStyles, globalColors } from '../theme';
import { URL_APPOINTMENT } from '@env';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParams } from '../routes/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage } from 'react-native-flash-message';

interface Appointment {
  id: string;
  doctor: {
    name: string;
    last_name: string;
  };
  patient: {
    name: string;
    last_name: string;
  };
  date: string;
  observation: string;
  time: string;
  is_active: number;
  is_active_display: string;
}

export const AppointmentSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [citas, setCitas] = useState<Appointment[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  const consultAPI = useCallback(async (page: number, query: string) => {
    setLoading(true); 
    try {
      const storedToken = await AsyncStorage.getItem('userToken');
      if (!storedToken) {
        throw new Error('Token not found');
      }
      console.log('Stored token:', storedToken);
      showMessage({
        message: "Inicio de sesión exitoso",
        description: "Has iniciado sesión correctamente.",
        type: "success",
        duration: 5000,
      });

      const headers = new Headers({
        'Authorization': `${storedToken}`,
        'Content-Type': 'application/json'
      });

      const response = await fetch(`${URL_APPOINTMENT}?page=${page}&limit=&query=${query}`, {headers} );
      const data = await response.json();
      if (response.ok) {
        if (Array.isArray(data)) {
        setCitas(prevCitas => (page === 1 ? data : [...prevCitas, ...data]));
      } else {
        console.error('Unexpected response data:', data);
        setCitas([]);
      }
    } else {
      console.error('Error response:', data);
      setCitas([]);
    }
    } catch (error) {
      console.error(error);
      setCitas([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    consultAPI(page, searchQuery);
  }, [consultAPI, page]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      setPage(1);
      consultAPI(1, searchQuery);
    }, 1000);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, consultAPI]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity
          onPress={() => navigation.navigate('Search')}
          style={{ marginRight: 10 }}
        >
          <Text style={{ fontSize: 40, fontWeight: 'bold', color: globalColors.primary }}>+</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  const getStatusImage = (status: string) => {
    switch (status) {
      case "PROCESADA":
      case "EN PROCESO":
        return require('../../assets/img/Proceso.png');
      case "CONFIRMADA":
        return require('../../assets/img/Confirmada.png');
      case "CANCELADA":
        return require('../../assets/img/Cancelada.png');
      case "REPROGRAMADA":
        return require('../../assets/img/Reprogramada.png');
      case "FINALIZADA":
        return require('../../assets/img/Finalizada.png');
      default:
        return require('../../assets/img/doctor.png');
    }
  };

  return (
    <View style={globalStyles.containerCitasScreen}>
      <Text style={globalStyles.welcomeText}>
        Bienvenido <Text style={[globalStyles.welcomeText, { color: globalColors.secondary }]}>Pedro Pablo Celada</Text> a tus citas.
      </Text>

      <Searchbar
        placeholder="Buscar cita por fecha"
        onChangeText={setSearchQuery}
        value={searchQuery}
        icon={'search'}
        style={globalStyles.searchbar}
      />

      {loading ? (
        <View style={globalStyles.loadingContainer}>
          <ActivityIndicator size="large" color={globalColors.primary} />
          <Text style={globalStyles.loadingText}>Cargando...</Text>
        </View>
      ) : (
        <ScrollView style={globalStyles.scrollView}>
          {citas.map((cita) => (
            <TouchableOpacity
              key={cita.id}
              style={globalStyles.cardContainer}
              onPress={() => navigation.navigate('AppointmentDetail', { appointment: cita })}
            >
              <View style={globalStyles.cardContent}>
                <Image
                  source={getStatusImage(cita.is_active_display)}
                  style={globalStyles.imageEstadoCita}
                />
                <View style={globalStyles.cardTextContainer}>
                  <View style={[{ marginLeft: 10 }]}>
                    <Text style={globalStyles.doctorName}>{`${cita.doctor.name} ${cita.doctor.last_name}`}</Text>
                    <Text style={globalStyles.speciality}>{`${cita.date} ${cita.time}`}</Text>
                    <Text style={[globalStyles.phone, { marginLeft: 5, color: globalColors.black }]}>{cita.observation}</Text>
                    <Text style={[globalStyles.phone, { marginLeft: 5, color: globalColors.black }]}>{cita.is_active_display}</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      )}
      <FlashMessage position="top" />
    </View>
  );
};
