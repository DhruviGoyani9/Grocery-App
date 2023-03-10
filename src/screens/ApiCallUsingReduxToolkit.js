import { FlatList, SafeAreaView, StyleSheet, Text, View, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Provider, useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { ActivityIndicator } from 'react-native-paper'
import { RefreshControl } from 'react-native'
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen'
import { Colors } from '../style/color'
import { GlobalStyles } from '../style/globalStyles'
import { toolkitStore } from '../redux/store/ToolkitStore'
import { fetchUserData } from '../redux/reducers/ApiCallSlicer'

const ApiCall = () => {
    const dispatch = useDispatch()
    const data = useSelector(state => state.data)
    const [page, setPage] = useState(0);
    const [refershing, setRefreshing] = useState(false)

    console.log('----', data)

    const loadMoreData = () => {
        setPage(page + 10)
    }

    useEffect(() => {
        // dispatch(getDataAsync(page))
        dispatch(fetchUserData(page))
    }, [page])

    const onRefresh = () => {
        // dispatch(getDataAsync(page))

        dispatch(fetchUserData(page))
    }

    return (
        <SafeAreaView style={{ ...GlobalStyles.backgroundColor, flex: 1 }}>
            <View>

                {data.isLoading ? <Text>Loading...</Text> : null}
                {data.isSuccess ? <FlatList
                    data={data.data}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.images[0] }}
                                resizeMode={'contain'}
                            />
                            <Text>{item.title}</Text>
                        </View>
                    )}
                    onEndReachedThreshold={0}
                    onEndReached={loadMoreData}
                    ListFooterComponent={data.data.length !== 100 ? <ActivityIndicator /> : null}
                    refreshControl={<RefreshControl refreshing={refershing} onRefresh={onRefresh} />}
                /> : <Text style={{ justifyContent: 'center', alignItems: 'center' }}>Please Try again</Text>}

            </View>

        </SafeAreaView>
    )
}

const ApiCallUsingReduxToolkit = () => {
    return (
        <Provider store={toolkitStore}>
            <ApiCall />
        </Provider>
    )
}

export default ApiCallUsingReduxToolkit

const styles = StyleSheet.create({
    card: {
        flexDirection: 'row',
        margin: wp(2),
        alignItems: 'center',
        borderColor: Colors.Black_18,
        borderWidth: 1,
        padding: wp(2),
        borderRadius: wp(2)
    },
    image: {
        width: wp(20),
        height: hp(10),
        marginRight: wp(5)
    }
})