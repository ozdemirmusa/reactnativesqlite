/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 * @lint-ignore-every XPLATJSCOPYRIGHT1
 */

import React, {Component} from 'react';
import {Platform,AsyncStorage, StyleSheet, Text, View,ScrollView,Alert,Button,TextInput,TouchableHighlight,Image,TouchableOpacity} from 'react-native';
import TextInputMask from 'react-native-text-input-mask';
import SQLite from 'react-native-sqlite-2';
const db = SQLite.openDatabase({name: 'yoklama.db', location: 'default'});


type Props = {};
export default class OgrenciIslemleri extends Component<Props> {
  constructor(){
      super()
      this.state=({sId:'',sAd:'',oAd:'',oSoyad:'',vAd:'',vTel:'',oListe:[]});
      this.getValueLocally();   
  }
   getValueLocally =  () => {
  
   AsyncStorage.getItem('ad').then((value) => this.setState({sAd:value}));
   AsyncStorage.getItem('id').then((value) => {this.setState({sId:value});this.ogrenciListe();});
}
  ogrenciEkle=(oAd,oSoyad,vAd,vTel)=>{
    db.transaction((tx) => {
    //tx.executeSql('DELETE FROM  servis ',[]);
      tx.executeSql('CREATE TABLE IF NOT EXISTS ogrenci(oId INTEGER PRIMARY KEY NOT NULL,sId INTEGER , oAd VARCHAR(30), oSoyad VARCHAR(30), vAd VARCHAR(30), vTel VARCHAR(18))', []);
      tx.executeSql('INSERT INTO ogrenci(sId,oAd,oSoyad,vAd,vTel) VALUES (?,?,?,?,?)', [this.state.sId,oAd.toUpperCase(),oSoyad.toUpperCase(),vAd.toUpperCase(),vTel]);
      this.ogrenciListe();
    });

  }
  ogrenciKontrol=()=>{
     const {sId,oAd,oSoyad,vAd,vTel}  = this.state ;
     
    if (oAd.length>0 && oSoyad.length>0 && vAd.length>0 && vTel.length==18) {
      let sonuc=0;
  db.transaction(tx => {
      tx.executeSql('CREATE TABLE IF NOT EXISTS ogrenci(oId INTEGER PRIMARY KEY NOT NULL,sId INTEGER , oAd VARCHAR(30), oSoyad VARCHAR(30), vAd VARCHAR(30), vTel VARCHAR(18))', []);
      tx.executeSql("SELECT * FROM ogrenci WHERE sId=:sId  AND oAd=:oAd AND oSoyad=:oSoyad", [sId,oAd.toUpperCase(),oSoyad.toUpperCase()], (tx, results) => {
            sonuc=results.rows.length;
            //Alert.alert(results.rows.length.toString());
          if (sonuc<1) {this.ogrenciEkle(oAd,oSoyad,vAd,vTel);this.setState({oAd:'',oSoyad:'',vAd:'',vTel:''});}
          else{Alert.alert("Bu Öğrenci Daha Önce Eklendi");}
        });

    });
    }
    else{
      Alert.alert("Lütfen Alanları Doldurunuz");
    }
   

  }
ogrenciListe=()=>{
   let deger=[];
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM ogrenci where sId=? ORDER BY oId DESC', [this.state.sId], (tx, results) => {
          for (let i = 0; i < results.rows.length; i++) {
            let row = results.rows.item(i);
            deger.push({oId:row.oId,oAd:row.oAd,oSoyad:row.oSoyad});
          }
          this.setState({oListe:deger});
        });
    });
}

  ogrenciSil=(id)=>{
   // Alert.alert(id.toString());
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM  ogrenci WHERE oId=:oId AND sId=:sId",[id,this.state.sId]);
      this.ogrenciListe();
      });
  }  
  render() {
    return (
      <View style={styles.container}>
      <View style={{height:200,backgroundColor:"white",textAlign: 'center', justifyContent: 'center',flexDirection:'column'}}>      
          <View style={{alignItems:'center',justifyContent: 'space-around',backgroundColor:'gray',flexDirection:'row'}}>
          <View style={{width:100,}}><Text>Servis Adı</Text></View>
          <View>
          <Text style={{textAlign: 'center',marginLeft:10,height: 40,width:200, borderColor: '#5e2129', borderWidth: 1}}>{this.state.sAd}</Text>
        </View>
        </View>
        <View style={{alignItems:'center',justifyContent: 'space-around',backgroundColor:'gray',flexDirection:'row'}}>
        <View style={{width:100,}}><Text>Öğrenci Adı</Text></View>
        <View>
          <TextInput
        style={{marginLeft:10,height: 40,width:200, borderColor: '#5e2129', borderWidth: 1}}
        onChangeText={(oAd) => this.setState({oAd})}
        value={this.state.oAd}
        />
        </View>
        </View>
        <View style={{alignItems:'center',justifyContent: 'space-around',backgroundColor:'gray',flexDirection:'row'}}>
        <View style={{width:100,}}><Text>Öğrenci Soyadı</Text></View>
         <TextInput
        style={{marginLeft:10,height: 40,width:200, borderColor: '#5e2129', borderWidth: 1}}
        onChangeText={(oSoyad) => this.setState({oSoyad})}
        value={this.state.oSoyad}
        />
        </View>
        <View style={{alignItems:'center',justifyContent: 'space-around',backgroundColor:'gray',flexDirection:'row'}}>
       <View style={{width:100}}><Text>Veli Adı</Text></View>
         <TextInput
        style={{marginLeft:10,height: 40,width:200, borderColor: '#5e2129', borderWidth: 1}}
        onChangeText={(vAd) => this.setState({vAd})}
        value={this.state.vAd} 
        />
        </View>
        <View style={{alignItems:'center',justifyContent: 'space-around',backgroundColor:'gray',flexDirection:'row'}}>
        <View style={{width:100,}}><Text>Veli Telefonu</Text></View>
         
        <TextInputMask
 style={{marginLeft:10,height: 40,width:200, borderColor: '#5e2129', borderWidth: 1}}
  refInput={ref => { this.input = ref }}
  onChangeText={(vTel) =>this.setState({vTel})}
keyboardType = 'phone-pad'
value={this.state.vTel} 
  mask={"+9 ([000]) [000] [00] [00]"}
/>
        </View>
      </View>
      <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
         <TouchableOpacity
              style={{backgroundColor:'green',width:'100%'}}
              onPress={this.ogrenciKontrol}>
                <Text style={{textAlign: 'center',width:'100%',fontSize: 40,fontWeight: 'bold'}}>EKLE</Text>
              </TouchableOpacity>
        </View>
      <View style={{flex:8,backgroundColor:'#D3D3D3'}}>
        <ScrollView>
          <View style={{flexDirection:'column',justifyContent:'space-between'}}>
          {this.state.oListe.map((item, key)=>{ return(
            <View key={key} style={{margin:10,height:50,backgroundColor:'white',justifyContent:'space-between',flexDirection:'row'}}>
              <Text style={{alignSelf:'center',marginRight:5,fontSize: 20,fontWeight: 'bold',}}>{item.oAd}    {item.oSoyad}</Text>
                <TouchableOpacity
              style={{alignItems: 'center',backgroundColor: 'red',width:80,justifyContent:'center'}}
              onPress={this.ogrenciSil.bind(this,item.oId)}>
                <Text style={{color:'white',textAlign: 'center',}}>SİL</Text>
              </TouchableOpacity>
           </View>
            )})}
        </View>
        </ScrollView>
      </View>
        <View style={{justifyContent: 'center',flexDirection:'row',alignItems: 'center'}}>
        <Text style={{textAlign: 'center',width:'100%', marginRight:5,fontSize: 50,fontWeight: 'bold'}} onPress={()=>{this.props.navigation.navigate('ServisIslemleri')}}>{'<'}</Text></View>
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
