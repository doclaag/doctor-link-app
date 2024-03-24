import React from 'react';
import { View } from 'react-native';
import { LogoShared, TitleShared } from '../components';
import { globalStyles } from '../theme';

export const WelcomeScreen = () => {
  return (
    <>
      <View style={ globalStyles.centerContainer }>
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
