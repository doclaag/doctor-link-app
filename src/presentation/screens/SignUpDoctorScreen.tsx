import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView, Alert, ImageBackground } from 'react-native';
import { FAB, IconButton, TextInput } from 'react-native-paper';
import { LogoShared, TermsAndConditions } from '../components';
import type { RootStackParams } from '../routes/StackNavigator';
import { globalColors, globalStyles } from '../theme';
import {  URL_DOCTORS } from '@env';
import axios from 'axios';
import { type NavigationProp, useNavigation, DrawerActions } from '@react-navigation/native';

type Gender = 0 | 1;

export const SignUpDoctorScreen = () => {

  const [ name, setName ] = useState( '' );
  const [ last_name, setlast_name ] = useState( '' );
  const [ gender, setGender ] = useState<Gender | null>( null );
  const [ phone, setPhone ] = useState( '' );
  const [ speciality, setSpeciality ] = useState( '' );
  const [ no_collegiate, setNo_collegiate ] = useState( '' );
  const [ visibleModal, setVisibleModal ] = useState( false );
  const [ visibleTermsModal, setVisibleTermsModal ] = useState( false );
  const [ visibleGenderModal, setVisibleGenderModal ] = useState( false );

  const [ email, setEmail ] = useState( '' );
  const [ emailError, setEmailError ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ showPassword, setShowPassword ] = useState( false );
  const [ formError, setFormError ] = useState( '' );


  const navigation = useNavigation<NavigationProp<RootStackParams>>();



  const validateEmail = ( email: string ) => {
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return re.test( email );
  };

  const validatePassword = ( password: string ) => {
    return password.length >= 8;
  };

  const validatePhone = ( phone: string ) => {
    const re = /^\d{8,15}$/;
    return re.test( phone );
  };

  const validateDPI = ( dpi: string ) => {
    const re = /^\d{13}$/;
    return re.test( dpi );
  };

  const validateForm = () => {
    if ( !name || !last_name || gender !== null || !phone || !speciality || !password || !email || no_collegiate ) {
      setName( '' );
      setlast_name( '' );
      setGender( null );
      setPhone( '' );
      setSpeciality( '' );
      setPassword( '' );
      setEmail( '' );
      setNo_collegiate( '' );
      setFormError( 'Todos los campos son obligatorios.' );
      () => navigation.navigate( 'SignIn' as never )
      return true;
    }
    if ( !validateEmail( email ) ) {
      setEmailError( 'Correo electrónico inválido' );
      return false;
    }
    if ( !validatePassword( password ) ) {
      setFormError( 'La contraseña debe tener al menos 8 caracteres.' );
      return false;
    }
    if ( !validatePhone( phone ) ) {
      setFormError( 'Número de teléfono inválido.' );
      return false;
    }
    if ( !validateDPI( no_collegiate ) ) {
      setFormError( 'Número de Colegiado inválido.' );
      return false;
    }
    setFormError( '' );
    setEmailError( '' );
    return true;
  };

  const consultAPI = useCallback( async ( token: string ) => {
    const obj = {
      email,
      password,
      name,
      last_name,
      gender,
      phone,
      is_staff: false,
      is_active: true,
      speciality,
      no_collegiate
    };
    try {
      console.log(token)
      const response = await axios.post( `${ URL_DOCTORS }create/`, obj, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      } );
      console.log( 'Usuario creado:', response.data );
      Alert.alert( 'Registro exitoso', 'El usuario se ha registrado correctamente.' );
      navigation.navigate( 'SignIn' as never );
    } catch ( error ) {
      const axiosError = error as { response?: any; };
      if ( axiosError.response ) {
        console.error( 'Error al crear usuario:', axiosError.response );
      } else {
        console.error( 'Error desconocido:', error );
      }
      Alert.alert( 'Error', 'No se pudo crear el usuario. Por favor, revisa los datos ingresados.' );
    }
  }, [ email, password, name, last_name, gender, phone, no_collegiate ] );

  const handleRegister = async () => {
    if ( !validateForm() ) return;
    try {
      const tokenResponse = await axios.post( 'https://citas-api-h.onrender.com/api/token/', {
        email: 'hola1@gmail.com',
        password: '123a',
      } );

      const { access, refresh } = tokenResponse.data;
      const token = `Bearer ${ access || refresh }`;

      await consultAPI( token );
      setEmailError( '' );
    } catch ( error ) {
      console.error( 'Error al obtener token:', error );
      Alert.alert( 'Error', 'No se pudo obtener el token. Por favor, revisa tus credenciales.' );
    }
  };

  const handleModalClose = () => {
    setVisibleModal( false );
    if ( gender !== null ) {
      setGender( gender );
    }
    setVisibleGenderModal( false );
  };

  const handleScroll = ( event: { nativeEvent: { contentOffset: { y: number; }; layoutMeasurement: { height: number; }; contentSize: { height: number; }; }; } ) => {
    if ( event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height >= event.nativeEvent.contentSize.height ) {
      // Scroll event logic
    }
  };

  return (
    <View style={ styles.container }>
      <ScrollView style={ styles.scrollView } onScroll={ handleScroll }>
        <View style={ globalStyles.centerContainer }>
          <LogoShared />
          <Text style={ globalStyles.welcomeText }>¡Registrarse!</Text>
          <TextInput
            label="Nombre"
            style={ [ globalStyles.textInput, { marginTop: 25 } ] }
            placeholder="Escribe tu nombre..."
            textColor='#000'
            placeholderTextColor="#959393"
            selectionColor="#959393"
            onChangeText={ setName }
            value={ name }
          />

          <TextInput
            label="Apellido"
            style={ globalStyles.textInput }
            placeholder="Escribe tu apellido..."
            textColor='#000'
            placeholderTextColor="#959393"
            selectionColor="#959393"
            onChangeText={ setlast_name }
            value={ last_name }
          />

          <TextInput
            label="Especialidad"
            style={ globalStyles.textInput }
            placeholder="Escribe tu especialidad..."
            placeholderTextColor="#959393"
            textColor='#000'
            selectionColor="#959393"
            onChangeText={ setSpeciality }
            value={ speciality }
          />

          <TextInput
            label="No. Colegiado"
            style={ globalStyles.textInput }
            placeholder="Ingresa tu número de Colegiado..."
            placeholderTextColor="#959393"
            textColor='#000'
            selectionColor="#959393"
            onChangeText={ setNo_collegiate }
            value={ no_collegiate }
          />

          <TextInput
            label="Email"
            mode='flat'
            placeholder='Escribe tu email'
            keyboardType='email-address'
            textColor='#000'
            autoCapitalize='none'
            autoCorrect={ false }
            style={ [ globalStyles.textInput, { marginTop: 25 } ] }
            value={ email }
            onChangeText={ setEmail }
            error={ !!emailError }
          />

          { emailError ? <Text style={ globalStyles.errorText }>{ emailError }</Text> : null }

          <View style={ globalStyles.passwordContainer }>
            <TextInput
              label="Contraseña"
              placeholder='Escribe tu contraseña'
              textColor='#000'
              autoCapitalize='none'
              autoCorrect={ false }
              secureTextEntry={ !showPassword }
              value={ password }
              onChangeText={ setPassword }
              style={ globalStyles.textInput }
              right={
                <TextInput.Icon
                  icon={ showPassword ? 'eye-off' : 'eye' }
                  onPress={ () => setShowPassword( !showPassword ) }
                />
              }
            />
          </View>

          { formError ? <Text style={ globalStyles.errorText }>{ formError }</Text> : null }
          <TouchableOpacity onPress={ () => setVisibleGenderModal( true ) } style={ [ globalStyles.textInput, globalStyles.genderInput ] }>
            <Text style={ { color: '#000' } }>{ gender !== null ? ( gender === 0 ? 'Masculino' : 'Femenino' ) : 'Escoge tu género...' }</Text>
          </TouchableOpacity>

          <Modal
            animationType="slide"
            transparent={ true }
            visible={ visibleGenderModal }
            onRequestClose={ () => setVisibleGenderModal( false ) }
          >
            <View style={ globalStyles.modalContainer }>
              <View style={ globalStyles.modalContent }>
                <TouchableOpacity onPress={ () => { setGender( 0 ); setVisibleGenderModal( false ); } } style={ globalStyles.modalOption }>
                  <Text style={ { color: '#000' } }>Masculino</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ () => { setGender( 1 ); setVisibleGenderModal( false ); } } style={ globalStyles.modalOption }>
                  <Text style={ { color: '#000' } }>Femenino</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={ handleModalClose } style={ globalStyles.modalCloseButton }>
                  <Text>Cerrar</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>

          <TextInput
            label="Phone"
            style={ globalStyles.textInput }
            placeholder="Escribe tu número de teléfono..."
            placeholderTextColor="#959393"
            textColor='#000'
            selectionColor="#959393"
            onChangeText={ setPhone }
            keyboardType="phone-pad"
            value={ phone }
          />
          <TermsAndConditions />
          <FAB
            style={ {
              backgroundColor: globalColors.secondary,
              margin: 10,
              marginBottom: 20,
            } }
            icon={ 'pencil-outline' }
            label={ 'Registrar' }
            color={ '#FFFFFF' }
            onPress={ handleRegister }
          />

          <TouchableOpacity onPress={ () => navigation.navigate( 'SignIn' as never ) }>
            <Text style={ globalStyles.accountText }>¿Ya tienes una cuenta?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  modalTitle: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  importantText: {
    color: 'grey',
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  scrollView: {
    width: '100%',
    backgroundColor: 'transparent',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    maxHeight: '80%',
  },
  modalAcceptButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  modalAcceptButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  plagioText: {
    marginTop: 10,
    color: 'gray',
    fontSize: 12,
    fontStyle: 'italic',
  },
} );