import React from 'react';
import { Alert } from 'react-native';
import Loading from './Loading';
import * as Location from 'expo-location';
import axios from 'axios';
import Weather from './Weather';

const API_KEY = "7e8067a60073f80f270380624e820af7";

export default class extends React.Component {
  state = {
    isLoading: true
  }

  getWeather = async (latitude, longitude) => {
    const {
      data: {
        main: {temp},
        weather
      }
    } = await axios.get(
      `http://api.openweathermap.org/data/2.5/weather?lat=37.5985&lon=126.9783&appid=${API_KEY}&units=metric`
    );
    // console.log(temp, weather);
    this.setState({isLoading: false, temp: temp, condition: weather[0].main});
  }
  getLocation = async () => {
    try {
      let { status } = await Location.requestPermissionsAsync();
      if (status = 'granted') {
        let {coords: {latitude, longitude}} = await Location.getCurrentPositionAsync();

        this.getWeather(latitude, longitude);
      }
    } catch (error) {
      Alert.alert("Can not find you", "so sad");
    }
  }

  componentDidMount() {
    this.getLocation();
  }

  render() {
    const {isLoading, temp, condition} = this.state;
    return (isLoading) ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition} />;
    // return <Loading />
  }
}