import { StyleSheet } from 'react-native';

const colors = {
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
    color: colors.primary,
    fontWeight: '600',
  },
  title_bold: {
    textAlign: 'center',
    fontSize: sizes.title,
    color: colors.secondary,
    fontWeight: '900',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: sizes.subtitle,
    color: colors.tertiary,
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
    backgroundColor: colors.white,
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
    backgroundColor: colors.primary,
    marginTop: sizes.fabMargin,
  },
  errorText: {
    color: colors.red,
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
    color: colors.tertiary,
    marginLeft: sizes.textInputPadding,
  },
  accountText: {
    marginTop: sizes.textInputMargin,
    color: colors.tertiary,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.modalBackground,
  },
  modalContent: {
    backgroundColor: colors.white,
    padding: sizes.textInputPadding * 2,
    borderRadius: 25,
    width: '80%',
  },
  modalOption: {
    paddingVertical: sizes.textInputPadding,
    borderBottomWidth: 1,
    borderBottomColor: colors.tertiary,
  },
  modalCloseButton: {
    marginTop: sizes.textInputMargin,
    alignItems: 'center',
  }
});