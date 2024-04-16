import { StyleSheet } from 'react-native';

export const globalColors = {
  primary: '#36CFC9',
  secondary: '#6D28D9',
  tertiary: '#374151',
  white: '#fff',
  red: 'red',
  modalBackground: 'rgba(0, 0, 0, 0.5)',
};

const sizes = {
  title: 50,
  subtitle: 20,
  image: 150,
  textInputPadding: 8,
  textInputMargin: 10,
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
  }
});