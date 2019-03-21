 
 

import React, {Component} from 'react';
import {AsyncStorage,Platform, StyleSheet, Text, View,ScrollView,Alert,Button,TextInput,TouchableHighlight,Image,TouchableOpacity} from 'react-native';
import SQLite from 'react-native-sqlite-2';
const db = SQLite.openDatabase({name: 'yoklama.db', location: 'default'});

let dizi=[];
type Props = {};
export default class ServisListe extends Component<Props> {
  constructor(){
      super();
      this.state={oListe:[],sId:'',gListe:[]}
      this.getServisId();
  }
   geldi = refName =>  {
    //Alert.alert(refName.toString());
     //this[refName].style.right = '-90px';
      this[refName].setNativeProps({
    display:'none'
      });
  }
  gelmedi = refName =>  {
    //Alert.alert(refName.toString());
     //this[refName].style.right = '-90px';
      this[refName].setNativeProps({
    opacity:0.2,
    backgroundColor:'gray'
      });
  }
  gelmediListe=(key,ad,soyad)=>{
    dizi.push({ad:ad+"  "+soyad});
    //Alert.alert(ad+" "+soyad);
    this.gelmedi(key);
  }
  bitir=()=>{ let a='';for (var i = 0; i <dizi.length; i++) {
   //Alert.alert(dizi[i].ad);
   a+=dizi[i].ad;
  } //Alert.alert(a); 
  dizi=[];

Alert.alert(
  'İşlem Tamalandı',
  'Servis İşlemi Tamamlandı',
  [
    {
      text: 'Cancel',
      onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    {text: 'OK', onPress: ()=>{this.props.navigation.navigate('Liste')}},
  ],
  {cancelable: false},
);
}


    getServisId =  () => {
  
   AsyncStorage.getItem('s_id').then((value) => {this.setState({sId:value});this.ogrenciListe();});
}

ogrenciListe=()=>{
   let deger=[];
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM ogrenci where sId=?', [this.state.sId], (tx, results) => {
          for (let i = 0; i < results.rows.length; i++) {
            let row = results.rows.item(i);
            deger.push({oId:row.oId,oAd:row.oAd,oSoyad:row.oSoyad});
          }
          this.setState({oListe:deger});
        });
    });
}
  render() {
    return (
      <View style={styles.container}>
      <View style={{flex:8,backgroundColor:"white",textAlign: 'center', justifyContent: 'flex-start',flexDirection:'column'}}>
         <ScrollView>
          <View style={{justifiyContent:'space-between',flexDirection:'column'}}>
          {this.state.oListe.map((item, key)=>{ return(
           <View key={key} style={{margin:10,backgroundColor:'pink',justifyContent:'space-between',flexDirection:'column'}} ref={ref => { this[key] = ref }} >
              <View style={{flex:1}}><Text style={{textAlign:'center',fontSize: 30,fontWeight: 'bold',}}>{item.oAd}  {item.oSoyad}</Text></View>
              <View style={{margin:15,justifyContent:'space-around',flexDirection:'row'}}>
              <TouchableOpacity
              style={{alignItems: 'center',backgroundColor: 'red',width:80,height:40,justifyContent:'center'}}
              onPress={this.gelmediListe.bind(this,key,item.oAd,item.oSoyad)}>
                <Text style={{color:'white',textAlign: 'center',}}>GELMEDİ</Text>
              </TouchableOpacity>

             <TouchableOpacity
              style={{alignItems: 'center',backgroundColor: 'green',width:80,height:40,justifyContent:'center'}}
              onPress={this.geldi.bind(this,key)}>
                <Text style={{color:'white',textAlign: 'center',}}>GELDİ</Text>
              </TouchableOpacity>
              </View>
           </View>
           )})}
         </View>
         </ScrollView>
         </View>
         <View style={{justifyContent: 'center',flexDirection:'row',alignItems: 'flex-end',backgroundColor:'white',}}>
          <Text style={{textAlign: 'center',width:'100%', marginRight:5,fontSize: 50,fontWeight: 'bold'}} onPress={this.bitir}>BİTİR</Text>
         </View>
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
});

        