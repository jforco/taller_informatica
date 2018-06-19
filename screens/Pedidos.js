import React from 'react';
import { StyleSheet, FlatList, Text, View, Alert, ActivityIndicator, Platform, AsyncStorage} from 'react-native';
import { createStackNavigator } from 'react-navigation';

export default class PedidoScreen extends React.Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
    this.state = {
      isLoading: true,
      dataSource: [],
    }
  }

  _bootstrapAsync = async () => {
    const userOrders = await AsyncStorage.getItem('userOrders');
    if(userOrders){
      this.props.navigation.navigate('Pedidos');
      this.setState({
        dataSource: JSON.parse(userOrders),
        isLoading: false 
      });
    } else {
      alert('No tienes pedidos.  Por favor, inicia el Recorrido');
      this.props.navigation.navigate('Home');
    }
  };

  static navigationOptions = {
    title: 'Pedidos',
  };

  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "100%",
          backgroundColor: "#607D8B",
        }}
      />
    );
  }

  ver_Pedido(item){
    this.props.navigation.navigate('Ver',{ pedido: item});
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }
 
    return (
      <View style={styles.MainContainer}>  
       <FlatList
          data={ this.state.dataSource }
          ItemSeparatorComponent = {this.FlatListItemSeparator}
          renderItem={({item}) => 
              <View>
                <Text style={styles.FlatListItem1Style} onPress={this.ver_Pedido.bind(this, item)}> {item.nombre} </Text>
                <Text style={styles.FlatListItem2Style}> {item.direccion} </Text>
              </View>
          }
          keyExtractor={(item, index) => index}          
         />
      </View>      
    );
  }
}

const styles = StyleSheet.create({
 
  MainContainer :{
    justifyContent: 'center',
    flex:1,
    margin: 10,
    paddingTop: (Platform.OS === 'ios') ? 20 : 0,
     
  },
   
  FlatListItem1Style: {
    padding: 5,
    fontSize: 16,
  },
  FlatListItem2Style: {
    padding: 5,
    fontSize: 12,
  },
 
});