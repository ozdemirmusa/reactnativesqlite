/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View,ScrollView,Alert,Button} from 'react-native';
import {createStackNavigator} from 'react-navigation';
import Liste from './liste';
import ServisIslemleri from './ServisIslemleri';
import OgrenciIslemleri from './OgrenciIslemleri';
import ServisListe from './ServisListe';
/**
type Props = {};
export default class App extends Component<Props> {
  constructor(){
      super()
      
  }
  render() {
    return (
       <Liste />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    flexDirection:'column',
   alignItems: 'stretch',
    textAlign: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

**/
const App= createStackNavigator({
  Liste: {
    screen: Liste,
  },
  ServisIslemleri:{
    screen:ServisIslemleri,
  },
  OgrenciIslemleri:{
    screen:OgrenciIslemleri,
  },
  ServisListe:{screen:ServisListe,},
}, {
    initialRouteName: 'Liste',
headerMode:'none',
});
export default App;


