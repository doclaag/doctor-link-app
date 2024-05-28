import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { GetStartedScreen, SearchScreen, SignInScreen, SignUpScreen, WelcomeScreen, AppointmentTimeScreen, AppointmentSearch, AppointmentDetail, } from '../screens';
import DoctorInformationScreen from '../screens/DoctorInformationScreen';
import { AppoinmentsDoctorScreen } from '../screens/AppointmentsDoctorScreen';


export type RootStackParams = {
  Welcome: undefined;
  GetStarted: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Search: undefined;
  DoctorIn: undefined;
  DoctorInformation: { doctorId: string };
  DoctorInformationScreen: {doctorId: string };
  AppointmentTime: { doctorId: string };
  AppointmentDetail: { appointment: any, isDoctor: boolean }; // Añade la nueva pantalla aquí
  AppointmentSearch: undefined;
  AppoinmentsDoctor: undefined;
};

const Stack = createStackNavigator<RootStackParams>();

const initialAppointment = {
  doctor: { name: 'Michael', last_name: 'Smith' },
  patient: { name: 'Daniel', last_name: 'Escobar' },
  date: '2024-06-05',
  observation: 'dolor de panza',
  time: '06:00:00',
  is_active_display: 'CONFIRMADA',
};

export const StackNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Search">
    <Stack.Screen
      name="Welcome"
      component={WelcomeScreen}
      options={{ title: ''}} 
    />
    <Stack.Screen
      name="SignIn"
      component={SignInScreen}
      options={{ title: ''}} 
    />
    <Stack.Screen
      name="SignUp"
      component={SignUpScreen}
      options={{ title: ''}} 
    />
    <Stack.Screen
      name="AppointmentSearch"
      component={AppointmentSearch}
      options={{ title: 'Buscar Cita' }}
    />
    <Stack.Screen
      name="Search"
      component={SearchScreen}
      options={{ title: ''}} 
    />
    <Stack.Screen
      name="GetStarted"
      component={GetStartedScreen}
      options={{ title: ''}} 
    />
    <Stack.Screen
      name="AppointmentTime"
      component={AppointmentTimeScreen}
      options={{ title: ''}} 
    />
    <Stack.Screen
    name="AppoinmentsDoctor"
    component={AppoinmentsDoctorScreen}
    options={{ title: ''}} 
  />
  <Stack.Screen
      name="DoctorInformationScreen"
      component={DoctorInformationScreen}
      options={{ title: ''}} 
    />
    <Stack.Screen
      name="DoctorIn"
      component={DoctorInformationScreen}
      options={{ title: ''}} 
    />
       <Stack.Screen
        name="AppointmentDetail"
        component={AppointmentDetail}
        initialParams={{ appointment: initialAppointment }}
        options={{ title: 'Detalles de la Cita' }}
      />
    </Stack.Navigator>
  );
};