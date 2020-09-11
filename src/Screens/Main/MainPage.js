import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Vibration, Dimensions, Alert } from 'react-native';

import { connect } from 'react-redux';

import {getDailyPomodoro,getDailyPomodoroForOnce,addDailyPomodoro} from '../../Actions'


const{width,height}=Dimensions.get('window');

const MainPage = (props) => {

  const [startStop, setStartStop] = useState(false);

  const [minutes, setMinutes] = useState(props.user.worktime);
  const [seconds, setSeconds] = useState(0);

  const [goal, setGoal] = useState(props.user.dailygoal);
  const [dailyWork, setDailyWork] = useState();

  const[isRest,setIsRest]=useState('Neutral');


  useEffect(() => {
    let params={
      userid:props.user.uid,
      date:new Date().toLocaleDateString()
    }
    props.getDailyPomodoro(params);
    console.log('Gelen props main',props)
    setDailyWork(props.dailyPomodoro?props.dailyPomodoro.dailywork:0)
 }, []);

  useEffect(() => {
   
    // props.dailyPomodoro[0].dailyWork
    let interval = null
    if (startStop) {
      if(dailyWork==goal)
      {
        setStartStop(!startStop)
        setMinutes(props.user.worktime)
        setSeconds(0)
        Alert.alert('Bugünlük hedefinizi tamamladınız!!!')
      }
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
        if (seconds == 0) {
          setMinutes(minutes => minutes - 1)
          setSeconds(59)
        }
        if (seconds == 0 && minutes == 0&&(isRest=='Neutral' ||isRest=='Work')) {
          // Vibration.vibrate();
          setIsRest('Rest');
          changeColor();
          setMinutes(props.user.resttime)
          setSeconds(0)
        }
        else if(seconds == 0 && minutes == 0 &&isRest=='Rest'){
          // Vibration.vibrate();
          setIsRest('Work');
          changeColor();
          setMinutes(props.user.worktime)
          setSeconds(0)

          setDailyWork(dailyWork=>dailyWork+1)
          console.log(dailyWork)
          const daily=dailyWork+1;
          
          let params={
            daily:dailyWork,
            userid:props.user.uid,
            date:new Date().toLocaleDateString()
          }
          props.addDailyPomodoro(params)
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [seconds, startStop, minutes]);

  const changeColor=()=>{
    if(isRest=='Rest'){
      return{
        backgroundColor:'blue',
      }
    }
    else if(isRest=='Work'||isRest=='Neutral'){
      return{
        backgroundColor:'red',
      }
    }
  }

 
  // useEffect(() => {
  //   let interval = null
  //   if (startStop) {
  //     interval = setInterval(() => {
  //       setSeconds(seconds => seconds + 1);
  //       if (seconds == 59) {
  //         setMinutes(minutes => minutes + 1)
  //         setSeconds(0)
  //       }
  //       if (minutes == 25) {
  //         Vibration.vibrate();
  //         setMinutes(5)
  //       }
  //     }, 1000);
  //   }
  //   return () => clearInterval(interval);
  // }, [seconds, startStop, minutes]);


  // const start = () => {
  //   let interval = null
  //   if (startStop) {
  //     interval = setInterval(() => {
  //       setSeconds(seconds => seconds + 1);
  //       if (seconds == 60) {
  //         setMinutes(minutes => minutes + 1)
  //         setSeconds(0)
  //       }
  //     }, 1000);
  //   }
  //   return () => clearInterval(interval);
  // }

  // useEffect(() => {
  //   start();
  // }, [])

  return (
    <View style={styles.container}>
      <View style={[styles.timerView,changeColor()]}>
        <Text style={styles.timerText}>{minutes} : {seconds} </Text>
      </View>
      <View style={styles.buttonView}>
        <TouchableOpacity style={styles.startStopButton} onPress={() => setStartStop(!startStop)}>
          {startStop ?
            (<Image style={styles.playImage} source={require('../../images/stop-button.png')} />) :
            (<Image style={styles.playImage} source={require('../../images/play-button.png')} />)
          }
        </TouchableOpacity>
        <TouchableOpacity style={styles.startStopButton} onPress={() => alert('reset')}>
          <Image style={styles.playImage} source={require('../../images/power-button.png')} />
        </TouchableOpacity>
      </View>

      <View style={styles.goalView}>
        <Text style={styles.timerText}>Hedef:  {dailyWork}/{goal}</Text>

      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  startStopButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:width*0.1,
    borderWidth:3,
    borderColor:'black',
    borderRadius:50,
    width:width*0.25,
    height:width*0.25,
    
  },
  playImage: {
    height: width*0.1,
    width: width*0.1
  },
  timerView: {
    backgroundColor:'red',
    flex:2.5,
    alignItems:'center',
    justifyContent: 'center',
    width:width
  },
  timerText: {
    fontWeight: 'bold',
    fontSize: 60,
    // marginVertical: height*0.01
  },
  buttonView:{
    flexDirection:'row',
    flex:2.5,
    alignItems:'center',
    justifyContent:'center'
  },
  goalView:{
    flex:1
  }
});

const mapStateToProps = ({mainPageResponse,authResponse }) => {
  const { loadingMainPage, dailyPomodoro } = mainPageResponse;
  return { loadingMainPage, dailyPomodoro,user:authResponse.user };
};

export default connect(mapStateToProps, {getDailyPomodoro,getDailyPomodoroForOnce,addDailyPomodoro})(MainPage);

