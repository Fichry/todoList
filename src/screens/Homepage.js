import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Homepage = ({navigation}) => {
  const [list, setList] = useState([]);
  const [cari, setCari] = useState('');

  const dataList = async () => {
    try {
      const nim = await AsyncStorage.getItem('nim');
      console.log(nim);
      // ip nya ganti dengan ip jaringanmu
      const res = await axios.get(`http://192.168.100.7:3001/todo/${nim}`);
      setList(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const btnStatus = async (id, status) => {
    console.log('idstatus', id);
    try {
      if (status === 'Belum selesai') {
        // ip nya ganti dengan ip jaringanmu
        await axios.put(`http://192.168.100.7:3001/todo/check/${id}`);
        dataList();
      } else if (status === 'Selesai') {
        // ip nya ganti dengan ip jaringanmu
        await axios.put(`http://192.168.100.7:3001/todo/uncheck/${id}`);
        dataList();
      }
    } catch (e) {
      console.log(e);
    }
  };

  const btnCari = async () => {
    try {
      const nim = await AsyncStorage.getItem('nim');
      // ip nya ganti dengan ip jaringanmu
      const res = await axios.get(
        `http://192.168.100.7:3001/todo/cari/all?nim=${nim}&isi=${cari}`,
      );
      setList(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    dataList();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.search}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#fff"
          onChangeText={value => setCari(value)}
        />
        <TouchableOpacity
          style={styles.buttonCari}
          onPress={async () => await btnCari()}>
          <Text style={styles.btnText}>Search</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.top}>
        <Text style={styles.title}>Kegiatan</Text>
        <TouchableOpacity
          style={styles.refresh}
          onPress={async () => await dataList()}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Refresh</Text>
        </TouchableOpacity>
      </View>
      <View>
        {list.map((item, i) => (
          <TouchableOpacity
            style={styles.conList}
            key={i}
            onPress={() => navigation.replace('Details', {id: item.id})}>
            <View>
              <Text style={styles.nim}>{item.tanggal}</Text>
              <Text style={styles.status}>
                <Text style={{fontWeight: 'bold'}}>Status :</Text> {item.status}
              </Text>
              <Text style={styles.kegiatan}>{item.isi}</Text>
            </View>
            <TouchableOpacity
              style={styles.btnStatus}
              onPress={async () => await btnStatus(item.id, item.status)}
              disabled={item.status === 'Checked' && true}>
              <Text style={styles.btnText}>
                {item.status === 'Belum selesai' ? 'Selesai' : 'Belum selesai'}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3B3B3B',
    paddingHorizontal: 16,
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  input: {
    color: '#fff',
    borderRadius: 8,
    paddingHorizontal: 20,
    fontSize: 16,
    height: 44,
    borderWidth: 1,
    borderColor: '#fff',
    width: '77%',
  },
  buttonCari: {
    backgroundColor: '#3CCCCC',
    padding: 12,
    borderRadius: 8,
  },
  btnText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  title: {
    color: '#fff',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
  },
  conList: {
    backgroundColor: '#3CCCCC',
    padding: 12,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    marginBottom: 8,
  },
  nim: {
    color: '#333',
    fontSize: 20,
    fontWeight: 'bold',
  },
  status: {
    color: '#333',
    // marginVertical: 2,
  },
  kegiatan: {
    color: '#333',
  },
  btnStatus: {
    padding: 12,
    backgroundColor: '#2382C9',
    borderRadius: 8,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refresh: {
    backgroundColor: '#2382C9',
    padding: 8,
    borderRadius: 4,
  },
});

export default Homepage;
