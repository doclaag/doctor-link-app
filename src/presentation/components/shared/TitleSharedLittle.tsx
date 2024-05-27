import { Text } from 'react-native';
import { globalStyles } from '../../theme';

interface TitleProps {
  label: string;
  labelBold: string;
  subtitle?: string;
}

export const TitleSharedLittle = ( { label, labelBold}: TitleProps ) => (
  <>
    <Text style={ globalStyles.title_little }>
      { `${ label } ` }
      <Text style={ globalStyles.title_bold_little }>{ labelBold }</Text>
    </Text>
  </>
);