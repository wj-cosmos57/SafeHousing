import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Header from '../components/Header';
import Footer from '../components/Footer';

const ListScreen = ({navigation}) => {
  return (
    <View style={styles.mainView}>
      <Header />
      <View style={styles.containerView}>
        <Text style={styles.textStyle}>ListScreen</Text>
      </View>
      <Footer menu={2} navigation={navigation} />
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: 'white',
  },
  containerView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textStyle: {
    fontSize: 30,
    textAlign: 'center',
  },
});
