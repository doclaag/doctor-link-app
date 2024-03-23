import { Pressable, StyleSheet, Text } from 'react-native';

interface PrimaryButtonProps {
  label: string;
  marginTop?: number;
  backgroundColor?: string;
}


export const PrimaryButtonShared = ( { label, marginTop = 20, backgroundColor = '#36CFC9' }: PrimaryButtonProps ) => {
  return (
    <Pressable style={ [styles.button, {marginTop: marginTop, backgroundColor:backgroundColor}] }>
      <Text style={ styles.buttonText }>{ label }</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create( {
  container: {
    backgroundColor: '#F3F4F6',
    flex: 1,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 50,
    color: '#36CFC9',
    fontWeight: '600',
  },
  title_bold: {
    fontWeight: '900',
    color: '#6D28D9',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 20,
    color: '#374151',
  },
  button: {
    backgroundColor: '#36CFC9',
    padding: 15,
    marginTop: 365,
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 40,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
  },
} );