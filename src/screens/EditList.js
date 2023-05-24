import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

const EditList = ({route}) => {
  const {replace} = useNavigation();
  const {id} = route.params;
  const [tanggal, setTanggal] = useState('');
  const [isi, setIsi] = useState('');

  const btnEdit = async () => {
    try {
      // ip nya ganti dengan ip jaringanmu
      await axios.put('http://192.168.100.7:3001/todo/', {
        id: id,
        tanggal: tanggal,
        isi: isi,
      });

      replace('Homepage');
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Kegiatan</Text>
      <View style={{marginTop: 12}}>
        <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Tanggal</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukan Tanggal"
          placeholderTextColor="#fff"
          onChangeText={tanggal => setTanggal(tanggal)}
          value={tanggal}
        />
      </View>
      <View style={{marginTop: 12}}>
        <Text style={{color: '#ffffff', fontWeight: 'bold'}}>Kegiatan</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukan Kegiatan"
          placeholderTextColor="#fff"
          onChangeText={isi => setIsi(isi)}
          value={isi}
        />
      </View>
      <TouchableOpacity
        style={styles.btn}
        onPress={async () => await btnEdit()}>
        <Text style={styles.btnText}>Edit Data</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#3B3B3B',
    flex: 1,
    padding: 30,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#737373',
    borderRadius: 5,
    color: 'white',
    paddingHorizontal: 20,
    marginTop: 10,
  },
  btn: {
    backgroundColor: '#2382C9',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});

export default EditList;
