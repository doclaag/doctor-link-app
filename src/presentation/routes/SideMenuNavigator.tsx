import { useWindowDimensions, View, Image, Text, TouchableOpacity, Alert } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StackNavigator  } from './';
import { SearchScreen, WelcomeScreen, AppointmentTimeScreen, AppointmentSearch, } from '../screens';
import { globalColors, globalStyles } from '../theme/global.styles';
import { AppoinmentsDoctorScreen } from '../screens/AppointmentsDoctorScreen';
import DoctorInformationScreen from '../screens/DoctorInformationScreen';
import {EditPersonalInformation} from '../screens/EditPersonalInformation';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StackActions } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

export const SideMenuNavigator = () =>  {
  
  const dimensions = useWindowDimensions();

  return ( 
    <Drawer.Navigator

      drawerContent={ ( props ) => <CustomDrawerContent { ...props}/>}

      screenOptions={{
        headerShown: false,
        drawerType: (dimensions.width >= 768) ? 'permanent' : 'slide',
        drawerActiveBackgroundColor: globalColors.primary,
        drawerActiveTintColor: globalColors.white,
        drawerInactiveTintColor: globalColors.primary,
        drawerItemStyle:{
          borderRadius: 100,
          paddingHorizontal: 20,
        }
      }}
    >
      <Drawer.Screen name="StackNavigator" component={StackNavigator} />
      <Drawer.Screen name="Inicio" component={WelcomeScreen} />
      <Drawer.Screen name="Citas" component={AppoinmentsDoctorScreen} />
      <Drawer.Screen name="Información Doctor" component={DoctorInformationScreen} />
      <Drawer.Screen name="Buscar" component={SearchScreen} />
      <Drawer.Screen name="Editar perfil" component={EditPersonalInformation} />
      <Drawer.Screen name="Programar Cita" component={AppointmentTimeScreen} />
      <Drawer.Screen name="Ver citas" component={AppointmentSearch} />
    </Drawer.Navigator>
  );
}

const CustomDrawerContent = ( props: DrawerContentComponentProps ) => {
  const navigation = useNavigation();
  
  const handleLogout = async () => {
    await AsyncStorage.removeItem('userToken');
    navigation.dispatch(StackActions.replace('SignIn')); 
  };
  const confirmLogout = () => {
    Alert.alert(
      'Confirmación',
      '¿Está seguro de que desea cerrar sesión?',
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Sí',
          onPress: handleLogout,
        },
      ],
      { cancelable: false }
    );
  };
  return (
      <DrawerContentScrollView { ...props }>
        <View
        style={ {
          backgroundColor: globalColors.primary,
          borderRadius:50,
          height: 200,
          margin:30,
          justifyContent: 'center',
        }}
        >

          <Image
            source={ require( '../../assets/img/user.png' ) }
            style={ globalStyles.image}
          />

          </View>
        <View style={{ padding: 20 }}>
          <TouchableOpacity onPress={confirmLogout} style={{ marginVertical: 10 }}>
          <Text style={{ color: globalColors.primary, fontSize: 16 }}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
        <DrawerItemList { ...props } />
      </DrawerContentScrollView>  
  )
}