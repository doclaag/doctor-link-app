import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GetStartedScreen, SearchScreen, SignUpScreen, SignInScreen, WelcomeScreen } from './src/presentation/screens';

import { PaperProvider } from 'react-native-paper';

import IonIcons from 'react-native-vector-icons/Ionicons';

const App = (): React.JSX.Element => {
  return (
    <PaperProvider
      settings={ {
        icon: ( props ) => <IonIcons { ...props } />,
      } }
    >
      <SafeAreaView style={ styles.container }>
        <WelcomeScreen />
      </SafeAreaView>
    </PaperProvider>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
} );

export default App;