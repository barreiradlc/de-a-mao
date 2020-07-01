/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import { TouchableOpacity, ScrollView, ActivityIndicator,Alert,Text, StyleSheet, Button, TextInput, View, PermissionsAndroid } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import api from '../services/api'
import { LoadingOverlay } from '../components/utils/Utils'
import {NavigationContainer, useNavigation} from '@react-navigation/native';

function Mapa() {

  const iconsize = 50
  
  const ALL_NEEDS = [
    "MANTIMENTOS",
    "HIGIENE",
    "COMPRAS"
  ]
  
  const ALL_NEEDS_ENUM = [
    {value:"MANTIMENTOS", label :"Mantimentos em geral"},
    {value:"HIGIENE", label:'Produtos de higiene'},
    {value:"COMPRAS", label:'Auxílio em compras'}
  ]
  const navigation = useNavigation()
  
  console.log({navigation})

  
  console.log(navigation)

  
  function handleOpenDrawer(){
    navigation.openDrawer()
  }

  const [showOverlay, setShowOverlay] = React.useState(true)
  const [position, setPosition] = React.useState()
  const [user, setUser] = React.useState()
  const [needSelected, setNeedSelected] = React.useState(ALL_NEEDS)
  const [alerts, setAlerts] = React.useState([])
  
  React.useEffect(() => {
    init()
  }, [])
  
  React.useEffect(() => {
    if(position){
      getAlerts()
    }
  }, [position])

  React.useEffect(() => {
    if(position){
      getAlerts()
    }
  }, [needSelected])

  
  async function requestPermission (){
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Permissão de localização necessária",
          message:
            "Precisamos de sua localização para ter acesso à sua região",
          buttonNeutral: "Pergunte depois",
          buttonNegative: "Cancelar",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("Permissão concedida");        
      } else {

        console.log("Permisssão negada");
        return;
      }
        
      Geolocation.getCurrentPosition(info => {setPosition(info.coords)});
      
      // setPosition({
      //   latitude: a.coords.latitude,
      //   longitude: a.longitude,
      // })                  
          
    } catch (err) {
      console.warn(err);
    }    
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  function init() {
    navigation.setOptions({   
      title:"",
      headerLeft: () => null,
      headerRight: () => (
        <TouchableOpacity style={{ paddingHorizontal: 20 }}
          onPress={ handleOpenDrawer }
        >
          <Icon name="bars" size={25} />
        </TouchableOpacity>
      )
    })
    requestPermission()
      .then(( ) => {
        getAlerts()
      })
    getUser()    
  }

  function getAlerts(){
    console.log({position})

    api.get(`alerts?latitude=${position.latitude}&longitude=${position.longitude}&needs=${needSelected.length > 0 ? needSelected : ALL_NEEDS}`, { user }).then(res => {

      console.log(res.data)
      setShowOverlay(false)
      setAlerts(res.data)  
      navigation.setOptions({
        title: `${res.data.length} Alertas ao seu alcance` 
      })
    })
  }

  async function getUser(){
    const u = await AsyncStorage.getItem("@user")
    setUser(JSON.parse(u.user.name))

    
  }

    function handleSelectItem(item){
        return needSelected.filter(n => n === item)[0]       
    }

  function ItemNecessidade({necessidade, icone, pkg, msg}){
    
    const [ load, setLoad ] = React.useState(true)
    
    const select = handleSelectItem(necessidade)
    
    return (      
        <TouchableOpacity style={[ styles.item, select ? styles.selectedItem : {} ]} onPress={() => handleSetCategoria(necessidade)}>
          
          {pkg == "fa" &&
            <Icon name={icone} size={iconsize} style={select ? styles.selectedIcon : styles.icon}/>
          }

          {pkg == "mi" &&
            <MaterialIcon name={icone} size={iconsize} style={select ? styles.selectedIcon : styles.icon}/>
          }
            <Text style={styles.itemTitle}>{msg}</Text>
          
        </TouchableOpacity>      
    )  
  }

  function handleTap(e){
    console.log(e)
  }

  async function handleSetCategoria(cat){
    setNeedSelected([])
    // console.log('------------------------ INICIO', cat)
    
    let needSelectedAtual = needSelected.filter( n => n === cat )
        
    console.log({needSelectedAtual})

    if(needSelectedAtual.length !== 0){
      const filtered = needSelected.filter(( n ) => n !== cat )

      setNeedSelected(filtered)
      
    } else {
      setNeedSelected([...needSelected, cat])
      
      // needs.push(cat)      
    }
    
    // console.log('---------------------- FIM')
    // console.log({needs})
    
    
  }

  function handleGetParsedNeeds(item){
    console.log({item})

    return item.join(', ')
  }

  if(!position){    
    return null
  }

  function handleOpenDrawer(){

    console.log('DRAWER')
    console.log(navigation)
    console.log('DRAWER')

    navigation.openDrawer()
  }

  function  handleGoToDetails(e){
    console.debug('e')
    console.debug({e})
    console.debug('e')

    navigation.navigate('Alerta', e)
  }

  return (
    <View style={styles.container}>
      
      <View style={styles.mapContainer}>
        {position ?
          <MapView 
            style={styles.map}           
            showsMyLocationButton={false}
            showsIndoors={false}
            initialRegion={{
              longitude: position.longitude,
              longitudeDelta: 0.014,
              latitude: position.latitude,
              latitudeDelta: 0.014,
            }}
          >            

            {alerts.map(( a ) =>
              <Marker
                key={String(a._id)}
                style={styles.mapMarker}
                onPress={handleTap}
                coordinate={{
                  latitude: a.location.coordinates[1],
                  longitude: a.location.coordinates[0],
                }}
                >
              <View style={styles.mapMarkerContainer} >
                <Icon name="handshake-o" size={25} color="#fff" style={{ marginVertical: 15 }}/>
                </View>

              <Callout
                onPress={() => handleGoToDetails(a)}
              >
                <View style={styles.callout}>
                  <Text style={styles.devName}>{a.title}</Text>
                  <Text style={styles.devBio}>{a.description}</Text>
                  {a.needs.map(( n ) =>
                    <Text style={styles.devTechs}>{ALL_NEEDS_ENUM.filter( a => a.value === n )[0].label}</Text>                    
                  )}
                </View>
              </Callout>

              </Marker>
            )}
          </MapView>
          :
          <ActivityIndicator />
        }
      </View>
      <View style={styles.itemsContainer}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
        >        

          <ItemNecessidade necessidade="COMPRAS" icone='shopping-basket' pkg="fa"  msg="Compras" />

          <ItemNecessidade necessidade="HIGIENE" icone='shower' pkg="fa"  msg="Higiene" />

          <ItemNecessidade necessidade="MANTIMENTOS" icone='fridge' pkg="mi"  msg="Mantimentos" />
          
        </ScrollView>
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 20,    // fontFamily: 'Ubuntu_700Bold',
    marginTop: 24,
    color: '#555',
  },
  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 4,
    // fontFamily: 'Roboto_400Regular',
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 16,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  mapMarker: {
    width: 90,
    height: 80,
  },
  mapMarkerContainer: {    
    borderWidth: 2,
    borderColor:'#fff',
    backgroundColor: '#555',
    flexDirection: 'column',
    borderRadius: 8,
    overflow: 'hidden',
    alignItems: 'center',
  },

  mapMarkerImage: {
    width: 90,
    height: 45,
    resizeMode: 'cover',
  },
  mapMarkerTitle: {        
    // flex: 2,
    // fontFamily: 'Roboto_400Regular',
    color: '#fff',
    fontSize: 10,
    lineHeight: 23,
  },
  itemsContainer: {
    flexDirection: 'row',
    marginTop: 16,
    marginBottom: 32,
  },
  item: {
    margin: 10,
    // borderWidth: 2,
    borderRadius: 8,    
    padding: 15,
    justifyContent: 'center',    
    textAlign: 'center',
    backgroundColor: "#dedede",
    elevation: 1
  },  
  selectedItem: {    
    // borderWidth: 2,
    backgroundColor:'#fff',
    borderColor: '#000',
    elevation: 5,
  },
  
  itemTitle: {
    // fontFamily: 'Roboto_400Regular',
    alignSelf: 'center',    
    textAlign: 'center',
    fontSize: 13,
    color: '#555'
  },
  icon:{
    margin: 5,
    padding: 15,
    alignSelf: 'center',    
    color: '#555'
  },
  selectedIcon:{
    margin: 5,
    padding: 15,
    alignSelf: 'center',  
    color: '#000'
  },
  callout: {
    width: 260,
  },
  devName: {
    fontWeight: 'bold',
    fontSize: 16,
  },

  devBio: {
    color: '#666',
    marginTop: 5,
  },

  devTechs: {
    marginTop: 5,
  },

});


export default Mapa