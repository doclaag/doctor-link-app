import { StyleSheet } from 'react-native';

export const globalStyles = StyleSheet.create( {
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  image: {
    width: 150,
    height: 150,
    marginBottom: 20,
    borderRadius: 10,
    alignSelf: 'center',
  },
} );