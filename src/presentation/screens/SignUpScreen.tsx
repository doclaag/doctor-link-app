import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { FAB, Checkbox, TextInput } from 'react-native-paper';
import { LogoShared } from '../components';

import { globalStyles } from '../theme';
import { URL_PATIENTS } from '@env';
import axios from 'axios';

type Gender = 'Masculino' | 'Femenino';

export const SignUpScreen = () => {
  const [ name, setName ] = useState( '' );
  const [ surname, setSurname ] = useState( '' );
  const [ gender, setGender ] = useState<Gender | null>( null );
  const [ user, setUser ] = useState( '' );
  const [ phone, setPhone ] = useState( '' );
  const [ noDPI, setNoDPI ] = useState( '' );
  const [ isActive, setIsActive ] = useState( false );
  const [ provedTerms, setProvedTerms ] = useState( false );
  const [ visibleModal, setVisibleModal ] = useState( false );
  const [ password, setPassword ] = useState( '' );
  const [ showPassword, setShowPassword ] = useState( false );
  const [ email, setEmail ] = useState( '' );
  const [ emailError, setEmailError ] = useState( '' );

  const toggleTerms = () => {
    setProvedTerms( !provedTerms );
  };


  const consultAPI = useCallback(async () => {
    setIsActive(true);
    const obj = {
      name,
      last_name: surname,
      gender,
      phone,
      no_dpi: noDPI,
      is_active: isActive,
      username: user,
      password,
      id: Math.floor(Math.random() * 1000000),
    };
    try {
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj)
      };
  
      const response = await axios.post(URL_PATIENTS, requestOptions.body, { headers: requestOptions.headers });
  
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  }, [name, surname, gender, phone, noDPI, isActive, user, password]);

  useEffect( () => {
    consultAPI();
  }, [ consultAPI ] );

  const handleRegister = () => {
    if ( !validateEmail( email ) ) {
      setEmailError( 'Correo electrónico inválido' );
      return;
    }
    consultAPI();
    setEmailError( '' );

  };

  const validateEmail = ( email: string ) => {
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return re.test( email );
  };


  const handleModalClose = () => {
    setVisibleModal( false );
  };

  const handleScroll = ( event: { nativeEvent: { contentOffset: { y: number; }; layoutMeasurement: { height: number; }; contentSize: { height: number; }; }; } ) => {
    if ( event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height >= event.nativeEvent.contentSize.height ) {

    }
  };

  return (
    <ScrollView style={ styles.scrollView } onScroll={ handleScroll }>
      <View style={ globalStyles.centerContainer }>


        <LogoShared />

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
          onChangeText={ setSurname }
          value={ surname }
        />

        <TextInput
          label="DPI"
          style={ globalStyles.textInput }
          placeholder="Ingresa tu numero de DPI..."
          placeholderTextColor="#959393"
          textColor='#000'
          selectionColor="#959393"
          onChangeText={ setNoDPI }
          value={ noDPI }
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

        <TouchableOpacity onPress={ () => setVisibleModal( true ) } style={ [ globalStyles.textInput, globalStyles.genderInput ] }>
          <Text style={ { color: '#000' } }>{ gender ? gender : 'Escoge tu género...' }</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={ true }
          visible={ visibleModal }
          onRequestClose={ handleModalClose }
        >
          <View style={ globalStyles.modalContainer }>
            <View style={ globalStyles.modalContent }>
              <TouchableOpacity onPress={ () => { setGender( 'Masculino' ); setVisibleModal( false ); } } style={ globalStyles.modalOption }>
                <Text style={ { color: '#000' } }>Masculino</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={ () => { setGender( 'Femenino' ); setVisibleModal( false ); } } style={ globalStyles.modalOption }>
                <Text style={ { color: '#000' } }>Femenino</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={ handleModalClose } style={ globalStyles.modalCloseButton }>
                <Text>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TextInput
          label="Usuario"
          style={ globalStyles.textInput }
          placeholder="Ingresa tu usuario..."
          placeholderTextColor="#959393"
          textColor='#000'
          selectionColor="#959393"
          onChangeText={ setUser }
          value={ user }
        />

        <TextInput
          label="Phone"
          style={ globalStyles.textInput }
          placeholder="Ingresa tu numero de telefono..."
          placeholderTextColor="#959393"
          textColor='#000'
          selectionColor="#959393"
          onChangeText={ setPhone }
          value={ phone }
        />

        <TouchableOpacity onPress={ toggleTerms } style={ globalStyles.checkboxContainer }>
          <Checkbox
            status={ provedTerms ? 'checked' : 'unchecked' }
            color='#000'
            uncheckedColor='#000'
          />
          <Text style={ globalStyles.termsText }>Acepto términos y condiciones.</Text>
        </TouchableOpacity>

        <FAB
          style={ {
            backgroundColor: '#d2dbd2dd',
            margin: 10,
            marginBottom: 20,
          } }
          icon={ 'pencil-outline' }
          label={ 'Registrar' }
          color={ '#000' }
          onPress={ handleRegister }
        />

        <Text style={ globalStyles.accountText }>¿Ya tienes cuenta?</Text>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create( {
  scrollView: {
    width: '100%',
  },
} );