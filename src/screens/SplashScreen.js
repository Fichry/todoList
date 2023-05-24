import {View, Text, StyleSheet, Image} from 'react-native';
import React from 'react';

const SplashScreen = ({navigation}) => {
  setTimeout(() => {
    navigation.replace('Login');
  }, 3000);
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/Microsoft_To-Do_icon.png/942px-Microsoft_To-Do_icon.png',
        }}
        style={styles.logo}
      />
      <Text style={styles.text}>TODO LIST</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#494949',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 200,
    borderRadius: 50,
  },
  text: {
    color: 'white',
    fontSize: 30,
    marginTop: 20,
  },
});

export default SplashScreen;
