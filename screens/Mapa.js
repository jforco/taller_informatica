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

const {width, height} = Dimensions.get('window')
const LATDELTA = 0.01;
const LONGDELTA = 0.01;

export default class MapaScreen extends Component {

  static navigationOptions = {
    title: 'Mapaaa',
  };
  constructor() {
    super();
  
    this.state = {
      region: {
        latitude: null,
        longitude: null,
        latitudeDelta: null,
        longitudeDelta: null
      }
    };
  }

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

  render() {
    return (
      <View style={styles.container}>
        {this.state.region.latitude ? 
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