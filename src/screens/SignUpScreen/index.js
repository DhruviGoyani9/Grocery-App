import { Alert, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { ImagePaths } from '../../utils/ImagePaths'
import { styles } from './styles'
import { Strings } from '../../utils/strings'
import Icons from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../style/color'
import { ReusableButton } from '../../component/Button'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { useNavigation } from '@react-navigation/native'
import { AppScreens } from '../../navigation/AppScreens'
import { GlobalStyles } from '../../style/globalStyles'
import TextInputComponent from '../../component/TextInput'
import auth from "@react-native-firebase/auth";

const SignUpScreen = () => {

    const [userName, setUsername] = useState('');
    const [emailValue, onSetEmailValue] = useState();
    const [emailValidError, setEmailValidError] = useState('');
    const [passwordValue, onSetPasswordValue] = useState();
    const [isPasswordSecure, setIsPasswordSecure] = useState(true);
    const navigation = useNavigation();

    const checkEmptyValidation = () => {

        if (!userName.trim()) {
            Alert.alert("Please Enter UserName");
            return;
        }
        if (!emailValue) {
            Alert.alert("Please Enter Email");
            return;
        }
        if (!passwordValue) {
            Alert.alert("Please Enter Password");
            return;
        }

        auth().createUserWithEmailAndPassword(emailValue, passwordValue)
            .then((user) => {
                alert('Registration SuccessFullly. please login to Proceed')
                console.log({ user })
                if (user) {
                    auth().currentUser.updateProfile({
                        displayName: userName,
                        photoURL: 'https://images.unsplash.com/photo-1564564295391-7f24f26f568b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cnVzc2lhbiUyMHBlb3BsZXxlbnwwfHwwfHw%3D&w=1000&q=80'
                    })
                        .then(() => navigation.navigate(AppScreens.BottomTab))
                        .catch((error) => {
                            console.log({ error })
                        })
                }
            })
            .catch((error) => {
                if (error.code === 'auth/email-already-in-use') {
                    alert('Email Already in use')
                } else {
                    alert(error.message)
                }
            })


    }

    const isValidEmail = val => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;

        if (val.length === 0) {
            setEmailValidError('Please Enter Valid Email Address');
        } else if (reg.test(val) === false) {
            setEmailValidError('enter valid email Address');
        } else if (reg.test(val) === true) {
            setEmailValidError('');
        }
    }

    return (
        <ScrollView style={{ flex: 1, ...GlobalStyles.backgroundColor }}>

            <View style={styles.container}>
                <Image
                    source={ImagePaths.red_carret}
                    resizeMode={'contain'}
                    style={GlobalStyles.redCarretImage} />
                <Text style={styles.signupText}>{Strings.loginScreen.singUp}</Text>
                <Text style={GlobalStyles.enterEmail}>{Strings.signUpScreen.enterCredential}</Text>
                <Text style={GlobalStyles.enterEmail}>{Strings.signUpScreen.username}</Text>
                {/* <TextInput
                    style={styles.textInput}
                    value={userName}
                    onChangeText={value => {
                        setUsername(value)
                    }}
                /> */}
                <TextInputComponent
                    value={userName}
                    onChangeText={value => {
                        setUsername(value)
                    }}
                    placeholder={'Enter Username'}
                    width={wp(85)}
                />
                <Text style={GlobalStyles.enterEmail}>{Strings.loginScreen.email}</Text>
                <TextInputComponent
                    value={emailValue}
                    onChangeText={value => {
                        onSetEmailValue(value);
                        isValidEmail(value);
                    }}
                    placeholder={'Enter Email Address'}
                    width={wp(85)}
                    color={Colors.LightGreen}
                    name={emailValidError ? null : 'check'}

                />

                <Text style={GlobalStyles.enterEmail}>{Strings.loginScreen.password}</Text>
                <TextInputComponent
                    value={passwordValue}
                    width={wp(85)}
                    onChangeText={value => {
                        onSetPasswordValue(value)
                    }}
                    placeholder={'Enter Password'}
                    secureTextEntry={isPasswordSecure}
                    name={isPasswordSecure ? 'eye-slash' : 'eye'}
                    onPress={() => { isPasswordSecure ? setIsPasswordSecure(false) : setIsPasswordSecure(true) }}
                    color={Colors.DarkGrey}
                />
                <View style={[styles.termsAndPolicyView, { marginTop: hp(2) }]}>
                    <Text style={[styles.termsAndPolicyText, { color: Colors.DarkGrey }]}>{Strings.signUpScreen.agree}</Text>
                    <Text style={styles.termsAndPolicyText}>{Strings.signUpScreen.terms}</Text>
                </View>
                <View style={styles.termsAndPolicyView}>
                    <Text style={[styles.termsAndPolicyText, { color: Colors.DarkGrey }]}>and </Text>
                    <Text style={styles.termsAndPolicyText}>{Strings.signUpScreen.policy}</Text>
                </View>
                <ReusableButton
                    onPress={checkEmptyValidation}
                    text={Strings.loginScreen.singUp} />
                <View style={{ flexDirection: 'row', alignSelf: 'center', marginTop: hp(2) }}>
                    <Text style={[styles.loginText, { color: Colors.Black_18 }]}>
                        {Strings.signUpScreen.alreadyHaveAccount}
                    </Text>
                    <TouchableOpacity
                        onPress={() => navigation.navigate(AppScreens.logInScreen)}>
                        <Text style={styles.loginText}>{Strings.loginScreen.logIn}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    )
}

export default SignUpScreen