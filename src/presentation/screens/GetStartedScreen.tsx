import React, {  useEffect } from 'react';
import { View } from 'react-native';
import { type NavigationProp, useNavigation } from '@react-navigation/native';

import { FAB } from 'react-native-paper';

import { LogoShared, TitleShared } from '../components';
import { globalStyles } from '../theme';
import type { RootStackParams } from '../routes/StackNavigator';


export const GetStartedScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

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
        style={ { backgroundColor: '#36CFC9', margin: 10 } }
        icon={ 'log-in-outline' }
        label={ 'Acceder' }
        onPress={ () => navigation.navigate( 'SignIn' as never) }
      />
      
      <FAB
        style={ { backgroundColor: '#d2dbd2', margin: 10, marginBottom: 100,  } }
        icon={ 'pencil-outline' }
        label={ 'Registrar' }
        color={ '#000' }
        onPress={ () => navigation.navigate( 'SignUp' as never) }
      />
    </>
  );
};