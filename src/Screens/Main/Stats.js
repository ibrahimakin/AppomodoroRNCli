import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, SafeAreaView, FlatList } from 'react-native';

import {
    BarChart
} from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';

import Carousel from 'react-native-snap-carousel';

const { width, height } = Dimensions.get('window');



const data = {
    labels: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
    datasets: [
        {
            data: [8, 6, 3, 9, 10, 6, 8],
        }
    ]
};





const _renderItem = () => {
    return (
        <View style={styles.carouselItemView}>
            <BarChart
                data={data}
                width={width}
                height={height * 0.45}
                chartConfig={{
                    strokeWidth: 1,
                    decimalPlaces: 0,
                    backgroundColor: "#FE7C7C",
                    backgroundGradientFrom: "#FE7C7C",
                    backgroundGradientTo: "#FE7C7C",
                    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                    style: {
                    },
                    propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                        stroke: "#ffa726"
                    }
                }}
                style={{
                    // marginVertical: 8,
                    // borderRadius: 16
                }}
                verticalLabelRotation={15}
            />
        </View>
    );
}
const carouselItems = [
    {
        id: 1,
    },
    {
        id: 2,
    },
]



const renderListItem = ({ item }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{item.title}</Text>
    </View>
);


const DATA = [
    {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
    },
    {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97fg3',
        title: 'Fourth Item',
    },
    {
        id: '58694a0f-3da1-471f-bd96-145571e29a72',
        title: 'Fifth Item',
    },
];

const Stats = (props) => {

    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
            <View style={{ flex: 3 }}>
                <Carousel
                    ref={(c) => { carouselItems.id = c; }}
                    data={carouselItems}
                    renderItem={() => _renderItem()}
                    sliderWidth={width}
                    itemWidth={width}
                />
            </View>
            <View style={{ flex: 3, width: width }}>
                <Text style={styles.achievementsText}>Başarımlar</Text>
                <ScrollView>
                    <SafeAreaView style={styles.container}>
                        <FlatList
                            data={DATA}
                            renderItem={renderListItem}
                            keyExtractor={item => item.id}
                        />
                    </SafeAreaView>
                </ScrollView>

            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    carouselItemView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },



    container: {
        flex: 1,
    },
    item: {
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        width: width * 0.9,
        borderWidth: 1,
        borderColor: 'black'
    },
    title: {
        fontSize: 32,
    },

    achievementsText: {
        fontSize: 30,
        fontWeight: "bold",
        margin: width * 0.04
    }


});

export default Stats;
