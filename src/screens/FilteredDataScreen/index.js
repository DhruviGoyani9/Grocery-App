import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { useRoute } from '@react-navigation/native'
import Card from '../../component/Card';
import { FruitsItems } from '../../component/data';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { GlobalStyles } from '../../style/globalStyles';

const FilteredDataScreen = () => {

    const route = useRoute();
    const data = route.params.item;
    const brand = route.params.brand;
    console.log({ data })
    return (
        <SafeAreaView style={{ ...GlobalStyles.backgroundColor, flex: 1, }}>

            <View style={{ ...GlobalStyles.marginLeft }}>
                <Card Items={data}
                    width={wp(42)}
                    buttonLeftPosition={wp(25)} />
                <Card Items={brand}
                    width={wp(42)}
                    buttonLeftPosition={wp(25)} />
            </View>
        </SafeAreaView>
    )
}

export default FilteredDataScreen

const styles = StyleSheet.create({})