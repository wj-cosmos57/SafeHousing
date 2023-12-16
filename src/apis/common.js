import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// const API_BASE_URL = 'https://safehousing.ssu.today/';
const API_BASE_URL = "http://172.30.1.46/";

const makeHeaders = async authRequired => {
  if (authRequired) {
    let accessToken = await AsyncStorage.getItem('accessToken');

    if (!accessToken) {
      accessToken = '';
    }

    return {
      Authorization: 'Bearer ' + accessToken
    };
  } else {
    return {
    };
  }
};

const post = async (uri, body, authRequired, isMultipart = false) => {
  try {
    let headers = await makeHeaders(authRequired);
    if(isMultipart){
      headers['Content-Type'] = "multipart/form-data";
    }
    let response = await axios.post(API_BASE_URL + uri, body, {
      headers: headers,
      timeout: 5000,
    });
    return response.data;
  } catch (e) {
    if (e.response?.status) {
      if (e.response?.status == 521) {
        return {
          error: true,
          message: 'Failed to connect to server',
        };
      }
    }

    if (e.response?.data) {
      return e.response.data;
    }

    return {
      error: true,
      message: 'Failed to connect to server'
    };
  }
};

const get = async (uri, authRequired, isMultipart = false) => {
  try {
    let headers = await makeHeaders(authRequired);
    if(isMultipart){
      headers['Content-Type'] = "multipart/form-data";
    }
    let response = await axios.get(API_BASE_URL + uri, {
      headers: headers,
      timeout: 5000,
    });

    return response.data;
  } catch (e) {
    if (e.response?.status) {
      if (e.response?.status == 521) {
        return {
          error: true,
          message: 'Failed to connect to server',
        };
      }
    }

    if (e.response?.data) {
      return e.response.data;
    }

    return {
      error: true,
      message: 'Failed to connect to server'
    };
  }
};

export {makeHeaders, post, get}