import { ActivityIndicator, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../style/color';
import { FontNames } from '../style/fonts';
import { FontSize } from '../style/fontSize';
import Icons from 'react-native-vector-icons/FontAwesome';
import { GlobalStyles } from '../style/globalStyles';
import axios from 'axios';
import { ReusableButton } from '../component/Button';
import { useNavigation } from '@react-navigation/native';
import { AppScreens } from '../navigation/AppScreens';

const ApiCallUsingFetch = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [dataFromFetch, setDataFromFetch] = useState([]);
    const [axiosData, setAxiosData] = useState(null)
    const [page, setPage] = useState(0)
    const [endList, setEndList] = useState(true)
    const navigation = useNavigation();

    console.log('all data', dataFromFetch)

    const getProducts = async () => {
        try {
            const response = await fetch(`https://dummyjson.com/products?limit=10&skip=${page}`);
            const json = await response.json();
            setDataFromFetch([...dataFromFetch, ...json.products])
            if (dataFromFetch.length == json.total) {
                console.log('condiotion true')
                setEndList(false)
            }
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        getProducts();

    }, [page])

    useEffect(() => {
        getProductUsingAxios();
    }, [])
    const loadMoreRandomData = () => {
        setPage(page + 10)
    }

    console.log({ axiosData })
    const getProductUsingAxios = () => {
        axios.get(`https://dummyjson.com/products`)
            .then(response => {
                setAxiosData(response.data.products)
            })
    }
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Using Fetch</Text>
            {
                isLoading ? <ActivityIndicator />
                    : <FlatList
                        data={dataFromFetch}
                        keyExtractor={({ id }) => id}
                        onEndReachedThreshold={0}
                        onEndReached={loadMoreRandomData}
                        ListFooterComponent={endList ? <ActivityIndicator /> : null}
                        ListFooterComponentStyle={{ alignSelf: 'center' }}
                        renderItem={({ item }) =>

                            <View style={[styles.FruitsCard, { height: hp(28) }]}>
                                <Image
                                    style={styles.fruitImage}
                                    source={{ uri: item.images[0] }}
                                    resizeMode={'contain'}
                                />
                                <Text style={styles.fruitName}>{item.title}</Text>
                                <Text style={styles.fruitPCS}>{item.rating}</Text>
                                <View style={{ position: 'absolute', top: hp(20) }}>
                                    <Text style={[styles.fruitName, { fontSize: FontSize.fontsize_14, position: 'absolute', top: hp(1) }]}>${item.price}</Text>
                                    <TouchableOpacity
                                    >
                                        <View style={[styles.addButton,]}>
                                            <Icons name='plus' color={Colors.White} size={22} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                        }
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                        style={{ height: hp(70) }}
                    />

            }
            <Text style={styles.title}>Using Axios</Text>
            {
                isLoading ?
                    <ActivityIndicator />
                    : <FlatList
                        data={axiosData}
                        keyExtractor={({ id }) => id}
                        renderItem={({ item }) =>
                            <View style={[styles.FruitsCard,]}>
                                <Image
                                    style={styles.fruitImage}
                                    source={{ uri: item.images[0] }}
                                    resizeMode={'contain'}
                                />
                                <Text style={styles.fruitName}>{item.title}</Text>
                                <Text style={styles.fruitPCS}>{item.rating}</Text>
                                <View style={{ position: 'absolute', top: hp(22) }}>
                                    <Text style={[styles.fruitName, { fontSize: FontSize.fontsize_14, position: 'absolute', top: hp(1) }]}>${item.price}</Text>
                                    <TouchableOpacity
                                    >
                                        <View style={[styles.addButton,]}>
                                            <Icons name='plus' color={Colors.White} size={22} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        }
                    />
            }

            <ReusableButton onPress={() =>
                navigation.navigate(AppScreens.Pagination)
                // console.log('Pagiatio pressed...............')
            } text={'Pagination'} />
        </View>
    )
}

export default ApiCallUsingFetch

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.backgroundColor,
        flex: 1,
    },
    FruitsCard: {
        width: wp(40),
        height: hp(30),
        backgroundColor: Colors.White,
        borderColor: Colors.Grey,
        borderWidth: 2,
        borderRadius: wp(4),
        margin: wp(2),
    },
    fruitImage: {
        width: wp(20),
        height: hp(11),
        alignSelf: 'center',
        marginTop: hp(1)
    },
    fruitName: {
        fontFamily: FontNames.PoppinsBold,
        fontSize: FontSize.fontsize_12,
        marginLeft: wp(2),
        marginTop: hp(1),
        //height: hp(5),
        color: Colors.Black_18
    },
    fruitPCS: {
        color: Colors.DarkGrey,
        fontSize: FontSize.fontsize_11,
        fontFamily: FontNames.PoppinsMedium,
        marginLeft: wp(2),
        marginTop: hp(1)
    },
    addButton: {
        width: wp(14),
        height: hp(6.5),
        backgroundColor: Colors.LightGreen,
        borderRadius: wp(5),
        marginRight: wp(2),
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        left: wp(23)
    },
    title: {
        ...GlobalStyles.marginLeft,
        color: Colors.Black_18,
        fontSize: FontSize.fontsize_24
    }
})