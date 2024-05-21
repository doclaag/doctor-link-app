import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView, Alert, ImageBackground } from 'react-native';
import { FAB, IconButton, TextInput } from 'react-native-paper';
import { LogoShared } from '../components';
import type { RootStackParams } from '../routes/StackNavigator';
import { globalColors, globalStyles } from '../theme';
import { URL_TOKEN, URL_PATIENTS } from '@env';
import axios from 'axios';
import { type NavigationProp, useNavigation, DrawerActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Gender = 0 | 1;

export const SignUpScreen = () => {
  const [name, setName] = useState('');
  const [last_name, setlast_name] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [phone, setPhone] = useState('');
  const [noDPI, setNoDPI] = useState('');
  const [provedTerms, setProvedTerms] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');
  const [icon, setIcon] = useState("remove");

  const navigation = useNavigation<NavigationProp<RootStackParams>>();

  useEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Pressable onPress={ () => navigation.dispatch(DrawerActions.toggleDrawer) }>
          <Text>Menu</Text>
        </Pressable>
      ),
    });
  }, []);
  const toggleTerms = () => {
    setProvedTerms(!provedTerms);
    setIcon(icon === "remove" ? "checkbox" : "remove");
  };

  const validateEmail = (email: string) => {
    const re = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 8;
  };

  const validatePhone = (phone: string) => {
    const re = /^\d{8,15}$/;
    return re.test(phone);
  };

  const validateDPI = (dpi: string) => {
    const re = /^\d{13}$/;
    return re.test(dpi);
  };

  const validateForm = () => {
    if (!name || !last_name || gender === null || !phone || !noDPI || !password || !email) {
      setFormError('Todos los campos son obligatorios.');
      return false;
    }
    if (!validateEmail(email)) {
      setEmailError('Correo electrónico inválido');
      return false;
    }
    if (!validatePassword(password)) {
      setFormError('La contraseña debe tener al menos 8 caracteres.');
      return false;
    }
    if (!validatePhone(phone)) {
      setFormError('Número de teléfono inválido.');
      return false;
    }
    if (!validateDPI(noDPI)) {
      setFormError('Número de DPI inválido.');
      return false;
    }
    setFormError('');
    setEmailError('');
    return true;
  };

  const consultAPI = useCallback(async (token: string) => {
    const obj = {
      email,
      password,
      name,
      last_name: last_name,
      gender,
      phone,
      is_staff: false,
      is_active: true,
      no_dpi: noDPI,
    };
    try {
      const response = await axios.post(`${URL_PATIENTS}create/`, obj, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      });
      console.log('Usuario creado:', response.data);
      Alert.alert('Registro exitoso', 'El usuario se ha registrado correctamente.');
      navigation.navigate('SignIn' as never)
    } catch (error) {
      const axiosError = error as { response?: any };
      if (axiosError.response) {
        console.error('Error al crear usuario:', axiosError.response);
      } else {
        console.error('Error desconocido:', error);
      }
      Alert.alert('Error', 'No se pudo crear el usuario. Por favor, revisa los datos ingresados.');
    }
  }, [email, password, name, last_name, gender, phone, noDPI]);

  const handleRegister = async () => {
    if (!validateForm()) return;
    try {
      const tokenResponse = await axios.post(URL_TOKEN, {
        email:'hola1@gmail.com',
        password:'123a',
      });

      const { access, refresh } = tokenResponse.data;
      const token = `Bearer ${access || refresh}`;

      await consultAPI(token);
      setEmailError('');
    } catch (error) {
      console.error('Error al obtener token:', error);
      Alert.alert('Error', 'No se pudo obtener el token. Por favor, revisa tus credenciales.');
    }
  };

  const handleModalClose = () => {
    setVisibleModal(false);
  };

  const handleScroll = (event: { nativeEvent: { contentOffset: { y: number; }; layoutMeasurement: { height: number; }; contentSize: { height: number; }; }; }) => {
    if (event.nativeEvent.contentOffset.y + event.nativeEvent.layoutMeasurement.height >= event.nativeEvent.contentSize.height) {
      // Scroll event logic
    }
  };

  return (
    <View style={styles.container}>
    <ScrollView style={styles.scrollView} onScroll={handleScroll}>
      <View style={globalStyles.centerContainer}>
      <LogoShared/>
        <Text style={globalStyles.welcomeText}>¡Registrarse!</Text>
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
          onChangeText={setlast_name}
          value={last_name}
        />

        <TextInput
          label="DPI"
          style={globalStyles.textInput}
          placeholder="Ingresa tu número de DPI..."
          placeholderTextColor="#959393"
          textColor='#000'
          selectionColor="#959393"
          onChangeText={setNoDPI}
          value={noDPI}
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

        {formError ? <Text style={globalStyles.errorText}>{formError}</Text> : null}

        <TouchableOpacity onPress={() => setVisibleModal(true)} style={[globalStyles.textInput, globalStyles.genderInput]}>
          <Text style={{ color: '#000' }}>{gender !== null ? (gender === 0 ? 'Masculino' : 'Femenino') : 'Escoge tu género...'}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={visibleModal}
          onRequestClose={handleModalClose}
        >
          <View style={globalStyles.modalContainer}>
            <View style={globalStyles.modalContent}>
              <TouchableOpacity onPress={() => { setGender(0); setVisibleModal(false); }} style={globalStyles.modalOption}>
                <Text style={{ color: '#000' }}>Masculino</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => { setGender(1); setVisibleModal(false); }} style={globalStyles.modalOption}>
                <Text style={{ color: '#000' }}>Femenino</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handleModalClose} style={globalStyles.modalCloseButton}>
                <Text>Cerrar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TextInput
          label="Phone"
          style={globalStyles.textInput}
          placeholder="Escribe tu número de teléfono..."
          placeholderTextColor="#959393"
          textColor='#000'
          selectionColor="#959393"
          onChangeText={setPhone}
          keyboardType="phone-pad"
          value={phone}
        />

        <TouchableOpacity onPress={toggleTerms} style={globalStyles.checkboxContainer}>
        <IconButton
          icon={icon} 
          size={20}
          onPress={toggleTerms}
        />
          <Text style={globalStyles.termsText}>He leído y acepto los términos y condiciones.</Text>
        </TouchableOpacity>

        <FAB
          style={{
            backgroundColor: globalColors.secondary,
            margin: 10,
            marginBottom: 20,
          }}
          icon={'pencil-outline'}
          label={'Registrar'}
          color={'#FFFFFF'}
          onPress={handleRegister}
        />
        <TouchableOpacity onPress={() => navigation.navigate('SignIn' as never)}>
          <Text style={globalStyles.accountText}>¿Ya tienes una cuenta?</Text>
        </TouchableOpacity>
        </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  scrollView: {
    width: '100%',
    backgroundColor: 'transparent',
  },
})
