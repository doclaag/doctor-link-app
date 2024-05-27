import React, { useState, useEffect } from 'react';
import { Pressable,View, Text, Alert, ActivityIndicator, StyleSheet } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';
import { LogoShared } from '../components';
import { globalStyles, globalColors } from '../theme';
import axios from 'axios';
import { URLTOKEN } from '@env';
import type { RootStackParams } from '../routes/StackNavigator';
import { type NavigationProp, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SignInScreen = () => {

  const [ email, setEmail ] = useState( '' );
  const [ password, setPassword ] = useState( '' );
  const [ showPassword, setShowPassword ] = useState( false );
  const [ emailError, setEmailError ] = useState( '' );
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation<NavigationProp<RootStackParams>>();
 
  const handleLogin = async() => {
    if (!validateEmail(email) ) {
      setEmailError( 'Correo electrónico inválido' );
      return;
    }
    setEmailError('');
    setLoading(true);

    try {
      const response = await axios.post(URLTOKEN, {
        email,
        password
      });
       
      const { access, refresh } = response.data;
      const token = `Bearer ${access || refresh}`;
      await AsyncStorage.setItem('userToken', token); 
      console.log(AsyncStorage)
      console.log(token);
      Alert.alert('Inicio de sesión exitoso', 'Has iniciado sesión correctamente.');
      navigation.navigate('AppointmentSearch' as never)
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'No se pudo iniciar sesión. Por favor, revisa tus credenciales.');
      console.log(URLTOKEN);
    } finally {
      setLoading(false);
    }
  };

  const validateEmail = ( email: string ) => {
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return re.test( email );
  };

  return (
    <View style={styles.container}>
    <View style={ globalStyles.centerContainer }>
      <LogoShared/>
      <Text style={globalStyles.welcomeText}>¡Bienvenido de nuevo!</Text>
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
          autoCorrect={false}
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
      {loading ? (
        <ActivityIndicator size="large" color="#000" style={{ marginTop: 20 }} />
      ) : (
      <FAB
        style={ globalStyles.fab }
        icon='log-in-outline'
        label='Iniciar Sesión'
        onPress={ handleLogin }
      />
      )}
    </View>
    </View>

  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
});