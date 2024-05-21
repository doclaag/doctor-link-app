import { createStackNavigator } from '@react-navigation/stack';
import { GetStartedScreen, SearchScreen, SignInScreen, SignUpScreen, WelcomeScreen, AppointmentTimeScreen, } from '../screens';
import DoctorInformationScreen from '../screens/DoctorInformationScreen';
import { AppoinmentsDoctorScreen } from '../screens/AppointmentsDoctorScreen';

export type RootStackParams = {
  Welcome: undefined;
  GetStarted: undefined;
  SignIn: undefined;
  SignUp: undefined;
  Search: undefined;
  DoctorInformation: { doctorId: string };
  AppointmentTime: { doctorId:string };
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{ title: ''}} 
      />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ title: ''}} 
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ title: ''}} 
      />
      <Stack.Screen
        name="Search"
        component={SearchScreen}
        options={{ title: ''}} 
      />
      <Stack.Screen
        name="DoctorInformation"
        component={DoctorInformationScreen}
        options={{ title: ''}} 
      />
      <Stack.Screen
        name="GetStarted"
        component={GetStartedScreen}
        options={{ title: ''}} 
      />
      <Stack.Screen
        name="AppointmentTime"
        component={AppointmentTimeScreen}
        options={{ title: ''}} 
      />
      <Stack.Screen
      name="AppoinmentsDoctor"
      component={AppoinmentsDoctorScreen}
      options={{ title: ''}} 
    />
    </Stack.Navigator>
  )
}