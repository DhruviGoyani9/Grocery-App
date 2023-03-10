import axios from "axios"
import { useEffect, useState } from "react"
import { RefreshControl } from "react-native"
import { View, Text, StyleSheet, FlatList, Image, ActivityIndicator } from "react-native"
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen"
import { SafeAreaView } from "react-native-safe-area-context"
import { Provider, useDispatch, useSelector } from "react-redux"
import { fechRequestFailed, fetchDataBeginAction, getDataAction } from "../redux/actions/ApiCallAction"
import { store } from "../redux/store/CounterStore"
import { Colors } from "../style/color"
import { GlobalStyles } from "../style/globalStyles"

const ApiCallUsingRedux = () => {

    const dispatch = useDispatch()
    const [page, setPage] = useState(0);
    const [refreshing, setRefreshing] = useState(true);
    const [endList, setEndList] = useState(true)
    const data = useSelector((state) => state.data)
    console.log('api', data)

    // const isFetching = data.fetching
    // console.log({ isFetching })

    // const isFailed = data.failed;
    // console.log({ isFailed })

    const fetchData = () => {
        //dispatch(fetchDataBeginAction())
        axios.get(`https://dummyjson.com/products?limit=10&skip=${page}`)
            .then(response => {
                console.log('res', response.data.products)
                if (refreshing) {
                    console.log('refresh', refreshing)
                    setRefreshing(false)
                }
                dispatch(getDataAction(response.data.products))
                setRefreshing(false);
                let total = response.data.total;
                console.log(total)
                if (data.data.length == total) {
                    setEndList(false)
                }
            })
        //.catch((error) => dispatch(fechRequestFailed(error)))

    }
    const loadMoreData = () => {
        setPage(page + 10)
    }
    useEffect(() => {
        fetchData()
    }, [page])


    const onRefresh = () => {
        fetchData();
    };
    return (
        <SafeAreaView style={styles.container}>
            <View>
                {refreshing ? <ActivityIndicator /> : null}

                <FlatList
                    data={data.data}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Image
                                style={styles.image}
                                source={{ uri: item.images[0] }}
                                resizeMode={'contain'}
                            />
                            <Text>{item.id}</Text>
                            <Text>{item.title}</Text>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    onEndReached={loadMoreData}
                    onEndReachedThreshold={0}
                    ListFooterComponent={endList ? <ActivityIndicator /> : null}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={onRefresh}
                        />
                    }
                />
            </View>
        </SafeAreaView>
    )
}

const ReduxApi = () => {
    return (
        <View style={styles.container}>
            <Provider store={store}>
                <ApiCallUsingRedux />
            </Provider>
        </View>
    )
}
export default ReduxApi

const styles = StyleSheet.create({
    container: {
        flex: 1,
        ...GlobalStyles.backgroundColor
    },
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