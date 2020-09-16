import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import StopwatchContainer from '../../Components/StopwatchContainer';

const MainAlternative = (props) => {
  return (
    <View style={styles.container}>
      <StopwatchContainer />

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});



export default (MainAlternative);
