import React, { Component } from 'react';
import { StyleSheet, View, Image} from 'react-native';
import { Container, Header, Left, Body, Right, Title, Content, Button, Text, Spinner} from 'native-base';

import firebase from 'react-native-firebase';
import MapView, {Callout} from 'react-native-maps';

import markerPng from '../../images/marker.png';



class Principal extends Component{

    /*static navigationOptions = {
      header: (
        <Header style={ {'backgroundColor' : '#f78f03'}} androidStatusBarColor={'#BF6B03'}>
          <Left/>
          <Body>
            <Title>Principal</Title>
          </Body>
          <Right>
            <Button hasText transparent onPress={this._logout}>
              <Text>Logout</Text>
            </Button>
          </Right>
        </Header>
      )
    };*/

    constructor() {
      super();
      this.state = {
        usuario : firebase.auth().currentUser,
        fornecedores: [],
        position: {},
        region: {},
        loading: true,
        receivedDataConfirmation: 0,
        showMarkers: false,
        zoomLevel: 17,
      };
    }

    /*componentWillMount(){
      this.setState({
          usuario : firebase.auth().currentUser
      });
    }*/

    componentDidMount(){

      let position = {}, region = {}, fornecedores = [];
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          const {latitude, longitude} = coords;

          position.latitude = latitude;
          position.longitude = longitude;

          region.latitude = latitude;
          region.longitude = longitude;
          region.latitudeDelta = 0.0022;
          region.longitudeDelta = 0.0021;

          this.setState({
            position: position,
            region: region,
            receivedDataConfirmation: this.state.receivedDataConfirmation + 1,
          });
          console.log(' lt -> ' + latitude + ' lg -> ' +longitude);
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 25000, maximumAge: 1000}
      );
      firebase.firestore().collection('fornecedores').get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          const {name, coords} = doc.data();

          fornecedores.push({
            id: doc.id,
            name: name,
            coords: coords,
          });
        });
        this.setState({
          fornecedores: fornecedores,
          receivedDataConfirmation: this.state.receivedDataConfirmation + 1,
        });
      })
      .catch((error) => {
        console.error(error);
      });

      /*console.log(this.state.receivedDataConfirmation);
      if( this.state.receivedDataConfirmation === 2){
       // console.log(usuario);
        console.log(position);
        console.log(region);
        console.log(fornecedores);

        this.setState({
          //usuario : usuario,
          position: position,
          region: region,
          fornecedores: fornecedores,
          loading: false,
        });
      }*/
    }

    _logout = () => {
      firebase.auth().signOut()
        .catch((error) => {
            console.error(error);
        });
    };

  _verificarZoom = region => {
    //console.log(region);
    let zoom = Math.round(Math.log(360 / region.longitudeDelta) / Math.LN2);
    //console.log(zoom);
    this.setState({
      zoomLevel: zoom,
    });
  };

  _irAoCardapio = fornecedorId => {
    console.log('_irAoCardapio do ' + fornecedorId);
    this.props.navigation.navigate('Cardapio', {fornecedorId: fornecedorId});
    console.log('nao foi');
  };

    render(){
     /* const { region } = this.props;
      console.log('Region = ' + region);*/
      /*const {region, position} = this.state;
      const fornecedoresMarkers = this.state.fornecedores;*/

      console.log(this.state.receivedDataConfirmation);

        return(
          <Container>
            {this.state.receivedDataConfirmation < 2 ? (
                <Loading/>
              ) :
              (
                <View style={styles.container}>
                  <MapView
                    style={styles.map}
                    initialRegion={this.state.region}
                    minZoomLevel={5}
                    maxZoomLevel={18}
                    ref={ref => {
                      this.map = ref;
                    }}
                    onRegionChange={region => (
                      this._verificarZoom(region)
                    )}>

                    {this.state.region &&(
                      <MapView.Marker
                        coordinate={ this.state.region }
                        title={'Você'}
                      />
                    )}

                    {this.state.fornecedores && this.state.zoomLevel >= 15 &&(
                      this.state.fornecedores.map(fornecedor => (
                        <MapView.Marker
                          coordinate={fornecedor.coords}
                          title={fornecedor.name + ' >'}
                          key={fornecedor.id}
                          pinColor='#f78f03'
                          /*image={markerPng}*/
                          onCalloutPress={() => (this._irAoCardapio(fornecedor.id))}
                        >
                          {/*<Callout key={fornecedor.id}>
                            <Text> isso é um absurdo</Text>
                            <Button ><Text>OLAA</Text></Button>
                          </Callout>*/}
                        </MapView.Marker>
                      ))
                    )}

                  </MapView>
                </View>
              )}
          </Container>
        );
    }
}

const Loading = () => (
  <View style={styles.container}>
    <Spinner/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    marginTop: 1.5,
    ...StyleSheet.absoluteFillObject,
  },
});

export default Principal;
