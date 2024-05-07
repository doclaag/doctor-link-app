// Importa useState
import React, { useState, useEffect } from 'react';
import { Pressable, Text, View, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp, useNavigation, DrawerActions } from '@react-navigation/native';
import { TitleShared } from '../components';
import { globalStyles } from '../theme';
import { RootStackParams } from '../routes/StackNavigator';
import { Calendar } from 'react-native-calendars';
import { TimePickerModal } from 'react-native-paper-dates';
import { Button, IconButton } from 'react-native-paper';

import { registerTranslation } from 'react-native-paper-dates'
registerTranslation('pl', {
  save: 'Save',
  selectSingle: 'Select date',
  selectMultiple: 'Select dates',
  selectRange: 'Select period',
  notAccordingToDateFormat: (inputFormat: any) => `Date format must be ${inputFormat}`,
  mustBeHigherThan: (date: any) => `Must be later then ${date}`,
  mustBeLowerThan: (date: any) => `Must be earlier then ${date}`,
  mustBeBetween: (startDate: any, endDate: any) => `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: 'Day is not allowed',
  previous: 'Previous',
  next: 'Next',
  typeInDate: 'Type in date',
  pickDateFromCalendar: 'Pick date from calendar',
  close: 'Close',
  hour: '',
  minute: ''
});

export const AppointmentTimeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [isTimePickerVisible, setTimePickerVisible] = useState(false);
  const [isTooltipVisible, setTooltipVisible] = useState(false); // Estado para controlar la visibilidad del Tooltip

  const toggleTooltip = () => {
    setTooltipVisible(!isTooltipVisible); // Alternar el estado entre true y false
  };


  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
          <Text>Menu</Text>
        </Pressable>
      ),
    });
  }, []);

  const showTimePicker = () => {
    setTimePickerVisible(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisible(false);
  };

  const handleConfirm = ({ hours, minutes }: { hours: number, minutes: number }) => {
    setSelectedTime(`${hours}:${minutes}`);
    hideTimePicker();
  };

  const handleDateSelect = (day: any) => {
    const selectedDateString = day.dateString || day.date;
    setSelectedDate(selectedDateString);
  };

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    // Implementa aquí la lógica para manejar el envío del formulario de cita
  };

  return (
    <View style={globalStyles.centerContainerAppointmentTime}>
      <TitleShared
        label={'Nueva'}
        labelBold={'Cita'}
        subtitle={'Cita programada con el {Dr.Name}'}
      />

      <View style={[globalStyles.infoContainer, { width: '90%', alignSelf: 'center' }]}>
        <Text style={globalStyles.titleAppointmentTime}>Fecha y Hora</Text>
        <View style={globalStyles.infoItem}>
          <Text style={globalStyles.labelNegrita}>Fecha:</Text>
          <Text style={globalStyles.info}>{selectedDate}</Text>
        </View>
        <View style={globalStyles.infoItem}>
          <Text style={globalStyles.labelNegrita}>Hora:</Text>
          <Text style={globalStyles.info}>{selectedTime}</Text>
        </View>
      </View>

      <View style={{ width: '90%', height: 320, borderRadius: 10, alignSelf: 'center' }}>
        <Calendar
          monthNames={['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']}
          dayNames={['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']}
          onDayPress={handleDateSelect}
          markedDates={{ [selectedDate]: { selected: true } }}
          monthNamesShort={['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']}
          dayNamesShort={['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb']}
          firstDay={1}
          theme={{
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          }}
        />
      </View>

      <TimePickerModal
        visible={isTimePickerVisible}
        onDismiss={hideTimePicker}
        onConfirm={handleConfirm}
        hours={12}
        minutes={0}
      />

      <TouchableOpacity
        style={globalStyles.timePickerButton}
        onPress={showTimePicker}
      >
        <Text style={globalStyles.actionButtonText}>Seleccionar una hora</Text>
      </TouchableOpacity>

      {/* Icono para desplegar el Tooltip */}
      <IconButton
        icon="add"
        iconColor='blue'
        size={30}
        style={{ position: 'absolute', bottom: 20, right: 20 }}
        onPress={toggleTooltip} // Alternar el estado al presionar el icono
      />

      {/* Tooltip con dos botones, se renderiza condicionalmente */}
      {isTooltipVisible && (
        <View style={{ position: 'absolute', bottom: 80, right: 20 }}>
          <View style={{ backgroundColor: 'white', padding: 10, borderRadius: 5 }}>
            <Button onPress={handleSubmit} mode="outlined" style={{ marginBottom: 10}}>Agendar cita</Button>
            <Button onPress={() => setTooltipVisible(false)} mode="outlined">Cancelar cita</Button>
          </View>
        </View>
      )}
    </View>

  );
};

