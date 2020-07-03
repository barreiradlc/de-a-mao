/* eslint-disable prettier/prettier */
import React, { useState, useRef } from 'react';
import { Alert, Button, TextInput, View } from 'react-native';
import { FormContainer, FormInput, FormButtonGroup, FormButton, FormButtonLabel } from '../components/styled/Form';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api'
import { CenterLoadingOverlay, mailValidate, LoadingOverlay } from '../components/utils/Utils'
import AsyncStorage from '@react-native-community/async-storage';

function Home({ navigation }) {

    const ref_input = useRef();

    const [user, setUser] = useState('')
    const [showOverlay, setShowOverlay] = useState(false)
    
    function handleCadastro(){
                
        const validEmail = mailValidate(user)
        if(validEmail){
            return navigation.navigate('Cadastro', {email: user})
        }
        return navigation.navigate('Cadastro', {username: user})                
    }

    function handeLogin() {
        if(user === ''){
           return ref_input.current.focus()
        } 

        
        setShowOverlay(true)
        
        api.post('auth', {email: user.trim().toLowerCase()}).then(res => {
            
            const {data} = res
            console.debug({data})
            setShowOverlay(false)
            
            if(!data._id){
                return Alert.alert(
                    'Usuário ou senha não encontrados!', 
                    "Gostaria de se cadastrar?",
                    [
                        {
                            text: 'NÃO',
                            onPress: () => ref_input.current.focus(),
                            style: 'cancel',
                        },
                        {text: 'SIM', onPress: () => handleCadastro()}
                    ],
                    {cancelable: false},
                );                                
            }

            handleSaveUser(data)
            console.debug(navigation)
            navigation.replace('Mapa')

        })
        
    }

    async function handleSaveUser(value) {        
        try {
          await AsyncStorage.setItem('@user', JSON.stringify(value))

            console.log(value)

        } catch (e) {
        console.error(`Não foi possível salvar as preferências do usuário: ${e}`)
          // saving error
        }
    }

    function handleChangeInput(event){            
        setUser(event.nativeEvent.text)
    }

    return (
        <FormContainer>

            {showOverlay && 
                <LoadingOverlay />
            }

            <Icon name="handshake-o" size={60} color="#555" style={{ marginBottom: 50 }}/>

            <FormInput
                autoCapitalize="none"
                // onChange={(event) => { setUser(event.nativeEvent.text.toLowerCase()) }}
                onChange={handleChangeInput}
                placeholder='Preencha com seu usuário ou email'
                value={user}
                ref={ref_input}
            />

            <FormButtonGroup>

                <FormButton onPress={handeLogin} active={true} flat={showOverlay}>
                    <FormButtonLabel active={true}>Entrar</FormButtonLabel>
                </FormButton>

            </FormButtonGroup>

        </FormContainer>
    );
}


export default Home