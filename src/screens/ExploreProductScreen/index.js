import { Text, View, SafeAreaView, TextInput, FlatList, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Strings } from '../../utils/strings'
import { styles } from './styles'
import { GlobalStyles } from '../../style/globalStyles'
import Icons from 'react-native-vector-icons/FontAwesome';
import { Colors } from '../../style/color'
import { FindProducts } from '../../component/data'
import { useNavigation } from '@react-navigation/native'
import { AppScreens } from '../../navigation/AppScreens'
import { heightPercentageToDP as hp } from 'react-native-responsive-screen'
import SearchTextInput from '../../component/SearchTextInput'

const ExploreProductScreen = () => {

    const navigation = useNavigation();
    const [searchText, onChangeSearch] = useState('');
    const [filteredData, setFilteredData] = useState([]);

    const DATA = FindProducts;
    useEffect(() => {
        const filtered = DATA.filter(
            items => items.title.toLowerCase().includes(searchText.toLocaleLowerCase()),
        );
        if (searchText === '') {
            return setFilteredData(DATA)

        }
        setFilteredData(filtered);
    }, [searchText]);

    return (
        <SafeAreaView style={{ ...GlobalStyles.backgroundColor, flex: 1 }}>
            <View style={styles.container}>
                <Text style={styles.findproducts}>{Strings.exploreScreen.findproducts}</Text>
                <SearchTextInput onChangeText={newText => onChangeSearch(newText)} />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingTop: hp(2) }}
                    numColumns={2}
                    data={filteredData}
                    renderItem={({ item }) =>
                        <TouchableOpacity
                            onPress={() => navigation.navigate(AppScreens.AllProductScreen, { item: item })}
                        >
                            <View style={[styles.products, { backgroundColor: item.color, borderColor: item.border_color }]}>
                                <Image
                                    resizeMode='contain'
                                    style={styles.productImage}
                                    source={item.image}
                                />
                                <Text style={styles.productText}>{item.title}</Text>
                            </View>
                        </TouchableOpacity>
                    }
                />
            </View>
        </SafeAreaView>
    )
}

export default ExploreProductScreen

