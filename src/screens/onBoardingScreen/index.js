import { Image, ImageBackground, Text, View } from 'react-native'
import React from 'react'
import { styles } from './styles'
import { useNavigation } from '@react-navigation/native'
import { ReusableButton } from '../../component/Button'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { ImagePaths } from '../../utils/ImagePaths'
import { Strings } from '../../utils/strings'
import { AppScreens } from '../../navigation/AppScreens'

const OnBoardingScreen = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <ImageBackground
                source={ImagePaths.onBoardingBackground}
                resizeMode="cover"
                style={styles.backgroundimage}>
                <Image
                    source={ImagePaths.carret}
                    resizeMode='contain'
                    style={styles.image} />
                <Text style={styles.welcometext} > {Strings.onBoarding.welcome} </Text>
                <Text style={styles.text}>{Strings.onBoarding.getGroceryText} </Text>
                <View style={{ bottom: hp(10), position: 'absolute', alignSelf: 'center' }}>
                    <ReusableButton onPress={() => navigation.navigate(AppScreens.SignInScreen)} text={'Get Started'} />
                </View>
            </ImageBackground>
        </View>
    )
}

export default OnBoardingScreen
