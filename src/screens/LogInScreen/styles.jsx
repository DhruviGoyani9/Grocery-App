import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Colors } from "../../style/color";
import { FontNames } from "../../style/fonts";
import { FontSize } from "../../style/fontSize";
import { GlobalStyles } from "../../style/globalStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...GlobalStyles.backgroundColor
    },
    logingtext: {
        color: Colors.Black_18,
        fontFamily: FontNames.PoppinsRegular,
        fontSize: FontSize.fontsize_25,
        fontWeight: '600',
        ...GlobalStyles.marginLeft,
    },

    textInput: {
        width: wp(90),
        alignSelf: 'center',
    },
    forgotPassword: {
        alignSelf: 'flex-end',
        marginRight: wp(5),
        fontFamily: FontNames.PoppinsMedium,
        fontSize: FontSize.fontsize_14,
        marginTop: hp(1),
        color: Colors.Black_18
    },
    signupText: {
        color: Colors.LightGreen,
        fontFamily: FontNames.PoppinsRegular,
        fontWeight: '600',
        fontSize: FontSize.fontsize_14
    },
    emailError: {
        color: 'red',
        ...GlobalStyles.marginLeft
    }
})