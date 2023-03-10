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
    cartItems: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: hp(2),
        ...GlobalStyles.marginLeft
    },
    image: {
        width: wp(30),
        height: hp(15)
    },
    itemName: {
        fontFamily: FontNames.PoppinsBold,
        fontSize: FontSize.fontsize_16,
        marginLeft: wp(2),
        marginTop: hp(1),
        //height: hp(5),
        color: Colors.Black_18
    },
    itemQuantity: {
        color: Colors.DarkGrey,
        fontSize: FontSize.fontsize_14,
        fontFamily: FontNames.PoppinsMedium,
        marginLeft: wp(2),
        marginTop: hp(0.5)
    },
    row_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...GlobalStyles.marginLeft,
        marginRight: wp(5),
        marginTop: hp(3),

    },
    itemCount: {
        width: wp(14),
        height: hp(6.5),
        borderWidth: 1,
        borderRadius: wp(5),
        margin: wp(3),
        borderColor: Colors.Grey,
        alignItems: 'center',
        justifyContent: 'center',
    },
    item_price: {
        fontFamily: FontNames.PoppinsBold,
        fontSize: FontSize.fontsize_18,
        color: Colors.Black_18,
        marginBottom: hp(3)
    },
    count: {
        fontFamily: FontNames.PoppinsRegular,
        color: Colors.Black_18,
        fontWeight: '600',
        fontSize: FontSize.fontsize_16,
    },
    total: {
        width: wp(15),
        height: hp(3),
        backgroundColor: Colors.LightGreen_48,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: wp(1),
        bottom: hp(5),
        left: wp(75),
        padding: wp(1)
    },
    totalText: {
        color: Colors.LightGrey,
        fontFamily: FontNames.PoppinsRegular,
        fontWeight: '600',
        fontSize: FontSize.fontsize_12,

    }
})