import { useState, useEffect } from 'react';
import { Pressable, Text, View, TouchableOpacity, Alert } from 'react-native';
import { NavigationProp, useNavigation, DrawerActions } from '@react-navigation/native';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { Button, IconButton } from 'react-native-paper';
import { TimePickerModal, registerTranslation } from 'react-native-paper-dates';

import moment from 'moment';
import 'moment/locale/es';

import { TitleShared } from '../components';
import { globalStyles } from '../theme';
import { RootStackParams } from '../routes/StackNavigator';

registerTranslation( 'es', {
  save: 'Guardar',
  selectSingle: 'Seleccionar fecha',
  selectMultiple: 'Seleccionar fechas',
  selectRange: 'Seleccionar periodo',
  notAccordingToDateFormat: ( inputFormat: any ) => `El formato de fecha debe ser ${ inputFormat }`,
  mustBeHigherThan: ( date: any ) => `Debe ser posterior a ${ date }`,
  mustBeLowerThan: ( date: any ) => `Debe ser anterior a ${ date }`,
  mustBeBetween: ( startDate: any, endDate: any ) => `Debe estar entre ${ startDate } - ${ endDate }`,
  dateIsDisabled: 'Día no permitido',
  previous: 'Anterior',
  next: 'Siguiente',
  typeInDate: 'Escribir fecha',
  pickDateFromCalendar: 'Seleccionar fecha del calendario',
  close: 'Cerrar',
  hour: '00',
  minute: '00',
} );

LocaleConfig.locales[ 'es' ] = {
  monthNames: [ 'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre' ],
  monthNamesShort: [ 'Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Sept.', 'Oct.', 'Nov.', 'Dic.' ],
  dayNames: [ 'Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado' ],
  dayNamesShort: [ 'Dom.', 'Lun.', 'Mar.', 'Mié.', 'Jue.', 'Vie.', 'Sáb.' ],
  today: 'Hoy'
};

LocaleConfig.defaultLocale = 'es';

