import { Text } from 'react-native';
import { globalStyles } from '../../theme';

interface TitleProps {
  label: string;
  labelBold: string;
  subtitle?: string;
}

export const TitleShared = ( { label, labelBold, subtitle }: TitleProps ) => (
  <>
    <Text style={ globalStyles.title }>
      { `${ label } ` }
      <Text style={ globalStyles.title_bold }>{ labelBold }</Text>
    </Text>
    <Text style={ globalStyles.subtitle }>{ subtitle }</Text>
  </>
);

