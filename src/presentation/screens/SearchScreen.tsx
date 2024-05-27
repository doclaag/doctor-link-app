import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, ScrollView, Button } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { globalColors, globalStyles } from '../theme';
import { URL_DOCTORS } from '@env';
import { DoctorTagShared } from '../components';

interface Doctor {
  name: string;
  last_name: string;
  speciality: string;
  phone: string;
  no_collegiate: string;
}

export const SearchScreen = () => {

  const [ searchQuery, setSearchQuery ] = useState( '' );
  const [ doctors, setDoctors ] = useState<Doctor[]>( [] );
  const [ page, setPage ] = useState( 1 );
  const [ searchPressed, setSearchPressed ] = useState( false );


  const consultAPI = useCallback( async ( page: number, query: string ) => {
    try {
      const response = await fetch( `${ URL_DOCTORS }?page=${ page }&limit=8&query=${ query }` );
      const data: Doctor[] = await response.json();
      setDoctors( prevDoctors => [ ...prevDoctors, ...data ] );
    } catch ( error ) {
      console.error( error );
      // TODO: Handle error in a user-friendly way
    }
  }, [] );

  useEffect( () => {
    consultAPI( page, searchQuery );
  }, [ consultAPI, page ] );

  useEffect( () => {
    if ( searchPressed ) {
      consultAPI( page, searchQuery );
      setSearchPressed( false );
    }
  }, [ consultAPI, page, searchPressed ] );

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
      />

      <ScrollView style={ styles.scrollView } onScroll={ handleScroll }>
        { doctors.filter( doctor => {
          const fullName = `${ doctor.name } ${ doctor.last_name }`;
          return fullName.toLowerCase().includes( searchQuery.toLowerCase() );
        } ).map( ( doctor, index ) => (
          <View style={ globalStyles.cardContainer } key={ index }>
            <DoctorTagShared
              name={ `${ doctor.name } ${ doctor.last_name }` }
              speciality={ doctor.speciality }
              phone={ doctor.phone }
              imageSource={ require( '../../assets/img/doctor.png' ) }
            />
          </View>
        ) ) }
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