import { Platform, StyleSheet } from "react-native"
import { Colors } from "../../style/color"
import { FontNames } from "../../style/fonts"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { FontSize } from "../../style/fontSize";
import { GlobalStyles } from "../../style/globalStyles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...GlobalStyles.backgroundColor
    },
    image: {
        width: wp(100),
        height: hp(48),
    },
    getGroceryText: {
        fontFamily: FontNames.PoppinsRegular,
        fontWeight: "600",
        fontSize: FontSize.fontsize_23,
        ...GlobalStyles.marginLeft,
        height: hp(10),
        color: Colors.Black
    },
    phoneNumberView: {
        backgroundColor: Colors.White
    },
    nextButton: {
        marginTop: Platform.OS === 'ios' ? hp(2) : hp(4),
        color: Colors.Black,
    },
    divider: {
        backgroundColor: Colors.Grey,
    },
    socialMediaText: {
        color: Colors.Grey_82,
        alignSelf: 'center',
        marginTop: hp(4),
        // marginBottom: hp(2),
        fontFamily: FontNames.PoppinsRegular
    },
    iconButton: {
        padding: hp(1)
    },
    btnText: {
        fontSize: FontSize.fontsize_14,
        color: Colors.White
    }
})

export { styles }