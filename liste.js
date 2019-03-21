 
 

import React, {Component} from 'react';
import {BackHandler,AsyncStorage,Platform, StyleSheet, Text, View,ScrollView,Alert,Button,TextInput,TouchableHighlight,Image,TouchableOpacity} from 'react-native';
import SQLite from 'react-native-sqlite-2';
const db = SQLite.openDatabase({name: 'yoklama.db', location: 'default'});

export default class Liste extends Component<Props> {
  constructor(){
      super();
      this.state={sListe:[]}
      this.servisListesi();
    }

  servisId = (id) => {
  AsyncStorage.setItem('s_id', id.toString());
  this.props.navigation.navigate('ServisListe');
}
servisListesi=()=>{
   let deger=[];
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM servis', [], (tx, results) => {
          for (let i = 0; i < results.rows.length; i++) {
            let row = results.rows.item(i);
            deger.push({sId:row.sId,sAd:row.sAd});
          }
          this.setState({sListe:deger});
        });
    });
}

  render() {
    return (
      <View style={styles.container}>
      <View style={{marginBottom:30,backgroundColor:'gray',}}>
        <TouchableOpacity
            style={{justifyContent: 'center',flexDirection:'row',alignItems: 'center',backgroundColor:'red',}}
               onPress={this.servisListesi}>
                <Text style={{color:'white',textAlign: 'center',fontSize:30}}>YENİLE</Text>
              </TouchableOpacity>
      </View>
      <View style={{flex:8,backgroundColor:"gray",textAlign: 'center', justifyContent: 'flex-start',flexDirection:'column'}}>
         <ScrollView>
          <View style={{justifiyContent:'space-between',flexDirection:'column'}}>
           {this.state.sListe.map((item, key)=>{ return(
           <View key={key} style={{margin:10,height:50,backgroundColor:'white',justifiyContent:'space-between',flexDirection:'row'}}>
              <Text style={{flex:1,alignSelf:'center',marginLeft:5,fontSize: 20,fontWeight: 'bold',}}>{item.sAd}</Text>
              <TouchableOpacity
              style={{alignItems: 'center',backgroundColor: 'green',width:80,justifyContent:'center'}}
              onPress={this.servisId.bind(this,item.sId)}>
                <Text style={{color:'white',fontSize:20}}> > </Text>
              </TouchableOpacity>
           </View>
           )})}
         </View>
         </ScrollView>
         </View>
                 <View style={{justifyContent: 'center',flexDirection:'row',alignItems: 'center',backgroundColor:'white',}}>
        <Text style={{textAlign: 'center',width:'100%', marginRight:5,fontSize: 50,fontWeight: 'bold'}} onPress={()=>{this.props.navigation.navigate('ServisIslemleri')}}>{'+'}</Text></View>
      
      </View>


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
    backgroundColor: 'gray',
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

        