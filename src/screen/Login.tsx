import React from 'react';

import useStore from '../store';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {axiosInstance} from '../utils/axios';

function LoginScreen() {
  const {setUser} = useStore();
  const [username, setUsername] = React.useState('');
  const [pass, setPass] = React.useState('');

  const actionLogin = async () => {
    axiosInstance
      .post('auth/local/', {
        identifier: username,
        password: pass,
      })
      .then(response => {
        setUser({
          username: response.data?.user?.username,
          jwt: response.data?.jwt,
        });
        // console.log(response.data);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const handleLogin = () => {
    // loginAction();
    actionLogin();
  };
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <TextInput
        placeholder="Masukan Username"
        style={styles.textInput}
        value={username}
        onChangeText={e => {
          setUsername(e);
        }}
      />
      <TextInput
        placeholder="Masukan Password"
        style={styles.textInput}
        secureTextEntry={true}
        value={pass}
        onChangeText={e => {
          setPass(e);
        }}
      />
      <Button onPress={() => handleLogin()} title="Login" />
    </View>
  );
}

export default LoginScreen;

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
