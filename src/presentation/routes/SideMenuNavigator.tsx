import { useWindowDimensions, View } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StackNavigator  } from './';
import { WelcomeScreen } from '../screens';
import { globalColors } from '../theme/global.styles';
import { LogoShared } from '../components';
import { AppoinmentsDoctorScreen } from '../screens/AppointmentsDoctorScreen';

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
          <LogoShared />
          </View>

        <DrawerItemList { ...props } />
      </DrawerContentScrollView>  
  )
}