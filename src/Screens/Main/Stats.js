import React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, Dimensions, SafeAreaView, FlatList, Image } from 'react-native';
import {
    BarChart
} from "react-native-chart-kit";
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';


import { connect } from 'react-redux';
import { getDailyPomodoroForStats, getAchievementList, getDailyPomodoroForStatsTest, getDailyPomodoroForGraphic } from '../../Actions'



const { width, height } = Dimensions.get('window');


const Stats = (props) => {



    const _renderItem = () => {
        return (
            <View style={styles.carouselItemView}>
                <BarChart
                    data={data}
                    width={width}
                    height={height * 0.45}
                    showValuesOnTopOfBars
                    chartConfig={{
                        strokeWidth: 1,
                        decimalPlaces: 0,
                        backgroundColor: "#FE7C7C",
                        backgroundGradientFrom: "#FE7C7C",
                        backgroundGradientTo: "#FE7C7C",
                        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                        style: {
                            paddingRight: 100
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
            {totalWorkCount >= item.dayCount ?
                <Image style={styles.achievementImage} source={require('../../images/tick.png')} /> :
                <Image style={styles.achievementImage} source={require('../../images/unlock.png')} />}
            <Text style={styles.title}>{item.achievementName}</Text>
        </View>
    );
    const [achievements, setAchievements] = useState([])
    const [totalWorkCount, setTotalWorkCount] = useState();
    const [graphDays, setGraphDays] = useState([]);
    const [graphDatas, setGraphDatas] = useState([]);


    useEffect(() => {
        props.getAchievementList();
    }, []);

    useEffect(() => {
        let params = {
            userid: props.user.uid,
        }
        props.getDailyPomodoroForGraphic(params);

        let graphDayArray = [];
        for (let index = 0; index < 7; index++) {
            var date = new Date();
            date.setDate(date.getDate() - index);
            graphDayArray.push(date.toLocaleDateString())
        }

        let graphicDataArray = [];

        graphDayArray.forEach(element => {
            let count = 0;
            for (let index = 0; index < props.dailyPomodoroForGraph?.length; index++) {
                if (props.dailyPomodoroForGraph[index] == element)
                    count++;
            }
            graphicDataArray.push(count)
        });

        setGraphDatas(graphicDataArray.reverse());
        setGraphDays(graphDayArray.reverse())
    }, [props.dailyPomodoroForGraph]);

    useEffect(() => {
        let params = {
            userid: props.user.uid,
        }
        props.getDailyPomodoroForStatsTest(params);
        setTotalWorkCount(props.dailyPomodoroForStats ? props.dailyPomodoroForStats.length : 0)
    }, [props.dailyPomodoroForStats]);


    const data = {
        // labels: ["Pazartesi", "Salı", "Çarşamba", "Perşembe", "Cuma", "Cumartesi", "Pazar"],
        labels: graphDays,
        datasets: [
            {
                // data: [8, 6, 3, 9, 10, 6, 8],
                data: graphDatas ? graphDatas : [0, 0, 0, 0, 0, 0, 0],
            }
        ]
    };
    // console.log('props', props)
    console.log('graphDays', graphDays)
    console.log('graphicDataArray', graphDatas)
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
                            data={props.achievementList ? props.achievementList : null}
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

    achievementImage: {
        height: width * 0.1,
        width: width * 0.1
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
        borderColor: 'black',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 20,
        marginLeft: width * 0.1
    },

    achievementsText: {
        fontSize: 30,
        fontWeight: "bold",
        margin: width * 0.04
    }


});

const mapStateToProps = ({ statsResponse, authResponse }) => {
    const { loadingStats, dailyPomodoroForStats, dailyPomodoroForGraph, achievementList } = statsResponse;
    return { loadingStats, dailyPomodoroForStats, dailyPomodoroForGraph, achievementList, user: authResponse.user };
};

export default connect(mapStateToProps,
    {
        getDailyPomodoroForStats,
        getAchievementList,
        getDailyPomodoroForStatsTest,
        getDailyPomodoroForGraphic
    })(Stats);

