import React, { useState } from 'react';
import { View, Text } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';
import { LogoShared } from '../components';
import { globalStyles } from '../theme';

export const SignInScreen = () => {

  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ showPassword, setShowPassword ] = useState( false );

  const [ emailError, setEmailError ] = useState( '' );

  const handleLogin = () => {
    if ( !validateEmail( email ) ) {
      setEmailError( 'Correo electrónico inválido' );
      return;
    }
    setEmailError( '' );
    console.log( 'Email:', email );
    console.log( 'Password:', password );
  };

  const validateEmail = ( email: string ) => {
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return re.test( email );
  };

  return (
    <View style={ globalStyles.centerContainer }>

      <LogoShared />

      <TextInput
        label="Email"
        mode='flat'
        placeholder='Escribe tu email'
        keyboardType='email-address'
        textColor='#000'
        autoCapitalize='none'
        autoCorrect={ false }
        style={ [ globalStyles.textInput, {marginTop:25} ] }
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

      <FAB
        style={ globalStyles.fab }
        icon='log-in-outline'
        label='Iniciar Sesión'
        onPress={ handleLogin }
      />
    </View>
  );
};