import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AppScreens } from "./AppScreens";
import ExploreProductScreen from "../screens/ExploreProductScreen"
import AllProductScreen from "../screens/AllPeoductScreen";
import { Colors } from "../style/color";
import { useLayoutEffect } from "react";
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import FilterScreen from "../screens/FilterScreen";
import FilteredDataScreen from "../screens/FilteredDataScreen";

const ExploreStack = createNativeStackNavigator();

export const ExploreStackNavigation = ({ navigation, route }) => {

    useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route);
        if (routeName === AppScreens.AllProductScreen) {
            navigation.setOptions({ tabBarStyle: { display: 'none' } })
        }
        else if (routeName === AppScreens.FilterScreen) {
            navigation.setOptions({ tabBarStyle: { display: 'none' } })
        }
        else {
            navigation.setOptions({
                tabBarStyle: {
                    display: 'flex',
                    height: hp(11),
                    backgroundColor: Colors.White,
                    shadowColor: Colors.Grey,
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    padding: wp(3),
                    borderTopLeftRadius: hp(3),
                    borderTopRightRadius: hp(3)
                }
            })
        }
    })
    return (
        <ExploreStack.Navigator
            initialRouteName={AppScreens.ExploreProductScreen}
            screenOptions={{ headerShown: false }}>
            <ExploreStack.Screen
                name={AppScreens.ExploreProductScreen}
                component={ExploreProductScreen} />
            <ExploreStack.Screen
                name={AppScreens.AllProductScreen}
                component={AllProductScreen}
            />
            <ExploreStack.Screen
                name={AppScreens.FilterScreen}
                component={FilterScreen} />
            <ExploreStack.Screen
                name={AppScreens.FilteredDataScreen}
                component={FilteredDataScreen} />
        </ExploreStack.Navigator>
    )
}