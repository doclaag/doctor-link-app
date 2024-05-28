import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { globalStyles, globalColors } from '../theme';
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from '../routes/StackNavigator';
import { URL_APPOINTMENT_EDIT, API_TOKEN } from '@env';
import axios from 'axios';

type AppointmentDetailRouteProp = RouteProp<RootStackParams, 'AppointmentDetail'>;

interface AppointmentDetailProps {
  route: AppointmentDetailRouteProp;
}

interface Appointment {
  id: string;
  doctor: {
    id: string;
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

export const AppointmentDetail = ({ route }: AppointmentDetailProps) => {
  const { appointment, isDoctor } = route.params;

  const [date, setDate] = useState(appointment.date || '');
  const [observation, setObservation] = useState(appointment.observation || '');
  const [time, setTime] = useState(appointment.time || '');
  const [status, setStatus] = useState(appointment.is_active_display || '');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  useEffect(() => {
    if (isDoctor) {
      console.log("Es doctor.");
    }
  }, [isDoctor]);

  const handleConfirmDate = (selectedDate: Date) => {
    const currentDate = selectedDate || new Date(date);
    setDate(currentDate.toISOString().split('T')[0]);
    setDatePickerVisibility(false);
  };

  const handleConfirmTime = (selectedTime: Date) => {
    const currentTime = selectedTime || new Date(time);
    setTime(currentTime.toTimeString().split(' ')[0]);
    setTimePickerVisibility(false);
  };

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  const submitAppointment = async () => {
    let isActiveCode = 4; // Default for non-doctors

    if (isDoctor) {
      const statusMap: { [key: string]: number } = {
        PROCESADA: 1,
        CONFIRMADA: 2,
        CANCELADA: 3,
        REPROGRAMADA: 4,
        FINALIZADA: 5,
      };
      isActiveCode = statusMap[status]; // Default to CANCELADA if not found
    }

    const appointmentData = {
      doctor_id: appointment.doctor.id,
      date: date,
      observation: observation,
      time: time,
      is_active: isActiveCode,
    };

    try {

      const url = `${URL_APPOINTMENT_EDIT}${appointment.id}/`;
      console.log(url);
      console.log(appointmentData);
      const response = await axios.put(url, appointmentData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_TOKEN}`,
        },
      });

      console.log(response.status);

      if (response.status === 200) {
        Alert.alert('Success', 'Cita actualizada correctamente.');
      } else {
        Alert.alert('Error', 'No se pudo actualizar la cita.');
      }
      
    } catch (error) {
      console.error('Error al actualizar cita:', error);
      Alert.alert('Error', 'Ocurrió un error al actualizar la cita.');
    }
  };

  return (
    <ScrollView style={globalStyles.containerCitasScreen}>
      <Text style={[globalStyles.welcomeText, { color: globalColors.secondary }]}>Detalles de la Cita</Text>

      <View style={globalStyles.detailContainer}>
        <Text style={[globalStyles.label, { color: globalColors.black }]}>Doctor:</Text>
        <Text style={[globalStyles.value, { color: globalColors.black }]}>{`${appointment.doctor.name} ${appointment.doctor.last_name}`}</Text>
      </View>

      <View style={globalStyles.detailContainer}>
        <Text style={[globalStyles.label, { color: globalColors.black }]}>Paciente:</Text>
        <Text style={[globalStyles.value, { color: globalColors.black }]}>{`${appointment.patient.name} ${appointment.patient.last_name}`}</Text>
      </View>

      <View style={globalStyles.detailContainer}>
        <Text style={[globalStyles.label, { color: globalColors.black }]}>Fecha:</Text>
        <TouchableOpacity onPress={() => setDatePickerVisibility(true)}>
          <TextInput
            style={[globalStyles.input, { color: globalColors.black }]}
            value={date}
            editable={false}
          />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirmDate}
        onCancel={() => setDatePickerVisibility(false)}
      />

      <View style={globalStyles.detailContainer}>
        <Text style={[globalStyles.label, { color: globalColors.black }]}>Hora:</Text>
        <TouchableOpacity onPress={() => setTimePickerVisibility(true)}>
          <TextInput
            style={[globalStyles.input, { color: globalColors.black }]}
            value={time}
            editable={false}
          />
        </TouchableOpacity>
      </View>
      <DateTimePickerModal
        isVisible={isTimePickerVisible}
        mode="time"
        onConfirm={handleConfirmTime}
        onCancel={() => setTimePickerVisibility(false)}
      />

      <View style={globalStyles.detailContainer}>
        <Text style={[globalStyles.label, { color: globalColors.black }]}>Observación:</Text>
        <TextInput
          style={[globalStyles.input, { color: globalColors.black }]}
          value={observation}
          onChangeText={setObservation}
        />
      </View>

      {isDoctor && (
        <View style={globalStyles.detailContainer}>
          <Text style={[globalStyles.label, { color: globalColors.black }]}>Estado:</Text>
          <Picker
            selectedValue={status}
            style={[globalStyles.picker, { color: globalColors.black }]}
            onValueChange={(itemValue: string) => handleStatusChange(itemValue)}
          >
            <Picker.Item label="Procesada" value="PROCESADA" />
            <Picker.Item label="Confirmada" value="CONFIRMADA" />
            <Picker.Item label="Cancelada" value="CANCELADA" />
            <Picker.Item label="Reprogramada" value="REPROGRAMADA" />
            <Picker.Item label="Finalizada" value="FINALIZADA" />
          </Picker>
        </View>
      )}

      <TouchableOpacity style={globalStyles.button} onPress={submitAppointment}>
        <Text style={[globalStyles.buttonText, { color: globalColors.black }]}>Guardar</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default AppointmentDetail;