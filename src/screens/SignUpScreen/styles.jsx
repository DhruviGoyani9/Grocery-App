import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Colors } from "../../style/color";
import { FontNames } from "../../style/fonts";
import { FontSize } from "../../style/fontSize";
import { GlobalStyles } from "../../style/globalStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...GlobalStyles.backgroundColor
    },
    signupText: {
        color: Colors.Black_18,
        fontFamily: FontNames.PoppinsRegular,
        fontWeight: '600',
        fontSize: FontSize.fontsize_25,
        ...GlobalStyles.marginLeft,
    },
    textInput: {
        width: wp(90),
        alignSelf: 'center',
    },
    loginText: {
        color: Colors.LightGreen,
        fontFamily: FontNames.PoppinsRegular,
        fontWeight: '600',
        fontSize: FontSize.fontsize_13
    },
    termsAndPolicyView: {
        ...GlobalStyles.marginLeft,
        flexDirection: 'row'
    },
    termsAndPolicyText: {
        color: Colors.LightGreen,
        fontSize: FontSize.fontsize_13,
        fontFamily: FontNames.PoppinsMedium
    }
})