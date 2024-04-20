import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { globalColors } from '../theme';
import { URL_DOCTORS } from '@env';
import { PersonTagShared } from '../components';

export const SearchScreen = () => {

  const [ searchQuery, setSearchQuery ] = React.useState( '' );
  const [ doctors, setDoctors ] = useState( [] );


  const consultAPI = useCallback( async () => {
    try {
      const response = await fetch( URL_DOCTORS );
      const data = await response.json();
      setDoctors( data );
    } catch ( error ) {
      console.error( error );
    }
  }, [] );


  useEffect( () => {
    consultAPI();
  }, [ consultAPI ] );

  return (
    <View style={ styles.container }>
      <Text style={ styles.welcomeText }>Bienvenido { 'usuario' }</Text>
      <Text style={ styles.subtitle }>Busca el doctor que más se adapte a tus necesidades</Text>

      <Searchbar
        placeholder="Buscar doctor"
        onChangeText={ setSearchQuery }
        value={ searchQuery }
        icon={ 'search-circle-outline' }
        style={ { marginTop: 15 } }
        onPressIn={ () => consultAPI() }
      />

      <ScrollView style={ styles.scrollView }>
        { doctors.map( ( doctor: any, index: number ) => (
          <PersonTagShared
            key={ index }
            name={ `${ doctor.name } ${ doctor.last_name }` }
            description={ doctor.speciality }
            location={ doctor.phone }
            imageSource={ require( '../../assets/img/doctor.png' ) }
          />
        ) )
        }
      </ScrollView>
    </View>
  );
};


const styles = StyleSheet.create( {
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  scrollView: {
    width: '100%',
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
} );
