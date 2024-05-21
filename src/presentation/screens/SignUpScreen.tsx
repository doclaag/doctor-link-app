import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView, Alert, ImageBackground } from 'react-native';
import { FAB, IconButton, TextInput } from 'react-native-paper';
import { LogoShared } from '../components';
import type { RootStackParams } from '../routes/StackNavigator';
import { globalColors, globalStyles } from '../theme';
import { URLTOKEN, URL_PATIENTS } from '@env';
import axios from 'axios';
import { type NavigationProp, useNavigation, DrawerActions } from '@react-navigation/native';

type Gender = 0 | 1;

export const SignUpScreen = () => {

  const [name, setName] = useState('');
  const [last_name, setlast_name] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [phone, setPhone] = useState('');
  const [noDPI, setNoDPI] = useState('');
  const [provedTerms, setProvedTerms] = useState(false);
  const [visibleModal, setVisibleModal] = useState(false);
  const [ visibleTermsModal, setVisibleTermsModal] = useState(false);
  const [ visibleGenderModal, setVisibleGenderModal] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [formError, setFormError] = useState('');
  const [icon, setIcon] = useState("remove");
  const [ reachedEnd, setReachedEnd ] = useState( false );

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
      const tokenResponse = await axios.post(URLTOKEN, {
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
    if (gender !== null) {
      setGender(gender);
    }
    setVisibleGenderModal(false);
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
        <TouchableOpacity onPress={() => setVisibleGenderModal(true)} style={[globalStyles.textInput, globalStyles.genderInput]}>
          <Text style={{ color: '#000' }}>{gender !== null ? (gender === 0 ? 'Masculino' : 'Femenino') : 'Escoge tu género...'}</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={visibleGenderModal}
          onRequestClose={() => setVisibleGenderModal(false)}
        > 
          <View style={ globalStyles.modalContainer }>
            <View style={ globalStyles.modalContent }>
              <TouchableOpacity onPress={ () => { setGender( 0 ); setVisibleGenderModal( false ); } } style={ globalStyles.modalOption }>
                <Text style={ { color: '#000' } }>Masculino</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={ () => { setGender( 1 ); setVisibleGenderModal( false ); } } style={ globalStyles.modalOption }>
                <Text style={ { color: '#000' } }>Femenino</Text>
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

        <TouchableOpacity onPress={(toggleTerms) => setVisibleTermsModal(true)} style={globalStyles.checkboxContainer}>
          <IconButton
          icon={icon} 
          size={20}
          onPress={toggleTerms}
        />
          <Text style={ globalStyles.termsText }>Acepto términos y condiciones.</Text>
        </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleTermsModal}
        onRequestClose={() => setVisibleTermsModal(false)}
      >
        <View style={globalStyles.modalContainer}>
          <ScrollView style={styles.modalContent} contentContainerStyle={{ flexGrow: 1 }}>
            <Text style={styles.modalTitle}>Términos y Condiciones</Text>

            <Text style={styles.plagioText}>
            <Text style={styles.sectionTitle}>Bienvenido a Doctor-Link,</Text> una plataforma de citas médicas diseñada para conectar a pacientes con profesionales de la salud. Antes de utilizar nuestros servicios, te pedimos que leas atentamente estos <Text style={styles.importantText}>Términos y Condiciones</Text>, ya que constituyen un contrato legal entre tú y Doctor-Link. Al acceder o utilizar nuestra aplicación móvil, sitio web y servicios relacionados (en adelante, "la Plataforma"), aceptas cumplir con estos <Text style={styles.importantText}>Términos y Condiciones</Text>. Si no estás de acuerdo con alguna parte de estos términos, por favor, abstente de utilizar la Plataforma.
            
            {"\n\n"}
            <Text style={styles.sectionTitle}>1. Uso de la Plataforma</Text>

            1.1. <Text style={styles.importantText}>Doctor-Link</Text> es una plataforma que facilita la reserva de citas médicas entre profesionales de la salud y pacientes. El uso de la Plataforma está destinado únicamente para uso personal y no comercial. Queda estrictamente prohibido utilizar la Plataforma con fines ilegales o no autorizados.

            1.2. Para utilizar la Plataforma, debes ser mayor de edad según las leyes de tu jurisdicción. Al registrarte en <Text style={styles.importantText}>Doctor-Link</Text>, aceptas proporcionar información precisa y actualizada sobre ti mismo.

            1.3. <Text style={styles.importantText}>Doctor-Link</Text> se reserva el derecho de suspender o cancelar tu cuenta en caso de violación de estos <Text style={styles.importantText}>Términos y Condiciones</Text> o si se sospecha de actividad fraudulenta.

            {"\n\n"}
            <Text style={styles.sectionTitle}>2. Responsabilidades de los Usuarios</Text>

            2.1. Los pacientes son responsables de proporcionar información precisa y completa sobre su historial médico al programar una cita a través de la Plataforma. Cualquier información falsa o engañosa puede resultar en consecuencias adversas para tu salud.

            2.2. Los profesionales de la salud son responsables de brindar servicios médicos de alta calidad y cumplir con todas las leyes y regulaciones aplicables en su jurisdicción.

            2.3. <Text style={styles.importantText}>Doctor-Link</Text> no se hace responsable por la calidad de los servicios médicos prestados por los profesionales de la salud a través de la Plataforma. Sin embargo, nos esforzamos por garantizar que todos los profesionales registrados cumplan con nuestros estándares de calidad y ética.

            {"\n\n"}
            <Text style={styles.sectionTitle}>3. Privacidad y Seguridad</Text>

            3.1. <Text style={styles.importantText}>Doctor-Link</Text> se compromete a proteger la privacidad y seguridad de tus datos personales de acuerdo con nuestra Política de Privacidad. Al utilizar la Plataforma, aceptas nuestras prácticas de recopilación, uso y divulgación de información personal.

            3.2. Los usuarios son responsables de mantener la confidencialidad de sus credenciales de inicio de sesión y de notificar a <Text style={styles.importantText}>Doctor-Link</Text> de cualquier uso no autorizado de su cuenta.

            {"\n\n"}
            <Text style={styles.sectionTitle}>4. Propiedad Intelectual</Text>

            4.1. Todos los derechos de propiedad intelectual relacionados con la Plataforma, incluidos, entre otros, los derechos de autor, marcas comerciales, patentes y secretos comerciales, son propiedad exclusiva de <Text style={styles.importantText}>Doctor-Link</Text> o de sus licenciantes.

            4.2. Queda estrictamente prohibido copiar, modificar, distribuir, transmitir, exhibir, realizar públicamente, reproducir, publicar, licenciar, crear trabajos derivados, transferir o vender cualquier contenido de la Plataforma sin el consentimiento previo por escrito de <Text style={styles.importantText}>Doctor-Link</Text>.

            {"\n\n"}
            <Text style={styles.sectionTitle}>5. Limitación de Responsabilidad</Text>

            5.1. En la máxima medida permitida por la ley aplicable, <Text style={styles.importantText}>Doctor-Link</Text> no será responsable de ningún daño directo, indirecto, incidental, especial, consecuente o punitivo, incluidos, entre otros, daños por pérdida de beneficios, datos, uso o buena voluntad, derivados del uso o la imposibilidad de usar la Plataforma.

            5.2. En ningún caso la responsabilidad total de <Text style={styles.importantText}>Doctor-Link</Text> ante cualquier usuario excederá el monto total pagado por dicho usuario en los seis meses anteriores al evento que dio lugar a la reclamación.

            {"\n\n"}
            <Text style={styles.sectionTitle}>6. Modificaciones y Terminación</Text>

            6.1. <Text style={styles.importantText}>Doctor-Link</Text> se reserva el derecho de modificar, suspender o dar por terminados estos <Text style={styles.importantText}>Términos y Condiciones</Text> en cualquier momento y a su entera discreción. Se te notificará cualquier cambio mediante la publicación de una versión actualizada de estos términos en la Plataforma.

            6.2. El uso continuado de la Plataforma después de la entrada en vigencia de los cambios constituirá tu aceptación de los nuevos términos.

            {"\n\n"}
            <Text style={styles.sectionTitle}>7. Ley Aplicable y Jurisdicción</Text>

            7.1. Estos <Text style={styles.importantText}>Términos y Condiciones</Text> se regirán e interpretarán de acuerdo con las leyes del país en el que <Text style={styles.importantText}>Doctor-Link</Text> tiene su sede principal, sin tener en cuenta los principios de conflicto de leyes.

            7.2. Cualquier disputa relacionada con estos <Text style={styles.importantText}>Términos y Condiciones</Text> estará sujeta a la jurisdicción exclusiva de los tribunales competentes del país antes mencionado.

            {"\n\n"}
            Al aceptar estos <Text style={styles.importantText}>Términos y Condiciones</Text>, reconoces que has leído, comprendido y aceptado cumplir con todas las disposiciones aquí establecidas. Si tienes alguna pregunta o inquietud sobre estos términos, por favor contáctanos a través de los medios proporcionados en la Plataforma.
          </Text>
           <TouchableOpacity
            style={styles.modalAcceptButton}
            onPress={() => {
              setVisibleTermsModal(false);
            }}
          >
            <Text style={styles.modalAcceptButtonText}>Aceptar</Text>
          </TouchableOpacity>
          <Text style={styles.importantText}>Doctor-Link, reservamos el derecho de plagio 2024</Text>

          <Text style={styles.plagioText}>.</Text>

        </ScrollView>
      </View>
    </Modal>
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

const styles = StyleSheet.create( {
  container: {
    flex: 1,
    backgroundColor: 'skyblue',
  },
  modalTitle: {
    color:'black',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  importantText: {
    color:'grey',
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