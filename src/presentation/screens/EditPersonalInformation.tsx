import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, Image, Button } from 'react-native';
import { FAB, TextInput } from 'react-native-paper';
import { globalStyles } from '../theme';
import { globalColors } from '../theme/global.styles';

type Gender = 'Masculino' | 'Femenino';

export const EditPersonalInformation = () => {
  const [nombre, setNombre] = useState(''); // Cambiado setName a setNombre para mantener la consistencia en el idioma
  const [apellido, setApellido] = useState(''); // Cambiado setSurname a setApellido para mantener la consistencia en el idioma
  const [gender, setGender] = useState<Gender | null>(null);
  const [telefono, setTelefono] = useState(''); // Cambiado setPhone a setTelefono para mantener la consistencia en el idioma
  const [fechaNacimiento, setFechaNacimiento] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [validationErrors, setValidationErrors] = useState<{ [key: string]: string }>({});
  const [isEditable, setIsEditable] = useState(false);

  const handleModalClose = () => {
    setVisibleModal(false);
  };

  const renderGenderText = () => {
    return gender ? gender : 'Escoge tu género...';
  };

  const handleGenderSelection = (selectedGender: Gender) => {
    setGender(selectedGender);
    setVisibleModal(false);
  };

  const handleSaveChanges = () => {
    const errors: { [key: string]: string } = {};

    if (telefono.length !== 8 && telefono.length > 0) {
      errors.telefono = 'El teléfono debe tener 8 dígitos numéricos.';
    }

    if (!fechaNacimiento.match(/^\d{2}\/\d{2}\/\d{4}$/) && fechaNacimiento.length > 0) {
      errors.fechaNacimiento = 'La fecha de nacimiento debe tener el formato dd/mm/yyyy.';
    }

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
    } else {
      // Aquí puedes realizar la lógica para guardar los cambios
      console.log('Guardar cambios');
    }
  };

  return (
    <View style={globalStyles.centerContainer}>
      {!isEditable && (
        <View style={{alignSelf: 'flex-end'}}>
          <Button title="Editar" onPress={() => setIsEditable(true)} />
        </View>
      )}
      <View style={globalStyles.profileAvatar}>
        <Image
          source={require('../../assets/img/doctor.png')}
          style={globalStyles.avatarImage}
        />
      </View>
      <Text style={globalStyles.doctorName}>Información personal</Text>
      
      <TextInput
        label="Nombre"
        style={globalStyles.textInput}
        value={nombre}
        onChangeText={setNombre}
        editable={isEditable}
      />
      <TextInput
        label="Apellido"
        value={apellido}
        style={globalStyles.textInput}
        onChangeText={setApellido}
        editable={isEditable}
      />
      <TouchableOpacity onPress={() => setVisibleModal(true)} style={[globalStyles.textInput, globalStyles.genderInput]}>
        <Text style={{ color: globalColors.black }}>{renderGenderText()}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleModal}
        onRequestClose={handleModalClose}
      >
        <View style={globalStyles.modalContainer}>
          <View style={globalStyles.modalContent}>
            <TouchableOpacity onPress={() => handleGenderSelection('Masculino')} style={globalStyles.modalOption}>
              <Text style={{ color: globalColors.black }}>Masculino</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleGenderSelection('Femenino')} style={globalStyles.modalOption}>
              <Text style={{ color: globalColors.black }}>Femenino</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <TextInput
        label="Teléfono"
        value={telefono}
        onChangeText={setTelefono}
        style={globalStyles.textInput}
        keyboardType="numeric"
        error={!!validationErrors.telefono}
        editable={isEditable}
      />
      {validationErrors.telefono && <Text style={globalStyles.errorText}>{validationErrors.telefono}</Text>}
      
      <TextInput
        label="Fecha de Nacimiento"
        value={fechaNacimiento}
        onChangeText={setFechaNacimiento}
        style={[globalStyles.textInput, { marginTop: 25 }]}
        keyboardType="numeric"
        error={!!validationErrors.fechaNacimiento}
        editable={isEditable}
      />
      {validationErrors.fechaNacimiento && <Text style={globalStyles.errorText}>{validationErrors.fechaNacimiento}</Text>}
      
      {isEditable && (
        <FAB
          style={globalStyles.fab}
          label="Guardar Cambios"
          onPress={handleSaveChanges}
        />
      )}
    </View>
  );
};