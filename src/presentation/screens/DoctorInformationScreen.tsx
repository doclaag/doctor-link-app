import React from 'react';
import { View, Text, Image } from 'react-native';
import { useNavigation, DrawerActions } from '@react-navigation/native';
import { globalStyles } from '../theme';
import { FAB } from 'react-native-paper';

const DoctorInformationScreen = () => {
  const navigation = useNavigation();
  
  return (
    <View style={globalStyles.containerDoctorInformation}>
    <View style={globalStyles.profileHeader}>
      <View style={globalStyles.profileAvatar}>
        <Image
          source={require('../../assets/img/doctor.png')}
          style={globalStyles.avatarImage}
        />
      </View>
      <Text style={globalStyles.doctorName}>Dr. Pedro Pablo Celada</Text>
    </View>
    <View style={globalStyles.profileSpecialties}>
      <Text style={globalStyles.specialtiesTitle}>Especialidades:</Text>
      <View style={globalStyles.specialtiesList}>
        <Text style={globalStyles.textList}>Pro hacker.</Text>
        <Text style={globalStyles.textList}>Super master</Text>
        <Text style={globalStyles.textList}>Pro Scrum</Text>
        <Text style={globalStyles.textList}>Hola ke ace</Text>
        <Text style={globalStyles.textList}>Palabras de relleno</Text>
        <Text style={globalStyles.textList}>Pruebas 50000.-</Text>
      </View>

      <Text style={globalStyles.specialtiesTitle}>Horario de atención:</Text>
      <View style={globalStyles.specialtiesList}>
        <Text style={globalStyles.textList}>Lunes a Viernes 8 a.m a 4 p.m.</Text>
      </View>
    </View>


      <View style={globalStyles.bottomContainer}>
        <FAB
          style={globalStyles.fabButton}
          icon={'log-in-outline'}
          label={'Regresar'}
          onPress={() => navigation.navigate('GetStarted' as never)}
        />
      </View>
    </View>
    
  );
};

export default DoctorInformationScreen;
