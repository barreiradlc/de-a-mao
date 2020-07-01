/* eslint-disable react-native/no-inline-styles */
import * as React from 'react';
import { TouchableOpacity } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContentDrawer from './components/partial/ContentDrawer'
import AsyncStorage from '@react-native-community/async-storage';

// telas
import Home from './Pages/Home';
import DetalhesAlerta from './Pages/Detalhes';
import Mapa from './Pages/Mapa';
import Cadastro from './Pages/Cadastro';
import FormAlerta from './Pages/FormAlerta';

// NAVIGATORS
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function Routes(props) {
  
  
  const [user, setUser] = React.useState()
  const [loading, setLoading] = React.useState(true)
  
  React.useEffect(() => {
    getUser() 
  }, [])
  
  async function getUser(){
    const u = await AsyncStorage.getItem("@user")
    setLoading(false)
    
    if(u){
      setUser(JSON.parse(u))
    }
  }
  
  if(loading){
    return null
  }
  
  console.debug({user})
  
  const homePage = user !== null ? "Mapa" : "Login"
  
  return (
    <Stack.Navigator initialRouteName={homePage}>
        <Stack.Screen name="Login" component={Home} options={{ headerShown: false }} />        
        <Stack.Screen name="Cadastro" component={Cadastro} />
        <Stack.Screen name="Mapa" component={Mapa} />
        <Stack.Screen name="FormAlerta" component={FormAlerta} />
        <Stack.Screen name="Alerta" component={DetalhesAlerta} />
        <Stack.Screen name="Drawer" component={RoutesDrawer} />        
      </Stack.Navigator>   
  );
}

function HomeRutes() {
  return (    
    <Stack.Navigator>        
        <Stack.Screen name="Home" component={Mapa} />
      </Stack.Navigator>
  );
}

export default function RoutesDrawer(props) {
  
  // const navigation = useNavigation()
  
  // function handleOpenDrawer(){
    
    //   console.log('DRAWER')
    //   console.log(navigation)
  //   console.log('DRAWER')

  //   navigation.openDrawer()
  // }

  // navigation.setOptions({      
  //   title: 'Bem Vindo',
  //   headerRight: () => (
  //     <TouchableOpacity style={{ paddingHorizontal: 20 }}
  //       onPress={ handleOpenDrawer }
  //     >
  //       <Icon name="bars" size={25} />
  //     </TouchableOpacity>
  //   )
  // })

  return (    
    <NavigationContainer>
      <Drawer.Navigator 
        drawerLockMode='locked-open'        
        drawerPosition="right" 
        gestureHandlerProps={false}
        swipeEnabled={false}
        edgeWidth={0}
        drawerStyle={{
          backgroundColor: '#fff',
          width: 240,
        }}
        drawerContent={props =>  <ContentDrawer {...props} />}>
        <Drawer.Screen name="Home" component={() => Routes(props)} />        
      </Drawer.Navigator>    
    </NavigationContainer>
  );
} 
