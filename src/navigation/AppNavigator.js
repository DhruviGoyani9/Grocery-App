import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SignInScreen from '../screens/SignInScreen';
import OnBoardingScreen from '../screens/onBoardingScreen';
import VerificationScreen from '../screens/VerificationScreen';
import { Colors } from '../style/color';
import SelectLocationScreen from '../screens/SelectLocationScreen';
import LogInScreen from '../screens/LogInScreen';
import { AppScreens } from './AppScreens';
import SignUpScreen from '../screens/SignUpScreen';
import BottomTab from '../component/BottomTab';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName={AppScreens.BottomTab}>
                <Stack.Screen name={AppScreens.SignInScreen} component={SignInScreen} />
                <Stack.Screen name={AppScreens.OnBoardingScreen} component={OnBoardingScreen} />
                <Stack.Screen name={AppScreens.BottomTab} component={BottomTab} />
                <Stack.Screen name={AppScreens.VerificationScreen} component={VerificationScreen}
                    options={{
                        headerShown: true,
                        headerBackTitleVisible: false,
                        title: '',
                        headerShadowVisible: false,
                        headerTintColor: Colors.Black,
                        headerBackTitleStyle: {}
                    }}
                />
                <Stack.Screen name={AppScreens.SelectLocationScreen} component={SelectLocationScreen}
                    options={{
                        headerShown: true,
                        headerBackTitleVisible: false,
                        title: '',
                        headerShadowVisible: false,
                        headerTintColor: Colors.Black,
                    }}
                />
                <Stack.Screen name={AppScreens.logInScreen} component={LogInScreen} />
                <Stack.Screen name={AppScreens.SignUpScreen} component={SignUpScreen} />
                {/* <Stack.Screen name={AppScreens.HomeScreen} component={HomeStackNavigation} /> */}
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigator