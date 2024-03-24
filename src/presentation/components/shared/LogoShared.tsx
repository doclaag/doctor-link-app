import { Image } from 'react-native';
import { globalStyles } from '../../theme/global.styles';

export const LogoShared = () => {
  return (
    <Image
      source={ require( '../../../assets/img/doctor-link.jpg' ) }
      style={ globalStyles.image }
    />
  );
};