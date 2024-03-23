import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { LogoShared, PrimaryButtonShared, TitleShared } from '../components';

export const GetStartedScreen = () => {
  return (
    <>
      <View style={ styles.content }>
        <LogoShared />
        <TitleShared
          label={ 'Planea tu' }
          labelBold={ 'Cita' }
          subtitle={ 'Reserva con uno de nuestros mejores médicos.' }
        />
      </View>
      <View style={ styles.content }>
      <PrimaryButtonShared
          label={ 'Acceder' }
          marginTop={ 15 }
          backgroundColor={ '#36CFC9' }
        />
       <PrimaryButtonShared
          label={ 'Acceder' }
          marginTop={ 15 }
          backgroundColor={ '#dfe5e5' }
        />
      </View>
    </>
  );
};


const styles = StyleSheet.create( {
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#36CFC9',
    padding: 15,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
} );