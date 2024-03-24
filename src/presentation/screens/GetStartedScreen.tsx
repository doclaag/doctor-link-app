import React from 'react';
import { View } from 'react-native';
import { LogoShared, TitleShared } from '../components';
import { FAB } from 'react-native-paper';
import { globalStyles } from '../theme';

export const GetStartedScreen = () => {
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
      />
      
      <FAB
        style={ { backgroundColor: '#d2dbd2dd', margin: 10, marginBottom: 100,  } }
        icon={ 'pencil-outline' }
        label={ 'Registrar' }
        color={ '#000' }
      />
    </>
  );
};

