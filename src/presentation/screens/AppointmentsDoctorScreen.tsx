import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { FAB, Text, Searchbar } from 'react-native-paper';
import { globalColors, globalStyles } from '../theme';
import { URL_PATIENT_APPOINTMENTS } from '@env';
import { TitleSharedLittle } from '../components/shared/TitleSharedLittle';

interface Appoinments_Patient{
  date: string;
  observation: string;
  time: string;
  is_active: boolean; 
}

export const AppoinmentsDoctorScreen = () => {
  const navigation = useNavigation();
  const [searchPressed, setSearchPressed ] = useState( false );
  const [searchQuery, setSearchQuery] = useState('');
  const [allDoctors, setAllDoctors] = useState<Appoinments_Patient[]>([]);
  const [ doctors, setDoctors ] = useState<Appoinments_Patient[]>( [] );
  const [ page, setPage ] = useState( 1 );

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
          <Text>Menu</Text>
        </Pressable>
      ),
    });
  }, []);

  const consultAPI = useCallback( async ( page: number, query: string ) => {
    try {
      const response = await fetch( `${ URL_PATIENT_APPOINTMENTS }?page=${ page }&limit=8&query=${ query }` );
      const data: Appoinments_Patient[] = await response.json();
      setDoctors( prevDoctors => [ ...prevDoctors, ...data ] );
    } catch ( error ) {
      console.error( error );
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
    <>
      <View style={styles.container}>
        <TitleSharedLittle label={'Doctor Link, '} labelBold={'Citas'} />
        <Searchbar
          placeholder="Busca tu cita..."
          onChangeText={setSearchQuery} 
          value={searchQuery}
          icon={'search-circle-outline'}
        />
        <ScrollView style={styles.scrollView} onScroll={handleScroll}>
          { doctors.filter( doctor => {
          const SearchObservation = `${ doctor.observation }`;
          return SearchObservation.toLowerCase().includes( searchQuery.toLowerCase() );
        } ).map( ( doctor, index ) => (
            <PersonTag
              key={index} 
              date={`${doctor.date}`}
              observation={doctor.observation}
              time={doctor.time}
              isActive={doctor.is_active} 
            />
          ))}
        </ScrollView>
      </View>
      <View style={styles.bottomContainer}>
        <FAB
          style={styles.fabButton}
          icon={'log-in-outline'}
          label={'Regresar'}
          onPress={() => navigation.navigate('GetStarted' as never)}
        />
      </View>
    </>
  );
};
  const PersonTag = ({ date, observation, time, isActive }: { 
    date: string; 
    observation: string; 
    time: string; 
    isActive: boolean; 
  }) => {
    return (
      <View style={[globalStyles.cardContainer, isActive ? styles.active : styles.cancelled]}>
        <View style={styles.textContainer}>
          <Text style={styles.fecha}>Fecha: {date}</Text>
          <Text style={styles.description}>Observación: {observation}</Text>
          <Text style={styles.time}>Horario: {time}</Text>
          <Text style={styles.status}>{isActive ? <Text>Pendiente</Text> : <Text>Cancelada</Text>}</Text>
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
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'flex-start', 
    marginLeft: 20, 
  },
  fabButton: {
    backgroundColor: 'red',
  },
  textContainer: {
    flex: 1,
  },
  fecha: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 20,
    fontWeight: 'bold',
  },
    scrollView: {
    width: '100%',
  },
  time:{
    fontSize: 16,
    fontWeight: 'bold',
  },
  active: {
    backgroundColor: 'green',
  },
  cancelled: {
    backgroundColor: 'red',
  },
  status: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'right',
  }
});  