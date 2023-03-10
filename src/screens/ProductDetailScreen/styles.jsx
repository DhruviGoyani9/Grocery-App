
import { StyleSheet } from "react-native";
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from "react-native-responsive-screen";
import { Colors } from "../../style/color";
import { FontNames } from "../../style/fonts";
import { FontSize } from "../../style/fontSize";
import { GlobalStyles } from "../../style/globalStyles";

export const styles = StyleSheet.create({
    container: {
        flex: 0,
        ...GlobalStyles.backgroundColor
    },
    image_background: {
        backgroundColor: Colors.LightGrey,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
        elevation: 5,
        borderRadius: wp(5),
        marginTop: 15,
        marginHorizontal: wp(3),
        ...GlobalStyles.marginLeft,
        marginRight: wp(5)

    },
    itemName: {
        fontFamily: FontNames.PoppinsBold,
        color: Colors.Black_18,
        fontSize: FontSize.fontsize_24,
        width: wp(70)
    },
    item_quantity: {
        fontFamily: FontNames.PoppinsRegular,
        color: Colors.DarkGrey,
        fontWeight: '600',
        ...GlobalStyles.marginLeft,
        fontSize: FontSize.fontsize_16,
    },
    item_price: {
        fontFamily: FontNames.PoppinsBold,
        fontSize: FontSize.fontsize_24,
        color: Colors.Black_18
    },
    row_view: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        ...GlobalStyles.marginLeft,
        marginRight: wp(5),
        marginTop: hp(3)
    },
    itemCount: {
        width: wp(14),
        height: hp(6.5),
        borderWidth: 1,
        borderRadius: wp(5),
        margin: wp(3),
        borderColor: Colors.Grey,
        alignItems: 'center',
        justifyContent: 'center'
    },
    count: {
        fontFamily: FontNames.PoppinsRegular,
        fontWeight: '600',
        color: Colors.Black_18,
        fontSize: FontSize.fontsize_18
    },
    divider: {
        marginTop: hp(2),
        backgroundColor: Colors.Grey,
    },
    product_detail: {
        color: Colors.Black_18,
        fontFamily: FontNames.PoppinsRegular,
        fontWeight: '600',
        fontSize: FontSize.fontsize_16
    },
    item_description: {
        fontFamily: FontNames.PoppinsMedium,
        color: Colors.DarkGrey,
        fontSize: FontSize.fontsize_13,
        ...GlobalStyles.marginLeft,
        marginTop: hp(1)
    },
    nutrition_gr_view: {
        backgroundColor: Colors.Grey,
        width: wp(12),
        height: hp(3),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: wp(2)
    },
    nutrition_gr: {
        fontFamily: FontNames.PoppinsRegular,
        fontSize: FontSize.fontsize_9,
        fontWeight: '600',
        color: Colors.DarkGrey
    },
    customRatingBarStyle: {
        justifyContent: 'center',
        flexDirection: 'row',
    },
})