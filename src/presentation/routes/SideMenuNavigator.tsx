import { useWindowDimensions, View, Image } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StackNavigator  } from './';
import { SearchScreen, WelcomeScreen, AppointmentTimeScreen } from '../screens';
import { globalColors, globalStyles } from '../theme/global.styles';
import { AppoinmentsDoctorScreen } from '../screens/AppointmentsDoctorScreen';
import DoctorInformationScreen from '../screens/DoctorInformationScreen';
import {EditPersonalInformation} from '../screens/EditPersonalInformation';

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
      <Drawer.Screen name="DoctorInformation" component={DoctorInformationScreen} />
      <Drawer.Screen name="Buscar" component={SearchScreen} />
      <Drawer.Screen name="Editar perfil" component={EditPersonalInformation} />
      <Drawer.Screen name="Programar Cita" component={AppointmentTimeScreen} />
    </Drawer.Navigator>
  );
}

const CustomDrawerContent = ( props: DrawerContentComponentProps ) => {

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

        <DrawerItemList { ...props } />
      </DrawerContentScrollView>  
  )
}