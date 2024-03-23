import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LogoShared, TitleShared } from '../components';

export const WelcomeScreen = ( ) => {
  return (
    <>
      <View style={ styles.content }>
        <LogoShared />
        <TitleShared
          label={ 'Doctor' }
          labelBold={ 'Link' }
          subtitle={ 'Encuentra a los mejores médicos.' }
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
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
} );
