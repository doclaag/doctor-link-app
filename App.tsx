import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { GetStartedScreen } from './src/presentation/screens';


const App = (): React.JSX.Element => {
  return (
    <SafeAreaView style={ styles.container }>
      <GetStartedScreen />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },
} );

export default App;