import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import { connect } from 'react-redux';
import { Icon } from 'native-base';
import { Button } from './';
import { ScrollView } from 'react-native-gesture-handler';
import { colors } from '../style';
import { getDailyPomodoro, getDailyPomodoroForOnce, addDailyPomodoro, updateDailySession } from '../Actions';

const StopwatchContainer = (props) => {
  const [workMin, setWorkMin] = useState(props.user.worktime);
  const [workSec, setWorkSec] = useState(0);
  const [restMin, setRestMin] = useState(props.user.resttime);
  const [min, setMin] = useState(workMin);
  const [sec, setSec] = useState(workSec);
  const [start, setStart] = useState(false);
  const [toggle, setToggle] = useState(null);
  const [dailySession, setDailySession] = useState(props.user.dailysession);
  const [restingNotice, setRestingNotice] = useState(false);
  const [achivement, setAchivement] = useState(false);
  const [resting, setResting] = useState(false);

  const padToTwo = (number) => (number <= 9 ? `0${number}` : number);

  const handleToggle = () => { setStart(!start); };

  const startResting = () => { setToggle(null); clearInterval(toggle); setWorkMin(min); setWorkSec(sec); setMin(restMin); setSec(0); setResting(true); setRestingNotice(false); };
  const startWorking = () => { setToggle(null); clearInterval(toggle); setMin(workMin); setSec(workSec); setResting(false); };

  const saveChanges = (session, date) => {
    const payload = {
      uid: props.user.uid,
      email: props.user.email,
      username: props.user.username,
      name: props.user.name,
      image: props.user.image,
      dailygoal: props.user.dailygoal,
      worktime: props.user.worktime,
      resttime: props.user.resttime,
      dailysession: session,
      lastsessiondate: date
    }
    props.updateDailySession({ payload });
  }

  // if dailygoal is updated from profile page
  useEffect(() => {
    setStart(false);
    const date = new Date().toLocaleDateString();
    if (props.user.lastsessiondate != date) {
      setDailySession(0);
      saveChanges(0, date)
    }
    if (props.user.dailygoal <= dailySession) {
      setAchivement(true);
    }
    else {
      setAchivement(false);
    }
  }, [props.user.dailygoal]);

  // if worktime, resttime are updated from profile page
  useEffect(() => {
    setStart(false);
    if (!resting && props.user.worktime <= min) {
      setMin(props.user.worktime);
      setSec(0);
    }
    if (resting && props.user.resttime <= min) {
      setMin(props.user.resttime);
      setSec(0);
    }
    setRestMin(props.user.resttime);
    setWorkMin(props.user.worktime);
    setWorkSec(0);
  }, [props.user.worktime, props.user.resttime]);

  // for Chronometer toggle
  useEffect(() => {
    if (start) {
      let secTemp = sec;
      let minTemp = min;
      let dailySessionTemp = dailySession;
      let restingTemp = resting;
      setToggle(setInterval(() => {
        if (secTemp > 0) {
          setSec(second => second - 1);
          --secTemp;
        }
        else if (minTemp > 0) {
          setMin(minute => minute - 1);
          --minTemp;

          setSec(59);
          secTemp = 59;
        }
        else {
          if (!restingTemp) {
            setDailySession(count => count + 1);
            ++dailySessionTemp;

            const date = new Date().toLocaleDateString();
            if (props.user.lastsessiondate != date) {
              setDailySession(1); dailySessionTemp = 1;
            }
            saveChanges(dailySessionTemp, date);

            minTemp = props.user.worktime;
            setMin(minTemp);

            secTemp = 0;
            setSec(secTemp);

            setRestingNotice(true);
          }
          else {
            setRestingNotice(false);
          }
        }

        if (props.user.dailygoal <= dailySessionTemp) {
          setAchivement(true);
        }
        else {
          setAchivement(false);
        }

      }, 1000));

    } else {
      setToggle(null);
      clearInterval(toggle);
    }
    if (props.user.dailygoal <= dailySession) {
      setAchivement(true);
    }
    else {
      setAchivement(false);
    }
    return () => clearInterval(toggle);
  }, [start, resting]);


  const handleReset = () => {
    setStart(false);
    startWorking();
    setWorkMin(props.user.worktime);
    setWorkSec(0);
    setMin(props.user.worktime);
    setSec(0);
  };

  const handleBoost = () => {
    setMin(0);
    setSec(3);
    setStart(false);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flex: 10 }}>
        <ScrollView >
          <View style={{ backgroundColor: resting ? colors.main : colors.red, borderRadius: 25, borderWidth: 2, }}>
            <Text style={styles.title}> Appomodora'ya Hoşgeldiniz </Text>

            <View style={styles.parent}>
              <Text style={styles.child}>{padToTwo(min) + ' : '}</Text>
              <Text style={styles.child}>{padToTwo(sec)}</Text>
            </View>
          </View>

          <View style={styles.buttonParent}>
            <TouchableOpacity style={styles.startStopButton} activeOpacity={0.8} onPress={handleToggle}>
              <Icon name={start ? 'pause' : 'play'} type='FontAwesome' style={{ fontSize: 50 }} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.startStopButton} activeOpacity={0.8} onPress={handleReset}  >
              <Icon name='power-off' type='FontAwesome' style={{ fontSize: 50 }} />
            </TouchableOpacity>
            {
              //<Button text='Boost' onPress={handleBoost} style={{ width: 60 }} />
            }
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'space-between', marginTop: '5%', alignSelf: 'center' }}>
            <Text style={{ fontSize: 25, alignSelf: 'center' }}>
              {'Günlük Hedef :  '}
            </Text>
            <Text style={{ fontSize: 50, fontWeight: 'bold' }}>
              {dailySession} / {props.user.dailygoal}
            </Text>
          </View>
          <View style={{ alignSelf: 'center' }} >
            {achivement ?
              <Icon name='check-circle' type='FontAwesome' style={{ fontSize: 100, color: resting ? colors.main : colors.red }} />
              :
              null
            }
          </View>

        </ScrollView>
      </View>
      {restingNotice ?
        <View style={{ flex: 1, minHeight: 10, flexDirection: 'row' }}>
          <Text style={{ alignSelf: 'center', fontSize: 20, color: colors.red, fontWeight: 'bold' }} >
            {'Dinlenmeyi Unutma  '}
          </Text>
          <Button text='Dinlen' onPress={startResting} style={{ minHeight: '100%', width: 100, backgroundColor: colors.red }} />
        </View>
        :
        null
      }
      {resting && min <= 0 && sec <= 0 ?
        <View style={{ flex: 1, minHeight: 10, flexDirection: 'row' }}>
          <Text style={{ alignSelf: 'center', fontSize: 20, color: colors.main, fontWeight: 'bold' }} >
            {'Çalışmayı Unutma  '}
          </Text>
          <Button text='Çalış' onPress={startWorking} style={{ minHeight: '100%', width: 100, }} />
        </View>
        :
        null
      }

    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: 'center',
    justifyContent: 'flex-start',

  },
  parent: {
    display: 'flex',
    flexDirection: 'row',
    borderWidth: 2,
    alignSelf: 'center',
    borderRadius: 25,
    paddingLeft: '8%',
    paddingRight: '8%',
    paddingTop: '.5%',
    paddingBottom: '.5%',
  },

  child: {
    fontSize: 70,
    color: '#fff',
    fontWeight: 'bold'
  },

  buttonParent: {
    minWidth: 200,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '12%',
  },

  startStopButton: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 25,
    borderWidth: 3,
    borderColor: 'black',
    borderRadius: 50,
    minWidth: 100,
    minHeight: 100,
  },
  title: {
    fontSize: 30,
    alignSelf: 'center',
    color: "#fff",
    fontWeight: "bold",
    marginBottom: "8%",
    marginTop: "8%",
  },

});

const mapStateToProps = ({ mainPageResponse, authResponse }) => {
  const { loadingMainPage, dailyPomodoro } = mainPageResponse;
  const { user } = authResponse;
  return { loadingMainPage, dailyPomodoro, user };
};

export default connect(mapStateToProps, { getDailyPomodoro, getDailyPomodoroForOnce, addDailyPomodoro, updateDailySession })(StopwatchContainer);