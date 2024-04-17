import React, { useEffect, useState } from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { FAB, Text, Searchbar } from 'react-native-paper';
import { Image } from 'react-native';
import { TitleSharedLittle } from '../components/shared/TitleSharedLittle';

export const AppoinmentsDoctorScreen = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={() => navigation.dispatch(DrawerActions.toggleDrawer)}>
          <Text>Menu</Text>
        </Pressable>
      ),
    });
  }, []);

  return (
    <>
      <View style={styles.container}>
        <TitleSharedLittle
          label={'Doctor Link, '}
          labelBold={'Citas'}
        />
        <Searchbar
          placeholder="Busca tu cita..."
          onChangeText={setSearchQuery}
          value={searchQuery}
          icon={'search-circle-outline'}
          style={{marginTop: 15}}
        />
        <PersonTag 
        linea="-------------------------------------------------------------------------------------------"
        name="Nombre de la Cita" 
        description="Descripción de la cita. " 
        horario="Horario de la cita. "
        nota="DATOS GENERADOS DE LA API."
      />
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
const PersonTag = ({ name, description, horario, nota, linea }: { 
  name: string; 
  description: string; 
  horario: string;
  nota: string; 
  linea: string; 
}) => {
  return (
    <View style={styles.personContainer}>
      <View style={styles.textContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <Text style={styles.description}>{horario}</Text>
        <Text style={styles.name}>{nota}</Text>
        <Text style={styles.description}>{linea}</Text>
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
    personContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
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
