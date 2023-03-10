import { createDrawerNavigator } from "@react-navigation/drawer"
import { NavigationContainer } from "@react-navigation/native";
import BottomTab from "../component/BottomTab";
import OnBoardingScreen from "../screens/onBoardingScreen";
import AppNavigator from "./AppNavigator";
import { AppScreens } from "./AppScreens";
import AuthStack from "./AuthStack";

const DrawerNavigation = createDrawerNavigator();

const DrawerStack = () => {
    return (
        <NavigationContainer>
            <DrawerNavigation.Navigator initialRouteName={AppScreens.AuthStack}>
                <DrawerNavigation.Screen
                    name={AppScreens.AuthStack}
                    component={AuthStack}
                />
                <DrawerNavigation.Screen
                    name={AppScreens.BottomTab}
                    component={BottomTab} />
                <DrawerNavigation.Screen
                    name={AppScreens.AppNavigator}
                    component={AppNavigator} />
            </DrawerNavigation.Navigator>
        </NavigationContainer>
    )
}

export default DrawerStack