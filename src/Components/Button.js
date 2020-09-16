import React from 'react';
import { Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import { colors } from '../style';
const Button = (props) => (
  <TouchableOpacity
    activeOpacity={0.8}
    onPress={props.onPress}
    style={[{
      backgroundColor: colors.main,
      width: '100%',
      height: '25%',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 40
    }, props.style]}>
    {props.loading ?
      <ActivityIndicator size='small' color='white' /> :
      <Text style={{
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
      }}>{props.text}</Text>
    }
  </TouchableOpacity>
);

export { Button };
