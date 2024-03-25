import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Modal } from 'react-native';
import { FAB, Checkbox, TextInput } from 'react-native-paper';
import { LogoShared } from '../components';

type Genero = 'Masculino' | 'Femenino'; // Definimos el tipo de género

export const SignUpScreen = () => {
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [genero, setGenero] = useState<Genero>(''); // Definimos el estado con el tipo Genero
    const [usuario, setUsuario] = useState('');
    const [terminosChecked, setTerminosChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);

    const toggleTerminos = () => {
        setTerminosChecked(!terminosChecked);
    };

    const handleModalClose = () => {
        setModalVisible(false);
    };

    return (
        <>
            <View style={styles.content}>
                <LogoShared />

                <TextInput
                    label="Nombre"
                    style={styles.input}
                    placeholder="Escribe tu nombre..."
                    textColor='#000'
                    placeholderTextColor="#959393"
                    selectionColor="#959393"
                    onChangeText={setNombre}
                    value={nombre}
                />

                <TextInput
                    label="Apellido"
                    style={styles.input}
                    placeholder="Escribe tu apellido..."
                    textColor='#000'
                    placeholderTextColor="#959393"
                    selectionColor="#959393"
                    onChangeText={setApellido}
                    value={apellido}
                />

                <TouchableOpacity onPress={() => setModalVisible(true)} style={[styles.input, styles.genderInput]}>
                    <Text style={{ color: '#000' }}>{genero ? genero : 'Escoge tu género...'}</Text>
                </TouchableOpacity>



                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={handleModalClose}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <TouchableOpacity onPress={() => { setGenero('Masculino'); setModalVisible(false) }} style={styles.modalOption}>
                                <Text style={{ color: '#000' }}>Masculino</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => { setGenero('Femenino'); setModalVisible(false) }} style={styles.modalOption}>
                                <Text style={{ color: '#000' }}>Femenino</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleModalClose} style={styles.modalCloseButton}>
                                <Text>Cerrar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                <TextInput
                    label="Usuario"
                    style={styles.input}
                    placeholder="Ingresa tu usuario..."
                    placeholderTextColor="#959393"
                    textColor='#000'
                    selectionColor="#959393"
                    onChangeText={setUsuario}
                    value={usuario}
                />

                <TouchableOpacity onPress={toggleTerminos} style={styles.checkboxContainer}>
                    <Checkbox
                        status={terminosChecked ? 'checked' : 'unchecked'}
                        color='#000'
                        uncheckedColor='#000'
                    />
                    <Text style={styles.terminosText}>Acepto términos y condiciones.</Text>
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
                />

                <Text style={styles.cuentaText}>¿Ya tienes cuenta :)?</Text>

            </View>
        </>
    );
};

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 350,
        backgroundColor: '#fff',
        borderRadius: 50,
        borderTopEndRadius: 50,
        borderTopLeftRadius: 50,
        paddingHorizontal: 8,
        marginBottom: 20
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
    },
    genderInput: {
        width: 350,
        height: 50, // Puedes ajustar el alto según tu preferencia
        justifyContent: 'center', // Centrar verticalmente el texto
        paddingHorizontal: 8,
        marginBottom: 20
    },
    terminosText: {
        color: 'gray',
        marginLeft: 8,
    },
    cuentaText: {
        marginTop: 20,
        color: 'gray',
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
        width: '80%',
    },
    modalOption: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalCloseButton: {
        marginTop: 10,
        alignItems: 'center',
    }
});
