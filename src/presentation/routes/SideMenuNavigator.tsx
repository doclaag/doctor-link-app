import { useWindowDimensions, View } from 'react-native';
import { createDrawerNavigator, DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { StackNavigator  } from './';
import { SearchScreen, WelcomeScreen } from '../screens';
import { globalColors } from '../theme/global.styles';
import { LogoShared } from '../components';

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
      <Drawer.Screen name="Welcome" component={WelcomeScreen} />
      <Drawer.Screen name="Search" component={SearchScreen} />
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