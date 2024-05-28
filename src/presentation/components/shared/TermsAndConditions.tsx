import React, { useState } from 'react';
import { View } from 'react-native-animatable';
import { globalStyles } from '../../theme';
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton, Text } from 'react-native-paper';
import { Modal, StyleSheet, TouchableOpacity } from 'react-native';



export const TermsAndConditions = () => {
  const [ visibleTermsModal, setVisibleTermsModal ] = useState( false );
  const [ icon, setIcon ] = useState( "remove" );
  const [ provedTerms, setProvedTerms ] = useState( false );

  const toggleTerms = () => {
    setProvedTerms( !provedTerms );
    setIcon( icon === "remove" ? "checkbox" : "remove" );
  };

  return (
    <>
      <TouchableOpacity onPress={ toggleTerms } style={ globalStyles.checkboxContainer }>
        <IconButton
          icon={ icon }
          size={ 20 }
          onPress={ toggleTerms }
        />
        <Text style={ globalStyles.termsText }>Acepto términos y condiciones.</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={ true }
        visible={ visibleTermsModal }
        onRequestClose={ () => setVisibleTermsModal( false ) }
      >


        <View style={ globalStyles.modalContainer }>
          <ScrollView style={ styles.modalContent } contentContainerStyle={ { flexGrow: 1 } }>
            <Text style={ styles.modalTitle }>Términos y Condiciones</Text>

            <Text style={ styles.plagioText }>
              <Text style={ styles.sectionTitle }>Bienvenido a Doctor-Link,</Text> una plataforma de citas médicas diseñada para conectar a pacientes con profesionales de la salud. Antes de utilizar nuestros servicios, te pedimos que leas atentamente estos <Text style={ styles.importantText }>Términos y Condiciones</Text>, ya que constituyen un contrato legal entre tú y Doctor-Link. Al acceder o utilizar nuestra aplicación móvil, sitio web y servicios relacionados (en adelante, "la Plataforma"), aceptas cumplir con estos <Text style={ styles.importantText }>Términos y Condiciones</Text>. Si no estás de acuerdo con alguna parte de estos términos, por favor, abstente de utilizar la Plataforma.

              { "\n\n" }
              <Text style={ styles.sectionTitle }>1. Uso de la Plataforma</Text>

              1.1. <Text style={ styles.importantText }>Doctor-Link</Text> es una plataforma que facilita la reserva de citas médicas entre profesionales de la salud y pacientes. El uso de la Plataforma está destinado únicamente para uso personal y no comercial. Queda estrictamente prohibido utilizar la Plataforma con fines ilegales o no autorizados.

              1.2. Para utilizar la Plataforma, debes ser mayor de edad según las leyes de tu jurisdicción. Al registrarte en <Text style={ styles.importantText }>Doctor-Link</Text>, aceptas proporcionar información precisa y actualizada sobre ti mismo.

              1.3. <Text style={ styles.importantText }>Doctor-Link</Text> se reserva el derecho de suspender o cancelar tu cuenta en caso de violación de estos <Text style={ styles.importantText }>Términos y Condiciones</Text> o si se sospecha de actividad fraudulenta.

              { "\n\n" }
              <Text style={ styles.sectionTitle }>2. Responsabilidades de los Usuarios</Text>

              2.1. Los pacientes son responsables de proporcionar información precisa y completa sobre su historial médico al programar una cita a través de la Plataforma. Cualquier información falsa o engañosa puede resultar en consecuencias adversas para tu salud.

              2.2. Los profesionales de la salud son responsables de brindar servicios médicos de alta calidad y cumplir con todas las leyes y regulaciones aplicables en su jurisdicción.

              2.3. <Text style={ styles.importantText }>Doctor-Link</Text> no se hace responsable por la calidad de los servicios médicos prestados por los profesionales de la salud a través de la Plataforma. Sin embargo, nos esforzamos por garantizar que todos los profesionales registrados cumplan con nuestros estándares de calidad y ética.

              { "\n\n" }
              <Text style={ styles.sectionTitle }>3. Privacidad y Seguridad</Text>

              3.1. <Text style={ styles.importantText }>Doctor-Link</Text> se compromete a proteger la privacidad y seguridad de tus datos personales de acuerdo con nuestra Política de Privacidad. Al utilizar la Plataforma, aceptas nuestras prácticas de recopilación, uso y divulgación de información personal.

              3.2. Los usuarios son responsables de mantener la confidencialidad de sus credenciales de inicio de sesión y de notificar a <Text style={ styles.importantText }>Doctor-Link</Text> de cualquier uso no autorizado de su cuenta.

              { "\n\n" }
              <Text style={ styles.sectionTitle }>4. Propiedad Intelectual</Text>

              4.1. Todos los derechos de propiedad intelectual relacionados con la Plataforma, incluidos, entre otros, los derechos de autor, marcas comerciales, patentes y secretos comerciales, son propiedad exclusiva de <Text style={ styles.importantText }>Doctor-Link</Text> o de sus licenciantes.

              4.2. Queda estrictamente prohibido copiar, modificar, distribuir, transmitir, exhibir, realizar públicamente, reproducir, publicar, licenciar, crear trabajos derivados, transferir o vender cualquier contenido de la Plataforma sin el consentimiento previo por escrito de <Text style={ styles.importantText }>Doctor-Link</Text>.

              { "\n\n" }
              <Text style={ styles.sectionTitle }>5. Limitación de Responsabilidad</Text>

              5.1. En la máxima medida permitida por la ley aplicable, <Text style={ styles.importantText }>Doctor-Link</Text> no será responsable de ningún daño directo, indirecto, incidental, especial, consecuente o punitivo, incluidos, entre otros, daños por pérdida de beneficios, datos, uso o buena voluntad, derivados del uso o la imposibilidad de usar la Plataforma.

              5.2. En ningún caso la responsabilidad total de <Text style={ styles.importantText }>Doctor-Link</Text> ante cualquier usuario excederá el monto total pagado por dicho usuario en los seis meses anteriores al evento que dio lugar a la reclamación.

              { "\n\n" }
              <Text style={ styles.sectionTitle }>6. Modificaciones y Terminación</Text>

              6.1. <Text style={ styles.importantText }>Doctor-Link</Text> se reserva el derecho de modificar, suspender o dar por terminados estos <Text style={ styles.importantText }>Términos y Condiciones</Text> en cualquier momento y a su entera discreción. Se te notificará cualquier cambio mediante la publicación de una versión actualizada de estos términos en la Plataforma.

              6.2. El uso continuado de la Plataforma después de la entrada en vigencia de los cambios constituirá tu aceptación de los nuevos términos.

              { "\n\n" }
              <Text style={ styles.sectionTitle }>7. Ley Aplicable y Jurisdicción</Text>

              7.1. Estos <Text style={ styles.importantText }>Términos y Condiciones</Text> se regirán e interpretarán de acuerdo con las leyes del país en el que <Text style={ styles.importantText }>Doctor-Link</Text> tiene su sede principal, sin tener en cuenta los principios de conflicto de leyes.

              7.2. Cualquier disputa relacionada con estos <Text style={ styles.importantText }>Términos y Condiciones</Text> estará sujeta a la jurisdicción exclusiva de los tribunales competentes del país antes mencionado.

              { "\n\n" }
              Al aceptar estos <Text style={ styles.importantText }>Términos y Condiciones</Text>, reconoces que has leído, comprendido y aceptado cumplir con todas las disposiciones aquí establecidas. Si tienes alguna pregunta o inquietud sobre estos términos, por favor contáctanos a través de los medios proporcionados en la Plataforma.
            </Text>
            <TouchableOpacity
              style={ styles.modalAcceptButton }
              onPress={ () => {
                setVisibleTermsModal( false );
              } }
            >
              <Text style={ styles.modalAcceptButtonText }>Aceptar</Text>
            </TouchableOpacity>
            <Text style={ styles.importantText }>Doctor-Link, reservamos el derecho de plagio 2024</Text>

            <Text style={ styles.plagioText }>.</Text>

          </ScrollView>
        </View>
      </Modal>
    </>
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
