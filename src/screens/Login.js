import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Image,
} from 'react-native';
import React from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = ({navigation}) => {
  const [nim, setNim] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async value => {
    console.log('value', value);
    try {
      // ip nya ganti dengan ip jaringanmu
      const response = await axios.post(
        'http://192.168.100.7:3001/users/login',
        {
          nim: value.nim,
          password: value.password,
        },
      );
      if (response.data.status == 200) {
        console.log('response', response.data);
        ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT);
        await AsyncStorage.setItem('password', value.password);
        await AsyncStorage.setItem('nim', value.nim);
        await AsyncStorage.setItem('nama', response.data.users.nama);
        navigation.replace('Homepage');
      }
    } catch (error) {
      console.log(error.message);
      ToastAndroid.show('Cek Kembali Nip dan password', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Microsoft_To-Do_icon.png/942px-Microsoft_To-Do_icon.png',
        }}
        style={styles.img}
      />
      <View>
        <Text style={styles.judul}>TODO LIST</Text>
      </View>
      <View>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>NIM</Text>
        <TextInput
          style={styles.input}
          placeholder="Nim"
          placeholderTextColor="#fff"
          onChangeText={nim => setNim(nim)}
          value={nim}
        />
        <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#fff"
          secureTextEntry={true}
          onChangeText={password => setPassword(password)}
          value={password}
        />

        <TouchableOpacity
          style={styles.button1}
          onPress={async () => {
            await handleLogin({nim, password});
          }}>
          <Text style={styles.buttonText1}>LOGIN</Text>
        </TouchableOpacity>
        <View style={styles.containertext}>
          <Text style={styles.TextOr}>Or</Text>
        </View>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('Register')}>
          <Text style={styles.buttonText2}>REGISTER</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3B3B3B',
  },
  containertext: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  img: {
    width: 150,
    height: 150,
    borderRadius: 50,
  },
  judul: {
    color: '#3CCCCC',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#737373',
    borderRadius: 5,
    color: 'white',
    paddingHorizontal: 20,
    marginBottom: 20,
    width: 300,
  },
  button1: {
    marginTop: 40,
    width: 300,
    height: 50,
    backgroundColor: '#3CCCCC',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button2: {
    width: 300,
    height: 50,
    backgroundColor: '#2382C9',
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  buttonText1: {
    color: '#000',
    fontsize: 20,
    fontWeight: 'bold',
  },
  buttonText2: {
    color: '#fff',
    fontsize: 20,
    fontWeight: 'bold',
  },
  TextOr: {
    marginTop: 15,
    marginBottom: 15,
    alignItems: 'center',
    color: '#ffffff',
  },
  text: {
    color: 'white',
    marginTop: 20,
    textAlign: 'center',
    fontSize: 15,
  },
});

export default Login;
