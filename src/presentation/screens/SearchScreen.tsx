import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Image } from 'react-native';
import { globalColors } from '../theme';

export const SearchScreen = () => {
  const [searchQuery, setSearchQuery] = React.useState('');
  
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Bienvenido {'usuario'}</Text>
      <Text style={styles.subtitle}>Busca el doctor que más se adapte a tus necesidades</Text>
        
      <Searchbar
        placeholder="Buscar doctor"
        onChangeText={setSearchQuery}
        value={searchQuery}
        icon={'search-circle-outline'}
        style={{marginTop: 15}}
      />

      {/* Integración del componente de etiqueta de persona */}
      <PersonTag 
        name="Nombre del Doctor" 
        description="Descripción del doctor o cualquier cosa" 
        location="Ubicación del doctor" 
        imageSource={require('../../assets/img/doctor.png')} 
      />
    </View>
  );
};

// Componente para la etiqueta de la persona
const PersonTag = ({ name, description, location, imageSource }: { 
  name: string; 
  description: string; 
  location: string; 
  imageSource: any 
}) => {
  return (
    <View style={styles.personContainer}>
      <View style={styles.imageContainer}>
        <Image source={imageSource} style={styles.image} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.location}>{location}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: globalColors.primary,
  },
  subtitle: {
    fontSize: 18,
    textAlign: 'justify',
    color: globalColors.secondary,
  },
  personContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  imageContainer: {
    marginRight: 10,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  location: {
    fontSize: 14,
    color: 'gray',
  },
});
