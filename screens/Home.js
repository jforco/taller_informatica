import React from 'react';
import { View, Text, Button, StyleSheet, AsyncStorage} from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class HomeScreen extends React.Component {
  constructor() {
    super();
  }

  static navigationOptions = {
    title: 'Home - FamiUni',
  };

  booleano = async () => {
    const userOrders = await AsyncStorage.getItem('userOrders');
    if(userOrders){
      return true;
    } else {
      return false;
    }
  };

  render() {
    const { navigation } = this.props;
    let valor = this.booleano();
    const recorriendo = navigation.getParam('recorriendo', valor);
    
    return (
      <View style={styles.container}>
        <Text>Bienvenido a la app del distribuidor FamiUni</Text>
        { recorriendo ?
        <Button
          title="Cancelar Recorrido"
          onPress={this.cancelar_recorrido}
        />
        :
        <Button
          title="Iniciar Recorrido"
          onPress={() => this.props.navigation.navigate('Iniciar')}
        />
        }
        <Button
          title="Lista de Pedidos"
          onPress={() => this.props.navigation.navigate('Pedidos')}
        />
        <Button
          title="Mapa"
          onPress={() => this.props.navigation.navigate('Mapa')}
        />
        <Button
          title="Cerrar Sesión"
          onPress={this.cerrar_sesion}
        />
        <Text>Menu principal</Text>
      </View>
      
    );
  }
  cancelar_recorrido = async () => {
    const userOrders = await AsyncStorage.removeItem('userOrders');
    this.props.navigation.navigate('Home',  { recorriendo: false});
  }
  cerrar_sesion = async () => {
    const userToken = await AsyncStorage.removeItem('userToken');
    const userOrders = await AsyncStorage.removeItem('userOrders');
    this.props.navigation.navigate('Auth');
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },


});