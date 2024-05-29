import React, { useCallback, useEffect, useState, useLayoutEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, ActivityIndicator, Alert } from 'react-native';
import { Button, Modal, PaperProvider, Portal, Searchbar } from 'react-native-paper';
import { globalStyles, globalColors } from '../theme';
import { URL_APPOINTMENT_DOCTOR, URL_APPOINTMENT_PATIENT, API_TOKEN, URL_APPOINTMENT_EDIT } from '@env';
import { useNavigation } from '@react-navigation/native';
import type { NavigationProp } from '@react-navigation/native';
import type { RootStackParams } from '../routes/StackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FlashMessage, { showMessage } from 'react-native-flash-message';
import axios from 'axios';

interface Appointment {
  id: string;
  doctor: {
    id: string,
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
  const [selectedCita, setSelectedCita] = useState<Appointment | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isDoctor, setIsDoctor] = useState(false); // Variable global para determinar si es doctor o paciente

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const opcion = true;

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

      let url = URL_APPOINTMENT_DOCTOR;
      console.log(url);

      let response = await fetch(`${url}?page=${page}&limit=&query=${query}`, { headers });
      let data = await response.json();
      console.log(response.ok);
      if (response.ok) {
        setCitas(data);
        setIsDoctor(true); // Si la petición a la URL_APPOINTMENT_DOCTOR es exitosa, isDoctor se establece en true
      } else {
        // Si la petición a la URL_APPOINTMENT_DOCTOR falla, intentamos con la URL_APPOINTMENT_PATIENT
        url = URL_APPOINTMENT_PATIENT;
        console.log(url);
        
        response = await fetch(`${url}?page=${page}&limit=&query=${query}`, { headers });
        data = await response.json();
        if (response.ok) {
          setCitas(data);
          setIsDoctor(false); // Si la petición a la URL_APPOINTMENT_PATIENT es exitosa, isDoctor se establece en false
        } else {
          // Si ambas peticiones fallan, mostramos un error
          console.error('Error response:', data);
          setCitas([]);
        }
      }

      console.log(isDoctor);
    } catch (error) {
      console.error(error);
      setCitas([]);
    } finally {
      setLoading(false);
    }
  }, []);
  
  const fetchAppointments = useCallback(() => {
    consultAPI(1, '');
  }, [consultAPI]);

  useEffect(() => {
    fetchAppointments(); // Llamar a la función cuando se monta el componente
  }, [fetchAppointments]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      fetchAppointments(); // Llamar a la función cuando se regrese a este componente
    });
    return unsubscribe;
  }, [navigation, fetchAppointments]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filteredAppointments = citas.filter(cita => {
      const doctorName = `${cita.doctor.name} ${cita.doctor.last_name}`.toLowerCase();
      return doctorName.includes(query.toLowerCase());
    });
    setCitas(filteredAppointments);
  };

  const handlePressCita = (cita: Appointment) => {
    if (isDoctor) {
      navigation.navigate('AppointmentDetail', { appointment: cita, isDoctor: true });
    } else {
      setSelectedCita(cita);
      setModalVisible(true);
    }
  };

  const handleReprogram = () => {
    if (selectedCita) {
      navigation.navigate('AppointmentDetail', { appointment: selectedCita, isDoctor: isDoctor });
      setModalVisible(false);
    } else {
      console.error("selectedCita es null, no se puede reprogramar la cita");
    }
  };

  const handleCancel = async () => {
    if (selectedCita) {
      await submitAppointment(selectedCita, 3);
      console.log("Cancelar cita", selectedCita);
      setModalVisible(false);
    } else {
      console.error("selectedCita es null, no se puede cancelar la cita");
    }
  };

  const submitAppointment = async (cita: Appointment, estado: number) => {
    const appointmentData = {
      doctor_id: cita.doctor.id,
      date: cita.date,
      observation: cita.observation,
      time: cita.time,
      is_active: estado
    };

    try {
      console.log(API_TOKEN);
      console.log(appointmentData);
      const url = `${URL_APPOINTMENT_EDIT}${cita?.id}/`;
      console.log(url, appointmentData);
      const response = await axios.put(url, appointmentData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`,
        },
      });

      console.log(response.status);

      if (response.status === 200) {
        Alert.alert('Success', 'Cita cancelada correctamente.');
        fetchAppointments(); 
      } else {
        Alert.alert('Error', 'No se pudo cancelar la cita.');
      }

    } catch (error) {
      console.error('Error al actualizar cita:', error);
      Alert.alert('Error', 'Ocurrió un error al actualizar la cita.');
    }
  };

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

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => {
        if (!isDoctor) {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('Search')}
              style={{ marginRight: 10 }}
            >
              <Text style={{ fontSize: 40, fontWeight: 'bold', color: globalColors.primary }}>+</Text>
            </TouchableOpacity>
          );
        }
        return null; // Devolver null si isDoctor es true para ocultar el componente
      },
    });
  }, [navigation, isDoctor]);
  

  return (
    <PaperProvider>
      <View style={globalStyles.containerCitasScreen}>
        <Text style={globalStyles.welcomeText}>
          Bienvenido <Text style={[globalStyles.welcomeText, { color: globalColors.secondary }]}></Text> a tus citas.
        </Text>

        <Searchbar
          placeholder="Buscar nombre de Doctor"
          onChangeText={handleSearch}
          value={searchQuery}
          icon={'Search'}
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
                onPress={() => handlePressCita(cita)}
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
        
        <Portal>
          <Modal visible={modalVisible} onDismiss={() => setModalVisible(false)} contentContainerStyle={globalStyles.modalContainer}>
            <Text style={[globalStyles.welcomeText, {color: globalColors.white}]}>Selecciona una opción</Text>
            <Button mode="contained" onPress={handleReprogram} style={[globalStyles.modalButton, {backgroundColor: globalColors.primary}]}>
              Reprogramar Cita
            </Button>
            <Button mode="contained" onPress={handleCancel} style={[globalStyles.modalButton, {backgroundColor: globalColors.primary}]}>
              Cancelar Cita
            </Button>
            <Button mode="contained" onPress={() => setModalVisible(false)} style={[globalStyles.modalButton, {backgroundColor: globalColors.red}]}>
              Cerrar
            </Button>
          </Modal>
        </Portal>
        
        <FlashMessage position="top" />
      </View>
    </PaperProvider>
  );
};

export default AppointmentSearch;