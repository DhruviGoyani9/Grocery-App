import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import { ImagePaths } from '../utils/ImagePaths'
import Swiper from 'react-native-swiper'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Colors } from '../style/color'

const SwiperComponent = ({ height, image1, image2, image3, paginationTop, imageHeight, resizeMode }) => {

    return (

        <View style={{ marginTop: hp(1), height: height }}>

            <Swiper
                style={{ height: height }}
                showsButtons={false}
                autoplay={true}
                showsPagination={true}
                dotColor={Colors.DarkGrey}
                activeDotColor={Colors.LightGreen}
                paginationStyle={{ height: 8, position: 'absolute', top: paginationTop }}
            >
                <View>
                    <Image
                        resizeMode={resizeMode}
                        style={[styles.image, { height: imageHeight }]}
                        source={image1} />
                </View>
                <View>
                    <Image
                        resizeMode={resizeMode}
                        style={[styles.image, { height: imageHeight }]}
                        source={image2}
                    />
                </View>
                <View>
                    <Image
                        resizeMode={resizeMode}
                        style={[styles.image, { height: imageHeight }]}
                        source={image3}
                    />
                </View>

            </Swiper>
        </View >
    )
}

export default SwiperComponent

const styles = StyleSheet.create({

    wrapper: {
        //flex: 1
    },
    image: {
        //flex: 1,
        width: wp(90),
        //height: hp(14),
        alignSelf: 'center',
        borderRadius: wp(3)
    },
})
