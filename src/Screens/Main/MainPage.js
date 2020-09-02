import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Vibration, Dimensions, Alert } from 'react-native';

import { connect } from 'react-redux';

const{width,height}=Dimensions.get('window');

const MainPage = (props) => {

  const [startStop, setStartStop] = useState(false);

  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(2);

  const [goal, setGoal] = useState(2);
  const [dailyWork, setDailyWork] = useState(0);

  const[isRest,setIsRest]=useState('Neutral');


  useEffect(() => {
    let interval = null
    if (startStop) {
      if(dailyWork==goal)
      {
        setStartStop(!startStop)
        setMinutes(25)
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
          setMinutes(0)
          setSeconds(2)
        }
        else if(seconds == 0 && minutes == 0 &&isRest=='Rest'){
          // Vibration.vibrate();
          setIsRest('Work');
          changeColor();
          setMinutes(0)
          setSeconds(2)

          setDailyWork(dailyWork=>dailyWork+1)
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

const mapStateToProps = ({ }) => {
  // const { loadingCharacter, characters } = charactersResponse;
  // return { loadingCharacter, characters };
  return {};
};

export default connect(mapStateToProps, {})(MainPage);

// export default MainPage;


