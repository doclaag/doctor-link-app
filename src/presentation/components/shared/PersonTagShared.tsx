import { Image, StyleSheet, Text, View } from 'react-native';
import { globalColors } from '../../theme';

interface PersonTagProps {
  name: string;
  description: string;
  location: string;
  imageSource: any;
}

export const PersonTagShared = ( { name, description, location, imageSource }: PersonTagProps ) => {
  return (
    <View style={ styles.personContainer }>
      <View style={ styles.imageContainer }>
        <Image source={ imageSource } style={ styles.image } />
      </View>
      <View style={ styles.textContainer }>
        <Text style={ styles.name }>{ name }</Text>
        <Text style={ styles.description }>{ description }</Text>
        <Text style={ styles.location }>{ location }</Text>
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
  location: {
    fontSize: 14,
    color: 'gray',
  },
} );