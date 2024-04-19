import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Alert  } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';
import { globalStyles } from '../theme';

type Gender = 'Masculino' | 'Femenino';

export const EditPersonalInformation = () => {
  const [nombre, setName] = useState('');
  const [apellido, setSurname] = useState('');
  const [gender, setGender] = useState<Gender | null>(null);
  const [telefono, setPhone] = useState('');
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [ provedTerms, setProvedTerms ] = useState( false );
  const [ visibleModal, setVisibleModal ] = useState( false );

  const toggleTerms = () => {
    setProvedTerms( !provedTerms );
  };

  const handleModalClose = () => {
    setVisibleModal( false );
  };

  const guardarCambios = () => {
    const telefonoRegex = /^\d{8}$/;
    const telefonoValido = telefonoRegex.test(telefono);

    const fechaNacimientoRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    const fechaValida = fechaNacimientoRegex.test(fechaNacimiento);

    if (!telefonoValido) {
      Alert.alert('El teléfono debe tener 8 dígitos numéricos.');
      return;
    }

    if (!fechaValida) {
      Alert.alert('La fecha de nacimiento debe tener el formato dd/mm/yyyy.');
      return;
    }

    Alert.alert('Cambios guardados correctamente.');
  };

  return (
    <View style={ globalStyles.centerContainer }>
      <Text style={ globalStyles.title }>Edita tu información personal</Text>
      <TextInput
        label="Nombre"
        style={globalStyles.textInput}
        value={nombre}
        textColor= 'black'
        onChangeText={setName}
      />
      <TextInput
        label="Apellido"
        value={apellido}
        textColor= 'black'
        style={ globalStyles.textInput }
        onChangeText={setSurname}
      />
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
            </View>
          </View>
      </Modal>

      <TextInput
        label="Teléfono"
        value={telefono}
        onChangeText={setPhone}
        textColor= 'black'
        style={ [ globalStyles.textInput] }
        keyboardType="numeric"
      />
      <TextInput
        label="Fecha de Nacimiento"
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
        textColor= 'black'
        style={ [ globalStyles.textInput, {marginTop:25} ] }
        keyboardType="numeric"
      />
      <FAB
        style={ globalStyles.fab }
        label="Guardar Cambios"      
        onPress={guardarCambios}
        />
    </View>
  );
};