import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Image, Alert, SafeAreaView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { AppScreens } from '../../navigation/AppScreens';
import {
    LoginManager,
    AccessToken,
    GraphRequest,
    GraphRequestManager,
} from 'react-native-fbsdk';
import { FontSize } from '../../style/fontSize';
import auth from "@react-native-firebase/auth";
import { GlobalStyles } from '../../style/globalStyles';
import { Colors } from '../../style/color';

const AccountScreen = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState([])
    const [loggedIn, setloggedIn] = useState(false);
    const [userInfo, setuserInfo] = useState([]);
    const navigation = useNavigation();
    const [facebookInfo, setFacebookInfo] = useState({})

    const [isGoogleLogin, setIsGoogleLogin] = useState(false)
    const [isEmailLogin, setIsEmailLogin] = useState(false)
    const [isFaceBooklogin, setIsFaceBookLogin] = useState(false)
    const [user, setUser] = useState()

    console.log({ data })

    useEffect(() => {
        fetch('https://dummyjson.com/auth/login',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: 'kminchelle',
                    password: '0lelplR'
                })
            })
            .then((response) => response.json())
            .then((json) => setData(json))
            .catch((error) => console.log(error))
            .finally(() => setIsLoading(false))
    }, [])

    const SignOutFromGoogle = async () => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setloggedIn(false);
            setuserInfo([]);
            setIsGoogleLogin(false)
        } catch (error) {
            console.log({ error })
        }
        alert(`LogOut Successfully ${userInfo.user.email} ${userInfo.user.photo}`)
        navigation.reset({
            routes: [{ name: AppScreens.SignInScreen }]
        })
    }

    useEffect(() => {
        console.log({ loggedIn })
        !loggedIn ? getUserInfoFromGoogle() : null;
        getInfoFromFaceBook()
    }, [])

    const getUserInfoFromGoogle = async () => {
        try {
            const userInfo = await GoogleSignin.signInSilently();
            setuserInfo(userInfo)
            setIsGoogleLogin(true)
        } catch (error) {
            if (error.code === statusCodes.SIGN_IN_REQUIRED) {
                setloggedIn(false)
            } else {
                setloggedIn(false)
            }
        }
    }

    const getInfoFromFaceBook = token => {
        const PROFILE_REQUEST_PARAMS = {
            fields: {
                string: 'id,name,first_name,last_name,picture.type(large)'
            }
        };
        const profileRequest = new GraphRequest(
            '/me',
            { token, parameters: PROFILE_REQUEST_PARAMS },
            (error, user) => {
                if (error) {
                    console.log(error)
                } else {
                    setFacebookInfo(user)
                    console.log('result :: ', user)
                    setIsFaceBookLogin(true)
                }
            }
        );
        new GraphRequestManager().addRequest(profileRequest).start();
    }

    const LogoutFromFacebook = () => {
        LoginManager.logOut();
        setFacebookInfo({})
        alert('Logout Successfully')
        navigation.reset({
            routes: [{ name: AppScreens.SignInScreen }]
        })
        // setIsGoogleLogin(false)
    }

    useEffect(() => {
        const subscriber = auth().onAuthStateChanged((userData) => {
            console.log('user data --- ', userData)
            console.log("USer", JSON.stringify(userData))
            setUser(userData)
            setIsEmailLogin(true)
        })
        return subscriber;
    }, [])

    console.log({ user })
    const LogoutFromEmail = () => {
        Alert.alert(
            "Logout",
            "Are You Sure? You Want to logout?",
            [
                {
                    text: "cancel",
                    onPress: () => {
                        return null;
                    }
                },
                {
                    text: 'Confirm',
                    onPress: () => {
                        auth()
                            .signOut()
                            .then(() => navigation.reset({
                                routes: [{ name: AppScreens.logInScreen }]
                            }))
                            .catch((error) => {
                                console.log({ error });
                                if (error.code === 'auth/no-current-user')
                                    navigation.reset({
                                        routes: [{ name: AppScreens.logInScreen }]
                                    })
                                else
                                    alert(error)
                            })
                    }
                }
            ],
            { cancelable: false }
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, ...GlobalStyles.backgroundColor }}>
            <View style={{}}>
                <Text>AccountScreen</Text>
                {
                    isLoading ?
                        <ActivityIndicator size={'large'} /> :
                        <View>
                            <Text style={{ color: 'red', fontSize: 40 }}>{data.username}</Text>
                            <Text>{data.firstName}</Text>

                        </View>
                }
                <TouchableOpacity onPress={() => {
                    isGoogleLogin && SignOutFromGoogle(),
                        isFaceBooklogin && LogoutFromFacebook(),
                        isEmailLogin && LogoutFromEmail()
                }}>
                    <Text style={{ alignSelf: 'center', color: Colors.Black, fontSize: FontSize.fontsize_20 }}>Log out</Text>
                </TouchableOpacity>
                {isGoogleLogin && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    {userInfo && userInfo.user && userInfo.user.photo &&
                        <Image
                            style={{ width: 50, height: 50, borderRadius: 25 }}
                            source={{ uri: userInfo.user.photo }}
                        />
                    }

                    <Text>
                        {userInfo && userInfo.user && userInfo.user.email}
                    </Text>
                </View>}
                {isFaceBooklogin && <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                    {facebookInfo.picture && (
                        <Image
                            style={{ width: 50, height: 50 }}
                            source={{
                                uri: facebookInfo.picture.data.url
                            }}
                        />
                    )}
                    {facebookInfo.name && (
                        <Text style={{ fontSize: FontSize.fontsize_16 }}> {facebookInfo.name}</Text>
                    )}
                </View>}
                {isEmailLogin && user ? (
                    <Text>Welcome {user.displayName ? user.displayName : user.email}</Text>
                ) : null}
                {/* <TouchableOpacity
                onPress={() =>
                    isGoogleLogin ? SignOutFromGoogle() : LogoutFromFacebook()}>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'green' }}>Log Out</Text>
            </TouchableOpacity> */}

                {/* {isGoogleLogin ? <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                {userInfo && userInfo.user && userInfo.user.photo &&
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 25 }}
                        source={{ uri: userInfo.user.photo }}
                    />
                }

                <Text>
                    {userInfo && userInfo.user && userInfo.user.email}
                </Text>
            </View> : <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                {facebookInfo.picture && (
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={{
                            uri: facebookInfo.picture.data.url
                        }}
                    />
                )}
                {facebookInfo.name && (
                    <Text style={{ fontSize: FontSize.fontsize_16 }}> {facebookInfo.name}</Text>
                )}
            </View>
            } */}
                {/* <TouchableOpacity onPress={LogoutFromEmail}>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'green' }}>Logout From Email</Text>
            </TouchableOpacity>
            {
                user ? (
                    <Text>Welcome {user.displayName ? user.displayName : user.email}</Text>
                ) : null
            } */}








                {/* {
                isGoogleLogin ? <TouchableOpacity
                    onPress={SignOut}>
                    <Text style={{ textAlign: 'center', fontSize: 30, color: 'green' }}>Log Out</Text>
                </TouchableOpacity> : 
                <TouchableOpacity onPress={LogoutFromFacebook}>
                    <Text style={{ textAlign: 'center', fontSize: 30, color: 'green' }}>Logout From FaceBook</Text>
                </TouchableOpacity>
            } */}
                {/* {
                !loggedIn && (
                    <TouchableOpacity
                        onPress={SignOut}>
                        <Text style={{ textAlign: 'center', fontSize: 30, color: 'green' }}>Log Out</Text>
                    </TouchableOpacity>
                )
            }
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                {userInfo.user &&
                    <Image
                        style={{ width: 50, height: 50, borderRadius: 25 }}
                        source={{ uri: userInfo && userInfo.user && userInfo.user.photo }}
                    />
                }

                <Text>
                    {userInfo && userInfo.user && userInfo.user.email}
                </Text>
            </View>

            <TouchableOpacity onPress={LogoutFromFacebook}>
                <Text style={{ textAlign: 'center', fontSize: 30, color: 'green' }}>Logout From FaceBook</Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
                {facebookInfo.picture && (
                    <Image
                        style={{ width: 50, height: 50 }}
                        source={{
                            uri: facebookInfo.picture.data.url
                        }}
                    />
                )}

                {facebookInfo.name && (
                    <Text style={{ fontSize: FontSize.fontsize_16 }}> {facebookInfo.name}</Text>
                )}
            </View> */}

            </View>
        </SafeAreaView>

    )
}

export default AccountScreen


// import { StyleSheet, Text, View } from 'react-native'
// import React from 'react'
// import { useNavigation } from '@react-navigation/native'
// import { AppScreens } from '../../navigation/AppScreens'

// const index1 = () => {

//     const navigation = useNavigation()
//     return (
//         <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//             <Text onPress={() =>
//                 navigation.reset({
//                     routes: [{ name: AppScreens.SignInScreen }]
//                 })
//             }
//             >index</Text>
//         </View>
//     )
// }

// export default index1

// const styles = StyleSheet.create({})
