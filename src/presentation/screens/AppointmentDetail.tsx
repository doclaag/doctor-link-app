import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { globalStyles, globalColors } from '../theme';
import { RouteProp } from '@react-navigation/native';
import { RootStackParams } from '../routes/StackNavigator';

type AppointmentDetailRouteProp = RouteProp<RootStackParams, 'AppointmentDetail'>;

interface AppointmentDetailProps {
  route: AppointmentDetailRouteProp;
}

export const AppointmentDetail = ({ route }: AppointmentDetailProps) => {
  const appointment = route.params.appointment;

  const [date, setDate] = useState(appointment.date || '05-05-2024');
  const [observation, setObservation] = useState(appointment.observation || 'dolor de panza');
  const [time, setTime] = useState(appointment.time || '06:00:00');
  const [status, setStatus] = useState(appointment.is_active_display || 'CONFIRMADA');

  const handleStatusChange = (value: string) => {
    setStatus(value);
  };

  return (
    <ScrollView style={globalStyles.containerCitasScreen}>
      <Text style={[globalStyles.welcomeText, {color: globalColors.secondary}]}>Detalles de la Cita</Text>

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
        <TextInput
          style={[globalStyles.input, { color: globalColors.black }]}
          value={date}
          onChangeText={setDate}
        />
      </View>

      <View style={globalStyles.detailContainer}>
        <Text style={[globalStyles.label, { color: globalColors.black }]}>Hora:</Text>
        <TextInput
          style={[globalStyles.input, { color: globalColors.black }]}
          value={time}
          onChangeText={setTime}
        />
      </View>

      <View style={globalStyles.detailContainer}>
        <Text style={[globalStyles.label, { color: globalColors.black }]}>Observación:</Text>
        <TextInput
          style={[globalStyles.input, { color: globalColors.black }]}
          value={observation}
          onChangeText={setObservation}
        />
      </View>

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

      <TouchableOpacity style={globalStyles.button} onPress={() => console.log("Save changes")}>
        <Text style={[globalStyles.buttonText, { color: globalColors.black }]}>Guardar Cambios</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};
