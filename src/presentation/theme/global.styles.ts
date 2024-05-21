import { StyleSheet } from 'react-native';
import { transparent } from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export const globalColors = {
  primary: '#36CFC9',
  secondary: '#6D28D9',
  tertiary: '#374151',
  white: 'white',
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
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
    padding: 20,
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
    fontWeight: 'bold',
    fontSize: 15,
  },
  accountText: {
    marginTop: sizes.textInputMargin,
    color: globalColors.tertiary,
    fontSize: 16,
    textDecorationLine: 'underline',
    fontWeight: 'bold',
    textAlign: 'center',
    padding: 20
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
    fontSize: 22,
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
    marginTop: 10,
    fontSize: 20,
    color: Colors.black,
    fontWeight: 'bold',
  },
  specialtiesList: {
    flex: 1,
    width: '100%',
    height: 'auto',
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
    bottom: 25,
    alignSelf: 'flex-start',
    marginLeft: 25,
    width: '40%',
    height: 60,
    backgroundColor: globalColors.secondary,
  },
  fabButton: {
    fontSize: 15, 
    color: globalColors.white,
    fontWeight: 'bold',
    flex: 1,
    alignItems: 'center',
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
  titleCard: {
    fontSize: 14,
    fontWeight: 'bold',
    color: globalColors.secondary,
  },
  cardContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 5, // Reducido el margen superior
    marginBottom: 5, // Reducido el margen inferior
    borderWidth: 1, 
    borderColor: 'lightgray', 
    borderRadius: 10, 
    padding: 3, 
    backgroundColor: globalColors.primary,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 4,
  },
  centerContainerAppointmentTime: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexGrow: 1, 
    marginTop: 35,
  },
  infoContainer: {
    backgroundColor: globalColors.white,
    padding: 10,
    margin: 10,
    marginTop: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

  },
  titleAppointmentTime: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
    textAlign: 'center',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  labelNegrita: {
    fontSize: 16,
    color: '#555',
    fontWeight: 'bold',
  },
  info: {
    fontSize: 16,
    fontWeight: 'bold',
    color: globalColors.secondary,
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  actionButton: {
    backgroundColor: Colors.primary,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  actionButtonText: {
    color: globalColors.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  timePickerButton: {
    backgroundColor: globalColors.primary,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    marginTop: 20, // Agregar margen superior
  },
  containerSearchScreen: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  scrollView: {
    width: '100%',
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: globalColors.primary,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: globalColors.white,
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
    width: '100%',
  },
  imageSearchDoctor: {
    width: 80,
    height: 80,
    marginBottom: sizes.textInputMargin,
    borderRadius: sizes.borderRadius / 5,
    alignSelf: 'center',
  },
  cardTextContainer: {
    flex: 1,
  },
  speciality: {
    margin: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: globalColors.gris,
  },
  phone: {
    fontSize: 16,
    color: globalColors.primary,
  },
  searchbar: {
    marginTop: 15,
    marginBottom: 15,
    width: '100%',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 18,
    color: '#555',
    fontWeight: 'bold',
},
});