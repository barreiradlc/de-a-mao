import React, {useEffect, useState, useContext} from 'react'
import AsyncStorage from '@react-native-community/async-storage';
import { Alert, Button, TouchableWithoutFeedback, Text, ScrollView } from 'react-native';
import { useIsDrawerOpen } from '@react-navigation/drawer';


import { DrawerContainer } from '../styled/Geral'
import DrawerItem from './DrawerItem'

function ContentDrawer({navigation, route}){
  
    const isDrawerOpen = useIsDrawerOpen();

    const [ user , setUser ] = useState({
      fullName: ''
    })
  
    const  getUser = async() => {
      let u = await AsyncStorage.getItem('@user');
      console.log(u)
      if(u){
        setUser(JSON.parse(u))
      }
    }
  
    useEffect(() => {
      getUser()
    }, [isDrawerOpen])

    useEffect(() => {
      
      console.debug({user})
      
      getUser()
      console.debug({user})
    }, [])

    function handleSair(){
      Alert.alert(
        'Atenção',
        'Deseja mesmo sair?',
        [
          {
            text: 'NÃO',
            onPress: () => navigation.closeDrawer(),
            style: 'cancel',
          },
          {text: 'SIM', onPress: () => handleLogout()
        },
      ],
      {cancelable: false},
      );
    }

    async function handleLogout(){      
      await AsyncStorage.removeItem('@user')      
      console.log({navigation})
      navigation.navigate('Login')
    }
    
    async function handleMapa(){              
      navigation.navigate('Mapa')
    }
    
    function handleSoon(){
      Alert.alert(
        'A implementar...',
        'Aguarde vindouras atualizações',
        [
          {text: 'OK', onPress: () => console.log('Nada a fazer')
        },
      ],
      {cancelable: false},
      );
    }

    function handleNewAlert(){      
      navigation.navigate('FormAlerta', {
        edit: false
      })
    }

    function handleEditPerfil(){      
      navigation.navigate('Cadastro', {edit:true} )
    }
    
    return (
      <ScrollView>
        <DrawerItem bg label={`Bem vindo(a) ${user.name}\n \n${user.email}`} handleFunction={() =>  console.log('nada')}  />        
        <DrawerItem label='Home' icon='home' handleFunction={handleMapa} />
        <DrawerItem label='Perfil' icon='user-circle' handleFunction={handleEditPerfil} />
        <DrawerItem label='Novo Alerta' icon='plus' handleFunction={handleNewAlert} />

        <DrawerContainer />

        <DrawerItem label='Sair' icon='power-off' handleFunction={handleSair} />

      </ScrollView>
    )
  }


  export default ContentDrawer