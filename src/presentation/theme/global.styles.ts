import { StyleSheet } from 'react-native';
import { black } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const globalColors = {
  primary: '#36CFC9',
  secondary: '#6D28D9',
  tertiary: '#374151',
  white: '#fff',
  gris: '#9b9b9b',
  red: 'red',
  black: '#000',
  skyblue: '#A0D9EF',
  modalBackground: 'rgba(0, 0, 0, 0.5)',
};

const sizes = {
  title: 50,
  title_little: 30,
  subtitle: 20,
  image: 150,
  textInputPadding: 8,
  textInputMargin: 10,
  marginTopList: 20,
  borderRadius: 50,
  fabMargin: 20,
};

export const globalStyles = StyleSheet.create({
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: sizes.title,
    color: globalColors.primary,
    fontWeight: '600',
  },
  title_bold: {
    textAlign: 'center',
    fontSize: sizes.title,
    color: globalColors.secondary,
    fontWeight: '900',
  },
  title_little: {
    textAlign: 'center',
    fontSize: sizes.title_little,
    color: globalColors.primary,
    fontWeight: '400',
  },
  title_bold_little: {
    textAlign: 'center',
    fontSize: sizes.title_little,
    color: globalColors.secondary,
    fontWeight: '500',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: sizes.subtitle,
    color: globalColors.tertiary,
  },
  image: {
    width: sizes.image,
    height: sizes.image,
    marginBottom: sizes.textInputMargin,
    borderRadius: sizes.borderRadius / 5,
    alignSelf: 'center',
  },
  textInput: {
    width: '90%',
    backgroundColor: globalColors.white,
    paddingHorizontal: sizes.textInputPadding,
    marginBottom: sizes.textInputMargin,
    marginTop: sizes.textInputMargin,
    borderRadius: sizes.borderRadius,
    borderTopEndRadius: sizes.borderRadius,
    borderTopStartRadius: sizes.borderRadius,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: sizes.textInputMargin,
  },
  fab: {
    backgroundColor: globalColors.primary,
    marginTop: sizes.fabMargin,
  },
  errorText: {
    color: globalColors.red,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: sizes.textInputMargin,
  },
  genderInput: {
    width: '90%',
    height: sizes.image / 3, 
    justifyContent: 'center',
    paddingHorizontal: sizes.textInputPadding,
    marginBottom: sizes.textInputMargin,
  },
  termsText: {
    color: globalColors.tertiary,
    marginLeft: sizes.textInputPadding,
  },
  accountText: {
    marginTop: sizes.textInputMargin,
    color: globalColors.tertiary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: globalColors.modalBackground,
  },
  modalContent: {
    backgroundColor: globalColors.white,
    padding: sizes.textInputPadding * 2,
    borderRadius: 25,
    width: '80%',
  },
  modalOption: {
    paddingVertical: sizes.textInputPadding,
    borderBottomWidth: 1,
    borderBottomColor: globalColors.tertiary,
  },
  modalCloseButton: {
    marginTop: sizes.textInputMargin,
    alignItems: 'center',
  },
  containerDoctorInformation: {
    flex: 1,
  },
  profileHeader: {
    backgroundColor: globalColors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    height: '35%',
  },
  profileAvatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 10,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  doctorName: {
    fontSize: 25,
    fontWeight: 'bold',
    color: Colors.black,
  },
  profileSpecialties: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 10,
  },
  specialtiesTitle: {
    fontSize: 20,
    color: Colors.black,
    fontWeight: 'bold',
  },
  specialtiesList: {
    flex: 1,
    marginTop: 10,
  },
  textList:{
    fontSize: 18,
  },
  specialtyItem: {
    fontSize: 16,
    marginBottom: 5,
  },
  bottomContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'flex-start',
    marginLeft: 20,
  },
  fabButton: {
    backgroundColor: globalColors.red, // Color de fondo rojo
    color: globalColors.gris, // Color del texto gris
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