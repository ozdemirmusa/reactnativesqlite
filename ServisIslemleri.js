
import React, {Component} from 'react';
import {AsyncStorage,Platform, StyleSheet, Text, View,ScrollView,Alert,Button,TextInput,TouchableHighlight,Image,TouchableOpacity} from 'react-native';
import OgrenciIslemleri from './OgrenciIslemleri';
import SQLite from 'react-native-sqlite-2';
const db = SQLite.openDatabase({name: 'yoklama.db', location: 'default'});


type Props = {};
export default class ServisIslemleri extends Component<Props> {
  constructor(){
      super()
      this.state=({sAd:'',sListe:[]});
      //Alert.alert("ol");
      this.servisListe();
  }
  setValueLocally = () => {
  AsyncStorage.setItem('Key_27', '2');
}
  getValueLocally =  () => {
  
   AsyncStorage.getItem('Key_27').then((value) => Alert.alert(value.toString()));
}
servisEkle=(sAd)=>{ 
  db.transaction((tx) => {
    //tx.executeSql('DELETE FROM  servis ',[]);
      tx.executeSql('CREATE TABLE IF NOT EXISTS servis(sId INTEGER PRIMARY KEY NOT NULL, sAd VARCHAR(30))', []);
      tx.executeSql('INSERT INTO servis(sAd) VALUES (?)', [sAd.toUpperCase()]);
      this.servisListe();
    });
}
 servisKontrol=()=>{
  const sAd=this.state.sAd;
  if (sAd.length>0) {
        let sonuc=0;
  db.transaction(tx => {
      //tx.executeSql('CREATE TABLE IF NOT EXISTS servis(sId INTEGER PRIMARY KEY NOT NULL, sAd VARCHAR(30))', []);
      tx.executeSql("SELECT * FROM servis WHERE sAd=:ad ",[sAd.toUpperCase()], (tx, results) => {
            sonuc=results.rows.length;
          if (sonuc<1) {this.servisEkle(sAd);this.setState({sAd:''});}
          else{Alert.alert("Bu Servis Daha Önce Eklendi");}
        });
    });
}
else
{
  Alert.alert("Lütfen  Boş Bırakmayınız");
}
}
servisListe=()=>{
  let deger=[];
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM servis ORDER BY sId DESC', [], (tx, results) => {
          for (let i = 0; i < results.rows.length; i++) {
            let row = results.rows.item(i);
            deger.push({sId:row.sId,sAd:row.sAd});
          }
          this.setState({sListe:deger});
        });
    });
}
servisSil=(id)=>{
  this.ogrenciSil(id);
    db.transaction((tx) => {
      tx.executeSql('DELETE FROM  servis where sId=?',[id]);
      this.servisListe();
      });
}
ogrenciSil=(id)=>{
   // Alert.alert(id.toString());
    db.transaction((tx) => {
      tx.executeSql("DELETE FROM  ogrenci WHERE sId=:sId",[id]);
      });
  }

ogrenciYonlendir=(Ad,Id)=>{
  AsyncStorage.setItem('ad', Ad.toString());
  AsyncStorage.setItem('id', Id.toString());
  this.props.navigation.navigate('OgrenciIslemleri');

}
  render() {
    return (
      <View style={styles.container}>
      <View style={{height:120,backgroundColor:"white",textAlign: 'center', justifyContent: 'center',flexDirection:'column'}}>      
        <View style={{alignItems:'center',flex:2,justifyContent: 'center',backgroundColor:'gray',flexDirection:'row'}}>
        <Text>Servis Adı</Text>
         <TextInput
        style={{marginLeft:10,height: 40,width:200, borderColor: '#5e2129', borderWidth: 1}}
        onChangeText={(sAd) => this.setState({sAd})}
        value={this.state.sAd}
        />
        </View>
       <View style={{justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
         <TouchableOpacity
              style={{backgroundColor:'green',width:'100%'}}
              onPress={this.servisKontrol}>
                <Text style={{textAlign: 'center',width:'100%',fontSize: 40,fontWeight: 'bold'}}>EKLE</Text>
              </TouchableOpacity>
        </View>
      </View>
      <View style={{flex:8,backgroundColor:'#D3D3D3',paddingTop:15,paddingBottom:15,}}>
        <ScrollView>
          <View style={{flexDirection:'column',justifyContent:'space-between'}}>
          {this.state.sListe.map((item, key)=>{ return(
            <View key={key} style={{alignItems:'center',flexDirection:'row',justifyContent:'space-around',backgroundColor:'#FFF0F5',margin:5, }}>
               <View style={{flex:1}}><Text style={{fontSize: 20,fontWeight: 'bold',}}>{item.sAd}</Text></View>
               <View style={{margin:5,justifyContent:'center',flexDirection:'row'}}>
                <TouchableOpacity
              style={{alignItems: 'center',backgroundColor: 'red',width:80,height:40,justifyContent:'center'}}
              onPress={this.servisSil.bind(this,item.sId)}>
                <Text style={{color:'white',textAlign: 'center',}}>SERVİS SİL</Text>
              </TouchableOpacity>

               </View>
               <View  style={{margin:5,justifyContent:'space-around',flexDirection:'row'}}>
                <TouchableOpacity
              style={{alignItems: 'center',backgroundColor: 'green',width:80,height:40,justifyContent:'center'}}
              onPress={this.ogrenciYonlendir.bind(this,item.sAd,item.sId)}>
                <Text style={{color:'white',textAlign: 'center'}}>ÖĞRENCİ İŞLEMLERİ</Text>
              </TouchableOpacity>
               </View>
            </View>
            )})}
        </View>  
        </ScrollView>
      </View>
        <View style={{justifyContent: 'center',flexDirection:'row',alignItems: 'flex-end'}}>
        <Text style={{textAlign: 'center',width:'100%', marginRight:5,fontSize: 50,fontWeight: 'bold'}} onPress={()=>{this.props.navigation.navigate('Liste')}}>{'<'}</Text></View>
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
