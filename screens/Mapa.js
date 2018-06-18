import React, { Component } from 'react';
import { 
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions
} from 'react-native';

import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
 
const origin = {latitude: 37.3318456, longitude: -122.0296002};
const destination = {latitude: 37.771707, longitude: -122.4053769};
const GOOGLE_MAPS_APIKEY = 'AIzaSyBhkI0X1WScJL0AF-aBVXyYnfi6BJjDleg';
 


const {width, height} = Dimensions.get('window')
const LATDELTA = 0.01;
const LONGDELTA = 0.01;

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
        const accuracy = position.coords.accuracy
        this.setState({ 
          region: { 
            latitude: lat, 
            longitude: lon, 
            latitudeDelta: LATDELTA, 
            longitudeDelta: LONGDELTA 
          } 
        }) 
      }
    )
  }

  marker(){
    return {
      latitude: this.state.region.latitude,
      longitude: this.state.region.longitude
    }
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
    return (
      <View style={styles.container}>
        {this.state.region.latitude ? 
          
          <MapView initialRegion={this.state.region}>
              <MapViewDirections
                origin={origin}
                destination={destination}
                apikey={GOOGLE_MAPS_APIKEY}
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
    flex: 1,
    width: width
  },

});