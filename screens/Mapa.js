import React, { Component } from 'react';
import { 
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  AsyncStorage
} from 'react-native';

import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
 
//const origin = {latitude: 37.3318456, longitude: -122.0296002};-17.79656079,-63.17850734
const destination1 = {latitude: -17.79656079, longitude: -63.17850734};
const destination2 = {latitude: -17.79666079, longitude: -63.17860734};
const GOOGLE_MAPS_APIKEY = 'AIzaSyBhkI0X1WScJL0AF-aBVXyYnfi6BJjDleg';
 


const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

export default class MapaScreen extends Component {



  static navigationOptions = {
    title: 'Mapaaa',
  };
  constructor() {
    super();
    this._bootstrapAsync();
    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null
      }
    };
  }

  _bootstrapAsync = async () => {
    const userOrders = await AsyncStorage.getItem('userOrders');
    if(userOrders){
      this.props.navigation.navigate('Mapa');
    } else {
      alert('No tienes pedidos.  Por favor, inicia el Recorrido');
      this.props.navigation.navigate('Home');
    }
  };

  componentWillMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lon = position.coords.longitude
        this.setState({ 
          region: { 
            latitude: lat, 
            longitude: lon, 
            latitudeDelta: LATITUDE_DELTA, 
            longitudeDelta: LONGITUDE_DELTA 
          } 
        }) 
      }
    )
  }

/*
          <MapView
            style={styles.map}
            initialRegion={this.state.region}
            showsUserLocation={true}
            showsMyLocationButton={true}
            zoomControlEnabled={true}
            rotateEnabled={false}
            cacheEnabled={true}
            loadingEnabled={true} 
          >
            
          </MapView> */
  render() {
    var origen1 = {latitude: this.state.region.latitude, longitude: this.state.region.longitude};
    const { navigation } = this.props;
    const lat = navigation.getParam('lat', null);
    const lng = navigation.getParam('lng', null);
    var destino1 = {latitude: lat, longitude: lng};
    return (
      <View style={styles.container}>
        {this.state.region.latitude ? 
          <MapView 
            initialRegion={this.state.region} 
            style={styles.map}
            showsUserLocation={true} 
          >
            <MapViewDirections
              origin={origen1}
              destination={destino1}
              apikey={GOOGLE_MAPS_APIKEY}
              strokeWidth={3}
              strokeColor="hotpink"
            />
          </MapView>
        :
          <Text>
            Obteniendo posicion...
          </Text>
        }
      </View>
        
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  map: {
    width : width | 200 ,
    height : height | 300 
  },

});