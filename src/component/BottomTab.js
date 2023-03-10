import 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, useNavigation, usePreventRemoveContext } from '@react-navigation/native';
import { AppScreens } from '../navigation/AppScreens';
import ExploreProductScreen from '../screens/ExploreProductScreen';
import MyCartScreen from '../screens/MyCartScreen';
import FavouriteScreen from '../screens/FavouriteScreen';
import AccountScreen from '../screens/AccountScreen';
import { Strings } from '../utils/strings';
import { Image, StyleSheet } from 'react-native';
import { ImagePaths } from '../utils/ImagePaths';
import { Colors } from '../style/color';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { FontNames } from '../style/fonts';
import { FontSize } from '../style/fontSize';
import HomeStackNavigation from '../navigation/HomeStackNavigation';
import { ExploreStackNavigation } from '../navigation/ExploreStackNavigation';
import { useEffect } from 'react';
import AccountStack from '../navigation/AccountStack';
import AccountStackNavigator from '../navigation/AccountStack';
import HomeScreen from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();
const BottomTab = () => {
    const navigation = useNavigation();

    return (
        // <NavigationContainer>
        <Tab.Navigator
            initialRouteName={Strings.bottomTab.Shop}
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color }) => {
                    if (route.name === Strings.bottomTab.Shop) {
                        return <Image
                            style={[styles.bottomTabIcon, { tintColor: color }]}
                            source={ImagePaths.shop}
                            resizeMode={'contain'}
                            tintColor={color} />
                    } else if (route.name === Strings.bottomTab.Explore) {
                        return <Image
                            style={[styles.bottomTabIcon, { tintColor: color }]}
                            source={ImagePaths.explore}
                            resizeMode={'contain'} />
                    } else if (route.name === Strings.bottomTab.Cart) {
                        return <Image
                            style={[styles.bottomTabIcon, { tintColor: color }]}
                            source={ImagePaths.cart}
                            resizeMode={'contain'} />
                    } else if (route.name === Strings.bottomTab.Favourite) {
                        return <Image
                            style={[styles.bottomTabIcon, { tintColor: color }]}
                            source={ImagePaths.favourite}
                            resizeMode={'contain'} />
                    } else if (route.name === Strings.bottomTab.Account) {
                        return <Image
                            style={[styles.bottomTabIcon, { tintColor: color }]}
                            source={ImagePaths.account}
                            resizeMode={'contain'} />
                    }
                },
                tabBarActiveTintColor: Colors.LightGreen,
                tabBarInactiveTintColor: Colors.Black_18,
                headerShown: false,
                tabBarStyle: {
                    height: hp(11),
                    backgroundColor: Colors.White,
                    shadowColor: Colors.Grey,
                    shadowOpacity: 0.5,
                    shadowRadius: 3,
                    padding: wp(3),
                    borderTopLeftRadius: hp(3),
                    borderTopRightRadius: hp(3)

                },
                tabBarLabelStyle: {
                    fontFamily: FontNames.PoppinsRegular,
                    fontWeight: '600',
                    textAlign: 'center',
                    fontSize: FontSize.fontsize_11
                },
            })}>
            <Tab.Screen name={Strings.bottomTab.Shop} component={HomeStackNavigation} />
            <Tab.Screen name={Strings.bottomTab.Explore} component={ExploreStackNavigation} />
            <Tab.Screen
                name={Strings.bottomTab.Cart}
                component={MyCartScreen}
                options={{
                    headerShown: true,
                    title: 'My Cart',
                    headerTintColor: Colors.Black_18,
                    headerTitleStyle: {
                        fontFamily: FontNames.PoppinsBold,
                        fontSize: FontSize.fontsize_20,
                        textAlign: 'center'
                    }
                }} />
            <Tab.Screen
                name={Strings.bottomTab.Favourite}
                component={FavouriteScreen}
                options={{
                    headerShown: true,
                    title: 'Favourite',
                    headerTintColor: Colors.Black_18,
                    headerTitleStyle: {
                        fontFamily: FontNames.PoppinsBold,
                        fontSize: FontSize.fontsize_20,
                        textAlign: 'center',
                    },
                }} />
            <Tab.Screen name={Strings.bottomTab.Account} component={AccountScreen} />
        </Tab.Navigator>
        // </NavigationContainer>
    )
}
export default BottomTab

export const styles = StyleSheet.create({
    bottomTabIcon: {
        width: wp(7),
        height: wp(7),
    }
})
