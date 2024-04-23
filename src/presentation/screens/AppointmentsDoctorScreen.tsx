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
}

export const AppoinmentsDoctorScreen = () => {
  const navigation = useNavigation();
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
  // Función para filtrar las citas por nombre
  const filterAppointments = (query: string) => {
    return allDoctors.filter((doctor) =>
      doctor.observation.toLowerCase().includes(query.toLowerCase())
    );
  };

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setPage(1); 
    setDoctors(filterAppointments(query)); 
  };

  const consultAPI = useCallback( async ( page: number ) => {
    try {
      const response = await fetch( `${ URL_PATIENT_APPOINTMENTS }?page=${ page }&limit=8` );
      const data: Appoinments_Patient[] = await response.json();
      setDoctors( prevDoctors => [ ...prevDoctors, ...data ] );
    } catch ( error ) {
      console.error( error );
    }
  }, [] );
  useEffect( () => {
    consultAPI( page );
  }, [ consultAPI, page ] );

   useEffect(() => {
    setDoctors(filterAppointments(searchQuery));
  }, [allDoctors, searchQuery]);


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
          onChangeText={handleSearch} 
          value={searchQuery}
          icon={'search-circle-outline'}
        />
        <ScrollView style={styles.scrollView} onScroll={handleScroll}>
          {doctors.map((doctor, index) => (
            <PersonTag
              key={index} 
              date={`${doctor.date}`}
              observation={doctor.observation}
              time={doctor.time}
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
const PersonTag = ({ date, observation, time }: { 
  date: string; 
  observation: string; 
  time: string; 
}) => {
  return (
    <View style={ globalStyles.cardContainer }>
      <View style={styles.textContainer}>
        <Text style={styles.fecha}>Fecha: {date}</Text>
        <Text style={styles.description}>Observación: {observation}</Text>
        <Text style={styles.time}>Horario: {time}</Text>
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
  }
});
