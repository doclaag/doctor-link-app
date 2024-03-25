import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GetStartedScreen, SearchScreen } from './src/presentation/screens';

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
        <SearchScreen />
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