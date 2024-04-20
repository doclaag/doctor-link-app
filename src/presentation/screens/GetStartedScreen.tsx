import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { type NavigationProp, useNavigation, DrawerActions } from '@react-navigation/native';

import { FAB } from 'react-native-paper';

import { LogoShared, TitleShared } from '../components';
import { globalColors, globalStyles } from '../theme';
import type { RootStackParams } from '../routes/StackNavigator';

import { URL_DOCTORS } from '@env';

export const GetStartedScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();
  
  const [appointments, setAppointments] = useState([]);


  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer) }>
          <Text>Menu</Text>
        </Pressable>
      ),
    });
  }, []);

  const consultAPI = useCallback(async () => {
    try {
      const response = await fetch(URL_DOCTORS);
      const data = await response.json();
      setAppointments(data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    consultAPI();
  }, [consultAPI]);

  return (
    <>
      <View style={ globalStyles.centerContainer }>
        <LogoShared />
        <TitleShared
          label={ 'Planea tu' }
          labelBold={ 'Cita' }
          subtitle={ 'Reserva con uno de nuestros mejores médicos.' }
        />
      </View>

      <FAB
        style={ { backgroundColor: '#36CFC9', margin: 10, marginBottom: 100 } }
        icon={ 'plus' }
        label={ 'Presionar' }
        onPress={ () => consultAPI() } 
      />

      {
        appointments.map((item: any) => (
          <Text key={ item.id_appointment }>
            Doctor: {item.doctor}
            {'\n'}
            Observasciones: { item.observation } {'\n'} Fecha: { item.date }
            </Text>
        ))
      }

      <FAB
        style={ { backgroundColor: '#36CFC9', margin: 10 } }
        icon={ 'log-in-outline' }
        label={ 'Acceder' }
        onPress={ () => navigation.navigate( 'SignIn' as never) }
      />
      
      <FAB
        style={ { backgroundColor: '#d2dbd2dd', margin: 10, marginBottom: 100,  } }
        icon={ 'pencil-outline' }
        label={ 'Registrar' }
        color={ '#000' }
        onPress={ () => navigation.navigate( 'SignUp' as never) }
      />
    </>
  );
};