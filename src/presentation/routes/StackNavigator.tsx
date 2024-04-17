import { createStackNavigator } from '@react-navigation/stack';
import { GetStartedScreen, SignInScreen, SignUpScreen, WelcomeScreen } from '../screens';

export type RootStackParams = {
  Welcome: undefined;
  GetStarted: undefined;
  SignIn: undefined;
  SignUp: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="GetStarted" component={GetStartedScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}