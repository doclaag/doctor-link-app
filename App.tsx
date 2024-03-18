import React from 'react';
import { SafeAreaView, Text, StyleSheet, Pressable, View, Image } from 'react-native';

const Title = () => (
  <Text style={ styles.title }>
    Doctor { '' }
    <Text style={ styles.title_bold }>Link</Text>
  </Text>
);

const App = (): React.JSX.Element => {
  return (
    <SafeAreaView style={ styles.container }>
      <View style={ styles.content }>
        <View style={ styles.imageContainer }>
          <Image
            source={ require( './src/assets/img/doctor-link.jpg' ) }
            style={ styles.image }
          />
        </View>
        <Title />
        <Text style={ styles.subtitle }>Encuentra a los mejores médicos.</Text>
        <Pressable style={ styles.button }>
          <Text style={ styles.buttonText }>Iniciar</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create( {
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    color: '#36CFC9',
    fontWeight: '600',
  },
  title_bold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 20,
    color: '#374151',
  },
  button: {
    backgroundColor: '#36CFC9',
    padding: 15,
    marginTop: 365,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
  },
} );

export default App;