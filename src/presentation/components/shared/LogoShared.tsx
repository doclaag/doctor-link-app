import { Image, StyleSheet } from 'react-native';

export const LogoShared = () => {
  return (
    <Image
      source={ require( '../../../assets/img/doctor-link.jpg' ) }
      style={ styles.image }
    />
  );
};

const styles = StyleSheet.create( {
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
} );