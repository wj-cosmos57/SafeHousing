import React, {useState} from 'react';
import {View, TextInput, Button, StyleSheet, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  const handleLogin = () => {
    // 로그인
    navigation.navigate('Root');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.Title}>SAFE HOUSING</Text>
      <Text style={styles.subTitle}>Login to continue</Text>
      <TextInput
        style={styles.textInput}
        placeholder="아이디"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.textInput}
        placeholder="비밀번호"
        value={password}
        secureTextEntry
        onChangeText={setPassword}
      />
      <Button title="로그인" onPress={handleLogin} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  Title: {
    fontFamily: 'Pretendard-Bold',
    fontSize: 35,
    color: '#333333',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subTitle: {
    fontSize: 20,
    color: 'gray',
  },
  textInput: {
    padding: 10,
    width: '80%',
    height: 40,
    marginTop: 20,
    borderRadius: 10,
    backgroundColor: '#f1f1f1',
  },
});

export default LoginScreen;
