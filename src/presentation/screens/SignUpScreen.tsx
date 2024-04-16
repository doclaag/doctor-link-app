import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { FAB, Checkbox, TextInput } from 'react-native-paper';
import { LogoShared } from '../components';

import { globalStyles } from '../theme';

type Gender = 'Masculino' | 'Femenino';

export const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [user, setUser] = useState('');
  const [provedTerms, setProvedTerms] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  const toggleTerms = () => {
    setProvedTerms(!provedTerms);
  };

  const handleLogin = () => {
    if (!validateEmail(email)) {
      setEmailError('Correo electrónico inválido');
      return;
    }
    setEmailError('');
    console.log('Email:', email);
    console.log('Password:', password);
  };

  const validateEmail = (email: string) => {
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return re.test(email);
  };


  const handleModalClose = () => {
    setVisibleModal(false);
  };

  return (
    <View style={globalStyles.centerContainer}>

      <LogoShared />

      <TextInput
        label="Nombre"
        style={[globalStyles.textInput, { marginTop: 25 }]}
        placeholder="Escribe tu nombre..."
        textColor='#000'
        placeholderTextColor="#959393"
        selectionColor="#959393"
        onChangeText={setName}
        value={name}
      />

      <TextInput
        label="Apellido"
        style={globalStyles.textInput}
        placeholder="Escribe tu apellido..."
        textColor='#000'
        placeholderTextColor="#959393"
        selectionColor="#959393"
        onChangeText={setSurname}
        value={surname}
      />
      <TextInput
        label="Email"
        mode='flat'
        placeholder='Escribe tu email'
        keyboardType='email-address'
        textColor='#000'
        autoCapitalize='none'
        autoCorrect={false}
        style={[globalStyles.textInput, { marginTop: 25 }]}
        value={email}
        onChangeText={setEmail}
        error={!!emailError}
      />

      {emailError ? <Text style={globalStyles.errorText}>{emailError}</Text> : null}

      <View style={globalStyles.passwordContainer}>
        <TextInput
          label="Contraseña"
          placeholder='Escribe tu contraseña'
          textColor='#000'
          autoCapitalize='none'
          autoCorrect={false}
          secureTextEntry={!showPassword}
          value={password}
          onChangeText={setPassword}
          style={globalStyles.textInput}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
      </View>

      <TouchableOpacity onPress={() => setVisibleModal(true)} style={[globalStyles.textInput, globalStyles.genderInput]}>
        <Text style={{ color: '#000' }}>{gender ? gender : 'Escoge tu género...'}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModal}
        onRequestClose={handleModalClose}
      >
        <View style={globalStyles.modalContainer}>
          <View style={globalStyles.modalContent}>
            <TouchableOpacity onPress={() => { setGender('Masculino'); setVisibleModal(false); }} style={globalStyles.modalOption}>
              <Text style={{ color: '#000' }}>Masculino</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => { setGender('Femenino'); setVisibleModal(false); }} style={globalStyles.modalOption}>
              <Text style={{ color: '#000' }}>Femenino</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleModalClose} style={globalStyles.modalCloseButton}>
              <Text>Cerrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TextInput
        label="Usuario"
        style={globalStyles.textInput}
        placeholder="Ingresa tu usuario..."
        placeholderTextColor="#959393"
        textColor='#000'
        selectionColor="#959393"
        onChangeText={setUser}
        value={user}
      />

      <TouchableOpacity onPress={toggleTerms} style={globalStyles.checkboxContainer}>
        <Checkbox
          status={provedTerms ? 'checked' : 'unchecked'}
          color='#000'
          uncheckedColor='#000'
        />
        <Text style={globalStyles.termsText}>Acepto términos y condiciones.</Text>
      </TouchableOpacity>

      <FAB
        style={{
          backgroundColor: '#d2dbd2dd',
          margin: 10,
          marginBottom: 20,
        }}
        icon={'pencil-outline'}
        label={'Registrar'}
        color={'#000'}
        onPress={handleLogin}
      />

      <Text style={globalStyles.accountText}>¿Ya tienes cuenta?</Text>

    </View>

  );
};