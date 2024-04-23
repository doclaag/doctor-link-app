import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, View, StyleSheet, ScrollView } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { FAB, Text, Searchbar } from 'react-native-paper';
import { globalColors } from '../theme';
import { URL_PATIENT_APPOINTMENTS } from '@env';
import { TitleSharedLittle } from '../components/shared/TitleSharedLittle';

interface Appoinments_Patient{
  nombre: string;
  observation: string;
  doctor: string;
  patient: string;
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
      doctor.nombre.toLowerCase().includes(query.toLowerCase())
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
          onChangeText={handleSearch} // Modificar para llamar a la función handleSearch
          value={searchQuery}
          icon={'search-circle-outline'}
          style={{ marginTop: 15 }}
        />
        <ScrollView style={styles.scrollView} onScroll={handleScroll}>
          {doctors.map((doctor, index) => (
            <PersonTag
              key={index} 
              name={`${doctor.nombre}`}
              observation={doctor.observation}
              doctor={doctor.doctor}
              patient={doctor.patient}
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
const PersonTag = ({ name, observation, doctor, time, patient }: { 
  name: string; 
  observation: string; 
  doctor: string; 
  patient: string;
  time: string; 
}) => {
  return (
    <View style={styles.personContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{observation}</Text>
        <Text style={styles.description}>{time}</Text>
        <Text style={styles.name}>{doctor}</Text>
        <Text style={styles.name}>{patient}</Text>
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
   personContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    borderWidth: 1, 
    borderColor: 'lightgray', 
    borderRadius: 5, 
    padding: 10, 
    backgroundColor: globalColors.skyblue, 
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
    scrollView: {
    width: '100%',
  },
});
