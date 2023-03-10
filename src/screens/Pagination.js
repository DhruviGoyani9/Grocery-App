import { ActivityIndicator, FlatList, Image, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FontSize } from '../style/fontSize';
import { GlobalStyles } from '../style/globalStyles';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Colors } from '../style/color';
import { FontNames } from '../style/fonts';
import axios from 'axios';
import Icons from 'react-native-vector-icons/FontAwesome';
import { ReusableButton } from '../component/Button';

const Pagination = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [axiosData, setAxiosData] = useState([])
    const [page, setPage] = useState(0);
    const [endList, setEndList] = useState(true)
    const [refershing, setRefreshing] = useState(false)

    console.log('axios', axiosData)
    const getProductUsingAxios = () => {

        console.log(page)
        axios.get(`https://dummyjson.com/products?limit=10&skip=${page}`)
            .then(response => {
                // setAxiosData(response.data.products)
                // setRefreshing(true)
                if (refershing) {
                    console.log('refresh', refershing)
                    setRefreshing(false)
                }
                // if (page !== 1) {
                console.log({ page })
                console.log('inside')
                setAxiosData([...axiosData, ...response.data.products])
                setIsLoading(false)
                // }
                console.log('total', response.data.total)
                let total = response.data.total;
                console.log('fdf', total)
                if (axiosData.length == total) {
                    console.log('condiotion true')
                    setEndList(false)
                }
            })
            .catch(error => {
                console.log(error)
            })
    }

    const loadMoreRandomData = () => {
        setPage(page + 10)
    }

    console.log('load', isLoading)
    useEffect(() => {
        getProductUsingAxios()
    }, [page])


    const onRefresh = () => {
        setRefreshing(true);
        setPage(page)
        console.log('jd', page)
        setRefreshing(false)
        // getProductUsingAxios()
    }
    const dataTobeInserted = [
        {
            title: 'Iphone 13'
        },
        {
            title: 'Red mi'
        }
    ]

    const InsertData = async () => {
        try {
            axios({
                method: 'post',
                url: 'https://dummyjson.com/products/add',
                data:
                {
                    title: 'Iphone 11',
                    description: 'Description'
                },
            }).then(res => {
                console.log('data -- ', res.data)
                setAxiosData([res.data, ...axiosData])
            })
        } catch (error) {
            alert('Error occurred ', error)
            console.log({ error })
        }
    }

    const deleteData = (id) => {
        console.log('delete id ', id)
        axios.delete(`https://dummyjson.com/products/${id}`)
            .then(response => {
                console.log('axios id', response.data.id)
                setAxiosData(axiosData.filter(axiosData => axiosData.id !== id))
                alert('delete Successfully')
            })
    }

    const updateData = (id) => {
        console.log('update id', id)
        axios({
            method: 'put',
            url: `https://dummyjson.com/products/${id}`,
            data: {
                title: 'new Iphone 11'
            },
        })
            .then(response => {
                console.log('--', response.data)
                setAxiosData(
                    axiosData.map(data => {
                        console.log({ data });
                        if (data.id === id) {
                            data.title = response.data.title
                        }
                        return data
                    })
                )

            })
        // console.log('1--', data);
        // data.splice(id, 1)
    }

    return (
        <View style={styles.container}>
            {
                isLoading ?
                    <ActivityIndicator />
                    : <FlatList
                        data={axiosData}
                        keyExtractor={({ id }) => id}
                        onEndReachedThreshold={0}
                        onEndReached={loadMoreRandomData}
                        ListFooterComponent={endList ? <ActivityIndicator /> : null}
                        refreshControl={<RefreshControl refreshing={refershing} onRefresh={onRefresh} />}
                        renderItem={({ item }) =>
                            <View style={styles.card}>
                                {/* <Image
                                    source={{ uri: item.images[0] }}
                                    style={styles.image}
                                    resizeMode='contain'
                                /> */}
                                <Text style={{ margin: 10, width: wp(55) }}>{item.title}</Text>
                                <Icons
                                    name='pencil'
                                    style={{ right: wp(15), position: 'absolute' }}
                                    size={20}
                                    color={Colors.LightGreen}
                                    onPress={() => { updateData(item.id) }}
                                />
                                <Icons
                                    name='close'
                                    style={{ right: wp(5), position: 'absolute' }}
                                    size={20}
                                    onPress={() => { deleteData(item.id) }}
                                />
                            </View>

                        }
                    />
            }
            <ReusableButton text={'Add Data'} onPress={InsertData} />
        </View>
    )
}

export default Pagination

const styles = StyleSheet.create({
    container: {
        ...GlobalStyles.backgroundColor,
        flex: 1,
    },
    card: {
        borderWidth: 1,
        margin: wp(2),
        padding: wp(2),
        borderRadius: wp(2),
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: wp(10),
        height: hp(10)
    }
})