import React, { useEffect } from 'react';
import { Pressable,  View } from 'react-native';
import { type NavigationProp, useNavigation, DrawerActions } from '@react-navigation/native';

import { LogoShared, TitleShared } from '../components';
import { globalStyles } from '../theme';
import { FAB, Text } from 'react-native-paper';
import type { RootStackParams } from '../routes/StackNavigator';


export const WelcomeScreen = () => {

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer) }>
          <Text>Menu</Text>
        </Pressable>
      ),
    });
  }, []);

  return (
    <>
      <View style={ globalStyles.centerContainer }>
        <LogoShared />
        <TitleShared
          label={ 'Doctor' }
          labelBold={ 'Link' }
          subtitle={ 'Encuentra a los mejores médicos.' }
        />
        <FAB
        style={ { backgroundColor: '#36CFC9', margin: 10 } }
        icon={ 'log-in-outline' }
        label={ 'Acceder' }
        onPress={ () => navigation.navigate( 'GetStarted' as never) }
      />
      </View>
    </>
  );
};
