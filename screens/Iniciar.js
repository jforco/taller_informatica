import React from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage} from 'react-native';
import { createStackNavigator } from 'react-navigation';

import t from 'tcomb-form-native'; // 0.6.9
const Form = t.form.Form;
const Carga = t.struct({
  bidones: t.Number,
  dispensadores: t.Number
});

export default class IniciarScreen extends React.Component {
  static navigationOptions = {
    title: 'Iniciar Recorrido',
  };

  constructor() {
    super();
    this.state = {
      latitude: null,
      longitude: null,
      mensaje: '',
    };
  }

  componentWillMount () {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const long = position.coords.longitude
        this.setState({ 
          latitude: lat, 
          longitude: long, 
        }) 
      }
    )
  }

  form_submit = async () => {
    const value = this._form.getValue(); // use that ref to get the form value
    if(value){
      let response;
      const userToken = await AsyncStorage.getItem('userToken'); 

      //crear carga
      let bidones = {
        product_id:1,
        cantidad: value.bidones
      };

      let dispensadores = {
        product_id:2,
        cantidad: value.dispensadores
      };
      
      let cargaArray = new Array(bidones, dispensadores);
      console.log(cargaArray);
      try {
        this.setState({ mensaje: 'conectando' })
        response = await fetch('http://178.62.85.85/api/dealers/routes', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + userToken,
          },
          body: JSON.stringify({
            lat: this.state.latitude,
            lng: this.state.longitude,
            carga: cargaArray
          }),
        });   
        console.log(response);
      } catch (error) {
        this.setState({ mensaje: 'error en conexion. intente nuevamente' })
        return;
      }
      let responseJson = await response.json();
      if(response.status == 202){
        alert('Iniciando el Recorrido');
        this.setState({ mensaje: 'hecho' })
        console.log(responseJson);
        console.log(JSON.stringify(responseJson));
        const userOrders = await AsyncStorage.setItem('userOrders', JSON.stringify(responseJson));
        this.props.navigation.navigate('Home',{ recorriendo: true});
      } else {
        this.setState({ mensaje: responseJson.errors })
      }
    } else {
      this.setState({ mensaje: 'por favor rellene los datos necesarios' })
    }  
  }
            
  render() {
    return (
      <View style={styles.container}>
        {this.state.latitude ? 
          <View>
          <Text>{this.state.mensaje}</Text>
          <Form 
            ref={c => this._form = c}
            type={Carga} 
          />           
          <Button
            title="Iniciar Recorrido"
            onPress={this.form_submit}
          />
          </View>
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

});