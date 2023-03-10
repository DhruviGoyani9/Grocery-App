import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Colors } from "../../style/color";
import { FontNames } from "../../style/fonts";
import { FontSize } from "../../style/fontSize";
import { GlobalStyles } from "../../style/globalStyles";

export const styles = StyleSheet.create({
    container: {
        //flex: 1,
        ...GlobalStyles.backgroundColor,
        alignItems: 'center'
    },
    red_carret_image: {
        width: wp(20),
        height: hp(5),
    },
    city: {
        fontFamily: FontNames.PoppinsRegular,
        fontSize: FontSize.fontsize_16,
        color: Colors.Black_4C
    },
    location_symbol: {
        width: wp(10),
        height: hp(3)
    },
    exclusiveOffer: {
        color: Colors.Black_18,
        fontFamily: FontNames.PoppinsRegular,
        fontWeight: '600',
        fontSize: FontSize.fontsize_18,
        ...GlobalStyles.marginLeft

    },
    groceries: {
        width: wp(60),
        height: hp(13),
        borderRadius: wp(4),
        margin: wp(2),
        alignItems: 'center',
        flexDirection: 'row',
    },
    groceryImage: {
        height: hp(10),
        width: wp(25),
        marginLeft: wp(2),
    },
    groceryText: {
        fontFamily: FontNames.PoppinsRegular,
        fontSize: FontSize.fontsize_16,
        fontWeight: '600',
        color: Colors.Black_3E,
        marginLeft: wp(3),
    }
})