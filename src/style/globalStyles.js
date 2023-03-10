import { StyleSheet } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Colors } from "./color";
import { FontNames } from "./fonts";
import { FontSize } from "./fontSize";

export const GlobalStyles = StyleSheet.create({
    redCarretImage: {
        width: wp(30),
        height: hp(8),
        alignSelf: 'center',
        marginVertical: hp(6)
    },
    enterEmail: {
        color: Colors.DarkGrey,
        fontFamily: FontNames.PoppinsMedium,
        marginLeft: wp(5),
        marginTop: hp(2),
        fontSize: FontSize.fontsize_14
    },
    marginLeft: {
        marginLeft: wp(5)
    },
    backgroundColor: {
        backgroundColor: Colors.LightGrey
    }
})