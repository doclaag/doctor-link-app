import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { globalColors } from '../theme';
import { URL_DOCTORS } from '@env';
import { PersonTagShared } from '../components';

interface Doctor {
  name: string;
  last_name: string;
  speciality: string[];
  phone: string;
}

export const SearchScreen = () => {

  const [ searchQuery, setSearchQuery ] = useState( '' );
  const [ doctors, setDoctors ] = useState<Doctor[]>( [] );
  const [ page, setPage ] = useState( 1 );

  const consultAPI = useCallback( async ( page: number ) => {
    try {
      const response = await fetch( `${ URL_DOCTORS }?page=${ page }&limit=8` );
      const data: Doctor[] = await response.json();
      setDoctors( prevDoctors => [ ...prevDoctors, ...data ] );
    } catch ( error ) {
      console.error( error );
    }
  }, [] );

  useEffect( () => {
    consultAPI( page );
  }, [ consultAPI, page ] );

  const handleScroll = ( event: { nativeEvent: { contentOffset: { y: number; }; layoutMeasurement: { height: number; }; contentSize: { height: number; }; }; } ) => {
    if ( event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height >= event.nativeEvent.contentSize.height ) {
      setPage( prevPage => prevPage + 1 );
    }
  };

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
        onPressIn={ () => consultAPI( page ) }
      />

      <ScrollView style={ styles.scrollView } onScroll={ handleScroll }>
        { doctors.map( ( doctor, index ) => (
          <PersonTagShared
            key={ doctor.name } // Consider using a unique identifier
            name={ `${ doctor.name } ${ doctor.last_name }` }
            description={ doctor.speciality[ 0 ] }
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