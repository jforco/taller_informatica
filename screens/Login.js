import React from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage} from 'react-native';
import { createStackNavigator } from 'react-navigation';


import t from 'tcomb-form-native'; // 0.6.9
const Form = t.form.Form;
const User = t.struct({
  usuario: t.String,
  //contraseña: t.String,
  contraseña: t.String
});

var options = {
  fields: {
    contraseña: {
      password: true,
      secureTextEntry: true
    }
  }
};


export default class LoginScreen extends React.Component {
/*
  static navigationOptions = {
    title: 'Please sign in',
  };


  render() {
    return (
      <View style={styles.container}>
        <Button title="Sign in!" onPress={this._signInAsync} />
      </View>
    );
  }

  _signInAsync = async () => {
    await AsyncStorage.setItem('userToken', 'abc');
    this.props.navigation.navigate('App');
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  }


});
*/
  constructor(props) {
    super(props);
    this.state = { mensaje: '' };
  }

  form_submit = async () => {
    const value = this._form.getValue(); // use that ref to get the form value
    if(value){
      //.then((response) => response.json())
      /*.then((response) => {
        const statusCode = response.status;
        const data = response.json();
        return Promise.all([statusCode, data]);
      })*/
      //.then((responseJson) => {
      //  return responseJson.movies;
      //})
      /*.then((res, data) => {
        console.warn(data);
        if(res[0] == 200){
          this.setState({ mensaje: 'hecho' })
          alert("respuesta");
        } else {
          this.setState({ mensaje: 'fallo!' })
        }
      })
      .catch((error) => {
        this.setState({ mensaje: 'error en conexion.  Intente de nuevo.' })
      });*/
      //const userToken = AsyncStorage.setItem('userToken', 'abc');
      //this.props.navigation.navigate('App');
      
      let response;
      try {
        this.setState({ mensaje: 'conectando' })
        response = await fetch('http://178.62.85.85/api/dealers/login', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: value.usuario,
            password: value.contraseña,
          }),
        });   
      } catch (error) {
        this.setState({ mensaje: 'error en conexion. intente nuevamente' })
        return;
      }
      let responseJson = await response.json();
      if(response.status == 200){
        alert('bienvenido');
        const userToken = AsyncStorage.setItem('userToken', responseJson.success.token);
        this.props.navigation.navigate('App');
      } else {
        this.setState({ mensaje: responseJson.error })
      }
    } else {
      this.setState({ mensaje: 'por favor rellene los datos necesarios' })
    }  
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.mensaje}</Text>
        <Form 
          ref={c => this._form = c} // assign a ref
          type={User} 
          options={options}
        /> 
        <Button
          title="Iniciar Sesión"
          onPress={this.form_submit}
        />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
  mensaje: {
    backgroundColor: '#909090',
  },
});
