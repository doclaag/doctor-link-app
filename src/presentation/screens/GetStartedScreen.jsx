import React from 'react';
import { StyleSheet, View } from 'react-native';
import { LogoShared, PrimaryButtonShared, TitleShared } from '../components';

export const GetStartedScreen = () => {
  return (
    <>
      <View style={ styles.content }>
        <View style={ styles.imageContainer }>
        <LogoShared />
        </View>
        <TitleShared
          label={ 'Doctor' }
          labelBold={ 'Link' }
          subtitle={ 'Encuentra a los mejores médicos.' }
        />
        <PrimaryButtonShared
          label={ 'Iniciar' }
        />
      </View>
    </>
  );
};


const styles = StyleSheet.create( {
  content: {
    flex: 1,
    justifyContent: 'center',
  }
} );
