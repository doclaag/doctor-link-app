import { Image, StyleSheet, Text, View } from 'react-native';
import { globalColors, globalStyles } from '../../theme';

interface DoctorTagProps {
  name: string;
  speciality: string;
  phone: string;
  imageSource: any;
}

export const DoctorTagShared = ( { name, speciality, phone, imageSource }: DoctorTagProps ) => {
  return (
    <View style={ styles.personContainer }>
      <View style={ styles.imageContainer }>
        <Image source={ imageSource } style={ styles.image } />
      </View>
      <View style={ styles.textContainer }>
        <Text style={ styles.name }>
          <Text style={globalStyles.titleCard}>Doctor: </Text> 
          { name }
        </Text>
        <Text style={ styles.description }>
          <Text style={globalStyles.titleCard}>Especialidad: </Text> 
          { speciality }</Text>
        <Text style={ styles.phone }>
          <Text style={globalStyles.titleCard}>Teléfono: </Text> 
          { phone }
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create( {
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
    color: globalColors.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: 'gray',
  },
  phone: {
    fontSize: 14,
    color: 'gray',
  },
} );