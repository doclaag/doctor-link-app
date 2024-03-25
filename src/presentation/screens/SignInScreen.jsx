import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { FAB, TextInput} from 'react-native-paper';
import { LogoShared } from '../components';

export const SignInScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [emailError, setEmailError] = useState('');

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setEmailError('Correo electrónico inválido');
      return;
    }
    setEmailError('');
    console.log('Email:', email);
    console.log('Password:', password);
  };
  const validateEmail = (email) => {
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return re.test(email);
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <LogoShared />
      </View>
      <TextInput
        label="Email"
        mode='flat'
        placeholder='Escribe tu email'
        keyboardType='email-address'
        textColor='#000'
        autoCapitalize='none'
        autoCorrect={false}
        style={[styles.textInput]}
        value={email}
        onChangeText={setEmail}
        error={!!emailError}
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <View style={styles.passwordContainer}>
        <TextInput
          label="Contraseña"
          placeholder='Escribe tu contraseña'
          textColor='#000'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={styles.textInput}
          right={ 
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      </View>

      <FAB
        style={styles.fab}
        icon='log-in-outline'
        label='Iniciar Sesión'
        onPress={handleLogin}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0', 
  },
  imageContainer: {
    marginBottom: 20,
  },   
  textInput: {
    width: '90%',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    marginBottom:10,
    marginTop:10,
    borderRadius: 50, 
    borderTopEndRadius:50, 
    borderTopLeftRadius:50,

  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  fab: {
    backgroundColor: '#36CFC9',
    marginTop: 20,
  },
  errorText: {
    color: 'red',
  },
});
