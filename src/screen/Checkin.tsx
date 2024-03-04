/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import useStore from '../store';
import {Button, StyleSheet, Text, View} from 'react-native';
import {axiosInstance} from '../utils/axios';
import Geolocation from '@react-native-community/geolocation';

const CheckInOutScreen = () => {
  const {logoutAction, userState} = useStore();
  const [position, setPosition] = React.useState(null);
  const [status, setStatus] = React.useState('CHECK_IN');
  const [loading, setIsLoading] = React.useState(true);

  const checkInCheckOut = async () => {
    setIsLoading(true);
    axiosInstance
      .post(
        'check-in',
        {
          position: position,
        },
        {
          headers: {
            Authorization: `Bearer ${userState.jwt}`,
          },
        },
      )
      .then(response => {
        setIsLoading(false);
        if (response.data === 'Success') {
          return getCurrentStatus();
        }
      })
      .catch(err => {
        console.log(err);
      });
  };

  const getCurrentStatus = async () => {
    setIsLoading(true);
    axiosInstance
      .get('check-last-status', {
        headers: {
          Authorization: `Bearer ${userState.jwt}`,
        },
      })
      .then(response => {
        setIsLoading(false);
        if (response.data === 'CHECK_IN') {
          return setStatus('CHECK_OUT');
        }

        return setStatus('CHECK_IN');
      })
      .catch(err => {
        setIsLoading(false);
        console.log(err);
      });
  };

  const getCurrentPosition = async () => {
    Geolocation.getCurrentPosition(
      (info: any) => setPosition(info),
      (err: any) => console.log(err),
      {enableHighAccuracy: false},
    );
  };

  React.useEffect(() => {
    getCurrentPosition();
    getCurrentStatus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={styles.container}>
      <Text>
        Welcome <Text style={{fontWeight: 'bold'}}>{userState.username}</Text>
      </Text>
      <Text>
        {status === 'CHECK_IN'
          ? 'Don`t forget to checkin'
          : 'Please Checkout when you are done'}
      </Text>
      <Button
        onPress={checkInCheckOut}
        title={loading ? 'Loading' : status}
        color={status === 'CHECK_IN' ? 'green' : 'red'}
        disabled={loading}
      />

      <View style={{marginTop: 30}}>
        <Button onPress={logoutAction} title="Logout" color={'pink'} />
      </View>
    </View>
  );
};

export default CheckInOutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    flexDirection: 'column',
    justifyContent: 'center',
    gap: 5,
  },
  textInput: {
    // backgroundColor: 'red',
    borderWidth: 1,
    borderColor: 'gray',
    height: 'auto',
    fontSize: 11,
    padding: 0,
    paddingHorizontal: 10,
  },
});
