import { StyleSheet } from "react-native";
import { Colors } from "../../style/color";
import { FontNames } from "../../style/fonts";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { FontSize } from "../../style/fontSize";
import { GlobalStyles } from "../../style/globalStyles";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...GlobalStyles.backgroundColor
    },
    text: {
        color: Colors.Black_18,
        fontFamily: FontNames.PoppinsBold,
        fontWeight: '600',
        fontSize: FontSize.fontsize_20,
        ...GlobalStyles.marginLeft,
        marginVertical: hp(4)
    },
    codeText: {
        color: Colors.DarkGrey,
        fontFamily: FontNames.PoppinsRegular,
        fontWeight: '600',
        fontSize: FontSize.fontsize_15,
        ...GlobalStyles.marginLeft

    },
    // textinput: {
    //     margin: wp(5),
    //     backgroundColor: Colors.White,
    //     borderBottomWidth: 1,
    //     borderBottomColor: Colors.Grey,
    //     padding: wp(2),
    // },
    resendText: {
        color: Colors.LightGreen,
        fontFamily: FontNames.PoppinsMedium,
        fontSize: FontSize.fontsize_16,
        ...GlobalStyles.marginLeft
    },
    nextButton: {
        backgroundColor: Colors.LightGreen,
        padding: wp(5),
        borderRadius: wp(10),
        marginRight: wp(7)
    }

});

export { styles }