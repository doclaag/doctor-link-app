import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { FAB, Checkbox, TextInput } from 'react-native-paper';
import { LogoShared } from '../components';

import { globalStyles } from '../theme';
import { URL_PATIENTS } from '@env';
import axios from 'axios';

type Gender = 0 | 1;

export const SignUpScreen = () => {
  const [ name, setName ] = useState( '' );
  const [ surname, setSurname ] = useState( '' );
  const [ gender, setGender ] = useState<Gender | null>( null );
  const [ user, setUser ] = useState( '' );
  const [ phone, setPhone ] = useState( '' );
  const [ noDPI, setNoDPI ] = useState( '' );
  const [ provedTerms, setProvedTerms ] = useState( false );
  const [ visibleTermsModal, setVisibleTermsModal] = useState(false);
  const [ visibleGenderModal, setVisibleGenderModal] = useState(false);
  const [ password, setPassword ] = useState( '' );
  const [ showPassword, setShowPassword ] = useState( false );
  const [ email, setEmail ] = useState( '' );
  const [ emailError, setEmailError ] = useState( '' );
  const [ reachedEnd, setReachedEnd ] = useState( false );
  


  const toggleTerms = () => {
    setProvedTerms( !provedTerms );
  };

  
  const consultAPI = useCallback(async () => {
    const obj = {
      email,
      password,
      name,
      last_name: surname,
      gender,
      phone,
      is_staff: false,
      is_active: true,
      no_dpi: noDPI,
    };
    try {
      const response = await axios.post(`${URL_PATIENTS}create/`, obj, { headers: { 'Content-Type': 'application/json' } });
    } catch (error) {
     // console.error(error.response);
    }
  }, [name, surname, gender, phone, noDPI, password, email]); 
  

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
    if (gender !== null) {
      setGender(gender);
    }
    setVisibleGenderModal(false);
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

        <TouchableOpacity onPress={() => setVisibleTermsModal(true)} style={globalStyles.checkboxContainer}>
          <Checkbox
            status={provedTerms ? 'checked' : 'unchecked'}
            color='#000'
            uncheckedColor='#000'
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

            <Text>
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
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontWeight: 'bold',
  },
  importantText: {
    fontWeight: 'bold',
    fontStyle: 'italic',
  },
  scrollView: {
    width: '100%',
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
    maxHeight: '80%', // Cambiado la altura máxima de la modal
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