export const AppointmentTimeScreen = () => {
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  const [ selectedDate, setSelectedDate ] = useState( '' );
  const [ selectedTime, setSelectedTime ] = useState( '' );
  const [ isTimePickerVisible, setTimePickerVisible ] = useState( false );
  const [ isTooltipVisible, setTooltipVisible ] = useState( false );
  const [ icon, setIcon ] = useState( "add" );

  const toggleTooltip = () => {
    setTooltipVisible( !isTooltipVisible );
  };

  const toggleIcon = () => {
    setIcon( icon === "add" ? "remove" : "add" );
  };
  const resetOpacity = () => {
    setTooltipVisible( false );
  };

  useEffect( () => {
    navigation.setOptions( {
      headerLeft: () => (
        <Pressable onPress={ () => navigation.dispatch( DrawerActions.toggleDrawer ) }>
          <Text>Menu</Text>
        </Pressable>
      ),
    } );
  }, [] );

  const showTimePicker = () => {
    setTimePickerVisible( true );
  };

  const hideTimePicker = () => {
    setTimePickerVisible( false );
  };

  const handleConfirm = ( { hours, minutes }: { hours: number, minutes: number; } ) => {
    const selectedTimeMoment = moment().set( { hours, minutes } ); // Crea un objeto moment con la hora seleccionada
    const openingTime = moment().set( { hours: 8, minutes: 0 } ); // Horario de apertura a las 8:00 AM
    const closingTime = moment().set( { hours: 18, minutes: 0 } ); // Horario de cierre a las 6:00 PM

    // Verifica si la hora seleccionada está dentro del rango permitido
    if ( selectedTimeMoment.isBefore( openingTime ) || selectedTimeMoment.isAfter( closingTime ) ) {
      Alert.alert( 'Error', 'El horario seleccionado está fuera del horario de atención (8:00 AM - 6:00 PM).' );
      return;
    }

    // Formato de 12 horas
    const formattedHours = hours < 10 ? `0${ hours }` : hours > 12 ? `0${ hours - 12 }` : hours;
    const period = hours >= 12 ? 'PM' : 'AM'; // AM o PM
    const formattedMinutes = minutes < 10 ? `0${ minutes }` : minutes;

    // Establece la hora seleccionada en el estado y oculta el selector de tiempo
    setSelectedTime( `${ formattedHours }:${ formattedMinutes } ${ period }` );
    hideTimePicker();
  };


  const handleDateSelect = ( day: any ) => {
    const selectedDate = moment( day.dateString || day.date )
      .locale( 'es' )
      .format( 'dddd DD [de] MMMM [del] YYYY' );

    setSelectedDate( selectedDate );
  };

  const handleSubmit = () => {
    const currentTime = moment().format( 'HH:mm' ); // Hora actual en formato HH:mm
    const selectedTimeMoment = moment( selectedTime, 'hh:mm A' );
    const openingTime = moment( '08:00 AM', 'hh:mm A' );
    const closingTime = moment( '06:00 PM', 'hh:mm A' );

    if ( !selectedDate || !selectedTime ) {
      Alert.alert( 'Error', 'Por favor completa todos los campos.' );
      return;
    }

    if ( selectedTimeMoment.isBefore( openingTime ) || selectedTimeMoment.isAfter( closingTime ) ) {
      Alert.alert( 'Error', 'El horario seleccionado está fuera del horario de atención (8:00 AM - 6:00 PM).' );
      return;
    }
  };

  return (
    <View style={ globalStyles.centerContainerAppointmentTime }>
      <TitleShared
        label={ 'Nueva' }
        labelBold={ 'Cita' }
        subtitle={ 'Cita programada con el Dr. Pedro Pablo' }
      />

      <View style={ [ globalStyles.infoContainer, { width: '90%', alignSelf: 'center' } ] }>
        <Text style={ globalStyles.titleAppointmentTime }>
          Fecha y Hora
        </Text>
        <View style={ globalStyles.infoItem }>
          <Text style={ globalStyles.labelNegrita }>
            Fecha:
          </Text>
          <Text style={ globalStyles.info }>
            { selectedDate }
          </Text>
        </View>

        <View style={ globalStyles.infoItem }>
          <Text style={ globalStyles.labelNegrita }>
            Hora:
          </Text>
          <Text style={ globalStyles.info }>
            { selectedTime }
          </Text>
        </View>
      </View>

      <View style={ { width: '90%', height: 350, borderRadius: 10, alignSelf: 'center' } }>
        <Calendar
          onDayPress={ handleDateSelect }
          markedDates={ { [ selectedDate ]: { selected: true } } }
          firstDay={ 1 }
          locate="es"
          theme={ {
            textDayFontSize: 16,
            textMonthFontSize: 16,
            textDayHeaderFontSize: 16,
          } }
        />

        <TimePickerModal
          visible={ isTimePickerVisible }
          onDismiss={ hideTimePicker }
          onConfirm={ handleConfirm }
          hours={ 10 }
          minutes={ 15 }
        />

        <TouchableOpacity
          style={ globalStyles.timePickerButton }
          onPress={ showTimePicker }
        >
          <Text style={ globalStyles.actionButtonText }>Seleccionar una hora</Text>
        </TouchableOpacity>
      </View>

      { isTooltipVisible && (
        <View style={ { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', zIndex: 1 } } />
      ) }
      <TouchableOpacity
        style={ {
          backgroundColor: 'white',
          position: 'absolute',
          bottom: 20,
          right: 20,
          zIndex: 2,
          borderRadius: 5000
        } }
        onPress={ () => {
          toggleIcon();
          toggleTooltip();
        } }
        onBlur={ () => resetOpacity() }
      >
        <IconButton
          icon={ icon }
          iconColor='blue'
          size={ 30 }
        />
      </TouchableOpacity>
      { isTooltipVisible && (
        <View style={ { position: 'absolute', bottom: 80, right: 20, zIndex: 2 } }>
          <View style={ { backgroundColor: 'transparent', padding: 10, borderRadius: 5 } }>
            <Button
              onPress={ handleSubmit }
              mode="outlined"
              labelStyle={ { color: 'mintcream', fontSize: 16, fontWeight: 'bold' } }
              style={ { backgroundColor: '#1A9DC7', marginBottom: 10 } }
            >
              Agendar cita
            </Button>

            <Button
              onPress={ () => setTooltipVisible( false ) }
              mode="outlined"
              labelStyle={ { color: 'mintcream', fontSize: 16, fontWeight: 'bold' } }
              style={ { backgroundColor: '#BB1515', marginBottom: 10 } }
            >
              Cancelar cita
            </Button>
          </View>
        </View>
      ) }
    </View>
  );
};