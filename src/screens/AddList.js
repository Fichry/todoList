import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';

const AddList = () => {
  const {replace} = useNavigation();
  const [tanggal, setTanggal] = useState('');
  const [isi, setIsi] = useState('');

  const btnTambah = async () => {
    try {
      const nim = await AsyncStorage.getItem('nim');
      const nama = await AsyncStorage.getItem('nama');
      // ip nya ganti dengan ip jaringanmu
      const res = await axios.post('http://192.168.100.7:3001/todo/tambah', {
        nim: nim,
        nama: nama,
        tanggal: tanggal,
        isi: isi,
      });

      if (res.data.status === 200) {
        console.log('Data berhasil ditambahkan');
        replace('Homepage');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tambah Kegiatan</Text>
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
        onPress={async () => await btnTambah()}>
        <Text style={styles.btnText}>Tambah Data</Text>
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

export default AddList;
