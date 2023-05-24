import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ToastAndroid,
} from 'react-native';
import React from 'react';
import axios from 'axios';

const Register = ({navigation}) => {
  const [nim, setNim] = React.useState('');
  const [nama, setNama] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleRegister = async value => {
    console.log('value', value);
    try {
      // ip nya ganti dengan ip jaringanmu
      const response = await axios.post('http://192.168.100.7:3001/users/', {
        nim: value.nim,
        username: value.username,
        nama: value.nama,
        password: value.password,
      });
      if (response.data.status == 200) {
        console.log('response', response.data);
        navigation.navigate('Login');
        ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error.message);
      ToastAndroid.show('Register account failed', ToastAndroid.SHORT);
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
        <Text style={{color: '#ffffff', fontWeight: 'bold'}}>NIM</Text>
        <TextInput
          style={styles.input}
          placeholder="NIM"
          placeholderTextColor="#fff"
          onChangeText={nim => setNim(nim)}
          value={nim}
        />
        <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          placeholderTextColor="#fff"
          onChangeText={username => setUsername(username)}
          value={username}
        />
        <Text style={{color: '#FFFFFF', fontWeight: 'bold'}}>Nama</Text>
        <TextInput
          style={styles.input}
          placeholder="Nama"
          placeholderTextColor="#fff"
          onChangeText={nama => setNama(nama)}
          value={nama}
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
          onPress={async () =>
            await handleRegister({nim, nama, username, password})
          }>
          <Text style={styles.buttonText1}>Register</Text>
        </TouchableOpacity>
        <View style={styles.containertext}>
          <Text style={styles.TextOr}>Or</Text>
        </View>
        <TouchableOpacity
          style={styles.button2}
          onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText2}>LOGIN</Text>
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
    marginBottom: 10,
  },
  input: {
    width: 300,
    height: 40,
    backgroundColor: '#737373',
    borderRadius: 5,
    color: 'white',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  button1: {
    marginTop: 10,
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

export default Register;
