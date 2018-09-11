import React, { Component } from 'react';
import { StyleSheet, View, Image} from 'react-native';
import { Container, Header, Left, Body, Right, Title, Content, Button, Text} from 'native-base';

import firebase from 'react-native-firebase';
import MapView from 'react-native-maps';

import markerPng from '../../images/marker.png';



class Principal extends Component{

    static navigationOptions = {
      header: (
        <Header style={ {'backgroundColor' : '#f78f03'}} androidStatusBarColor={'#BF6B03'}>
            <Left/>
            <Body>
            <Title>Principal</Title>
            </Body>
            <Right />
        </Header>
      )
    };

    constructor() {
      super();
      this.state = {
          usuario : '',
          fornecedores: [],
      };
    }

    componentWillMount(){
      this.setState({
          usuario : firebase.auth().currentUser
      });
      navigator.geolocation.getCurrentPosition(
        ({coords}) => {
          const {latitude, longitude} = coords;

          this.setState({
            position: {
              latitude,
              longitude,
            },
            region: {
              latitude,
              longitude,
              latitudeDelta: 0.0022,
              longitudeDelta: 0.0021,
            },
          })
        },
        (error) => alert(JSON.stringify(error)),
        {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
      )
    }

    componentDidMount(){
      firebase.firestore().collection('fornecedores').get().then((querySnapshot) => {
        const fornecedores = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());

          const {name, coords} = doc.data();

          fornecedores.push({
            key: doc.id,
            name: name,
            coords: coords,
          });


        }
        );

        this.setState({
          fornecedores: fornecedores,
        });}).catch((error) => {
        console.error(error);
      });

    }

    _logout = () => {
      firebase.auth().signOut()
        .catch((error) => {
            console.error(error);
        });
    };

    render(){
     /* const { region } = this.props;
      console.log('Region = ' + region);*/
      const {region, position} = this.state;
      const fornecedoresMarkers = this.state.fornecedores;

        return(
          <Container>
            <View style={styles.container}>
              {this.state.loading ? (
                <Loading />
              ) : (

                <MapView
                  style={styles.map}
                  region={region}
                >

                  {region && (
                    <MapView.Marker
                      coordinate={ region }
                      title={'Você'}
                    />
                  )}

                  {fornecedoresMarkers && (
                    fornecedoresMarkers.map(fornecedor => (
                      <MapView.Marker
                        coordinate={fornecedor.coords}
                        title={fornecedor.name}
                        key={fornecedor.id}
                        image={markerPng}
                      />
                    ))
                  )}

                </MapView>
              )}
            </View>
          </Container>
        );
    }
}

const Loading = () => (
  <View style={styles.container}>
    <Text>Loading...</Text>
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
