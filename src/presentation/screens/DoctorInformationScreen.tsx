import React, { useEffect, useState } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { globalStyles, globalColors } from '../theme';
import { FAB } from 'react-native-paper';
import { URL_DOCTORS_ID, API_TOKEN } from '@env';
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from '../routes/StackNavigator';
import * as Animatable from 'react-native-animatable';

type DoctorInformationScreenRouteProp = RouteProp<RootStackParams, 'DoctorInformation'>;

interface Doctor {
  id: string;
  name: string;
  last_name: string;
  gender: number;
  speciality: string;
  phone: string;
  no_collegiate: string;
}

const DoctorInformationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<DoctorInformationScreenRouteProp>();
  const { doctorId } = route.params;
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorData = async () => {
      const headers = new Headers({
        'Authorization': `Bearer ${API_TOKEN}`,
        'Content-Type': 'application/json'
      });

      try {
        const response = await fetch(`${URL_DOCTORS_ID}${doctorId}`, { method: 'GET', headers });
        const data: Doctor = await response.json();
        setDoctor(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorData();
  }, [doctorId]);

  if (!doctor) {
    return (
      <View style={globalStyles.loadingContainer}>
        <ActivityIndicator size="large" color={globalColors.primary} />
        <Text style={globalStyles.loadingText}>Cargando...</Text>
      </View>
    );
  }

  return (
    <Animatable.View animation="fadeIn" duration={600} style={globalStyles.containerDoctorInformation}>
      <View style={globalStyles.profileHeader}>
        <View style={globalStyles.profileAvatar}>
          <Image
            source={doctor.gender === 0 ? require('../../assets/img/doctor.png') : require('../../assets/img/doctora.png')}
            style={globalStyles.avatarImage}
          />
        </View>
        <Text style={globalStyles.doctorName}>{`${doctor.name} ${doctor.last_name}`}</Text>
      </View>
      <View style={globalStyles.profileSpecialties}>
        <Text style={globalStyles.specialtiesTitle}>Especialidades:</Text>
        <View style={globalStyles.specialtiesList}>
          <Text style={globalStyles.speciality}>{doctor.speciality}</Text>
        </View>
      </View>
      <View style={globalStyles.bottomContainer}>
        <FAB
          style={globalStyles.fabButton}
          icon={'log-in-outline'}
          label={'Regresar'}
          onPress={() => navigation.goBack()}
        />
      </View>
    </Animatable.View>
  );
};


export default DoctorInformationScreen;
