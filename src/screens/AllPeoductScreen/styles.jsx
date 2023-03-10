import { StyleSheet } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Colors } from "../../style/color";
import { FontNames } from "../../style/fonts";
import { FontSize } from "../../style/fontSize";
import { GlobalStyles } from "../../style/globalStyles";

export const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.backgroundColor,
        flex: 1
        //alignItems: 'center',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginRight: wp(5),
        ...GlobalStyles.marginLeft
    },
    product_title: {
        fontFamily: FontNames.PoppinsBold,
        fontSize: FontSize.fontsize_20,
        color: Colors.Black_18,
        textAlign: 'center'
    },
    filter_icon: {
        width: wp(6),
        height: hp(3)
    },
    filterText: {
        fontFamily: FontNames.PoppinsBold,
        fontSize: FontSize.fontsize_20,
        marginLeft: wp(32),
        color: Colors.Black_18
    },
    filter_view: {
        backgroundColor: Colors.Grey_42,
        borderTopLeftRadius: wp(10),
        borderTopRightRadius: wp(10),
        width: wp(100),
        height: hp(90),
        marginTop: hp(4),

    },
    categories: {
        fontFamily: FontNames.PoppinsRegular,
        fontSize: FontSize.fontsize_24,
        marginLeft: wp(1),
        marginTop: hp(4),

        color: Colors.Black_18
    },
    filterTitle: {
        fontSize: 16,
        fontFamily: FontNames.PoppinsMedium,
        marginLeft: wp(4)
    },
})