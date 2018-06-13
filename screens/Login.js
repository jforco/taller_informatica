import React from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage,} from 'react-native';
import { createStackNavigator } from 'react-navigation';


import t from 'tcomb-form-native'; // 0.6.9
const Form = t.form.Form;
const User = t.struct({
  usuario: t.String,
  contraseña: t.String,
});


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
  render() {
    return (
      <View style={styles.container}>
        <Form 
          ref={c => this._form = c} // assign a ref
          type={User} 
        /> 
        <Button
          title="Iniciar Sesión"
          onPress={this.form_submit}
        />
      </View>
    );
  }

  form_submit = () => {
    const value = this._form.getValue(); // use that ref to get the form value
    console.log('value: ', value);
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    marginTop: 50,
    padding: 20,
    backgroundColor: '#ffffff',
  },
});
