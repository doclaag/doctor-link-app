import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { PaperProvider } from 'react-native-paper';
import IonIcons from 'react-native-vector-icons/Ionicons';

import { SideMenuNavigator, StackNavigator } from './src/presentation/routes';

const App = (): React.JSX.Element => {
  return (
    <NavigationContainer>
    <PaperProvider
      settings={ {
        icon: ( props ) => <IonIcons { ...props } />,
      } }
      >
      <SafeAreaView style={ styles.container }>
        <SideMenuNavigator/>
      </SafeAreaView>
    </PaperProvider>
      </NavigationContainer>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
} );

export default App;