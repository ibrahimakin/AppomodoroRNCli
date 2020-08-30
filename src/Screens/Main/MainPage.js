import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, Vibration } from 'react-native';

import { connect } from 'react-redux';



const MainPage = (props) => {

  const [startStop, setStartStop] = useState(false);

  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);

  
  useEffect(() => {
    let interval = null
    if (startStop) {
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
        if(seconds==0){
          setMinutes(minutes => minutes - 1)
          setSeconds(59)
        }

        if(seconds==0&&minutes==0){
          Vibration.vibrate();
          setMinutes(5)
          setSeconds(0)
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [seconds, startStop, minutes]);

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
      <TouchableOpacity style={styles.startStopButton} onPress={() => setStartStop(!startStop)}>
        {startStop ?
          (<Image style={styles.playImage} source={require('../../images/stop-button.png')} />) :
          (<Image style={styles.playImage} source={require('../../images/play-button.png')} />)


        }
      </TouchableOpacity>
      <View style={styles.timerView}>
        <Text style={styles.timerText}>{minutes} : {seconds} </Text>

      </View>
      <Text></Text>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  startStopButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  playImage: {
    height: 50,
    width: 50
  },
  timerView: {
    marginTop: 25
  },
  timerText: {
    fontWeight: 'bold',
    fontSize: 20
  }
});

const mapStateToProps = ({  }) => {
    // const { loadingCharacter, characters } = charactersResponse;
    // return { loadingCharacter, characters };
    return {};
};

export default connect(mapStateToProps, {  })(MainPage);

// export default MainPage;


