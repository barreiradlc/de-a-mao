/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import { Alert, TextInput, View } from 'react-native';
import { FormButtonError, FormButtonLabelError, FormErrorGroup, ErrorLabel, FormContainer, FormInput, FormButtonGroup, FormButton, FormButtonLabel, FormLabel, FormContainerScroll } from '../components/styled/Form';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api'
import { LoadingOverlay } from '../components/utils/Utils'
import AsyncStorage from '@react-native-community/async-storage';

function Cadastro({ navigation, route }) {

    const { edit = null } = route.params

    const ref_input = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();

    const [user, setUser] = useState({
        email: '',
        username:'',
        name:'',
        phone:''   
    })
    // const [user, setUser] = useState(route.params || {})
    const [error, setError] = useState([])
    const [showOverlay, setShowOverlay] = useState(false)

    useEffect(() => {
        // if(__DEV__){
        //     setUser({
        //         username: "Barreiro",
        //         email: "barreira266@hotmail.com",
        //         name: "Arnaldo",
        //         phone: "61995115261",
        //     })
        // }

        if(edit){
            getUser()

            console.log(edit)

            navigation.setOptions({
                title: edit ? 'Editar perfil' : 'Cadastro'
            })
        }

    }, [])

    async function getUser(){
        const u = await AsyncStorage.getItem("@user")

        console.log({u})

        setUser(JSON.parse(u))
    }

    async function handeLogin() {
        if(!user.email){
            return Alert.alert('Erro', "É necessário preencher o email para continuar")
        }

        setShowOverlay(true)
    
        console.debug({user})                        

        if(edit){
            api.put('editUser', { user }).then(res => {
                console.log("EDIT")
                const { data } = res
                
                console.debug({data})                        
                
                if (!data.user || !data.user._id) {
                    Alert.alert('Erro',"Houve algum erro ao editar seu perfil")
                    console.log('Não editado')
                    return;
                }
                
                handleSaveUser(data.user)
                return navigation.goBack()
            }).catch(e => console.debug(e));
            console.log("EDIT")
        } else {
            handleValidate()
            .then(( errors ) => {
                    console.debug(errors)
    
                    console.debug({errors})
                    if (errors.length > 0) {
                        setError(errors)
                        return Alert.alert('Ooooops!', "Não foi possivel fetuar seu cadastro \nConfira os erros a seguir")
                    }
        
                    console.log({user})
        
                        
                            api.post('register', { user }).then(res => {
                                const { data } = res
                                
                                console.debug({data})                        
                    
                                if (!data.user._id) {
                                    Alert.alert('Erro',"Houve algum erro ao cadastrar seu usuário")
                                    console.log('Não cadastrado')
                                    return;
                                }
            
                                handleSaveUser(data)
                                navigation.navigate('Mapa')        
                            })
                        
                })
        }            
        setShowOverlay(false)
    }

    function handleGetUserName(username) {
        return api.post('username', { username }).then(res => res.data._id)
    }

    function handleGetEmail(email) {
        return api.post('email', { email }).then(res => res.data._id )
    }

    function handleGetPhone(phone) {
        return api.post('phone', { phone }).then(res => res.data._id )
    }

    async function handleValidate() {
        let errors = []

        if (user.username) {
            let { username } = user
            username = username.trim()
            const valid = await handleGetUserName(username)

            console.debug({ username: valid })
            if (valid) {
                await errors.push({ message: "Usuário já cadastrado" })
            }
        }
        
        if (user.phone) {
            let { phone } = user
            phone = await `+55${phone.trim()}`
            const valid = await handleGetPhone(phone)
            
            console.debug({ phone: valid })
            if (valid) {
                await errors.push({ message: "Telefone já cadastrado" })
            }
        }
        
        if (user.email) {
            let { email } = user
            email = await email.trim()
            
            const valid = await handleGetEmail(email)
            console.debug({ email: valid })
            if (valid) {
                await errors.push({ message: "Email já cadastrado" })
            }
        }



        return await errors
    }

    async function handleSaveUser(value) {
        try {
            await AsyncStorage.setItem('@user', JSON.stringify(value))
        } catch (e) {
            console.error(`Não foi possível salvar as preferências do usuário: ${e}`)
            // saving error
        }
    }

    function handleChangeInput(event, attr) {
        setUser({ ...user, [attr]: event.nativeEvent.text })
    }

    return (

        <FormContainer>

            {showOverlay &&
                <LoadingOverlay />
            }            

            <FormInput
                autoFocus
                autoCapitalize="none"
                autoCorrect={false}
                onChange={(e) => handleChangeInput(e, 'username')}
                placeholder='Usuário'
                value={user.username}
                onSubmitEditing={() => { ref_input.current.focus() }}
            />

            <FormInput
                autoCapitalize="none"
                onChange={(e) => handleChangeInput(e, 'email')}
                placeholder='Email'
                value={user.email}
                ref={ref_input}
                onSubmitEditing={() => { ref_input2.current.focus() }}
            />

            <FormInput
                onChange={(e) => handleChangeInput(e, 'name')}
                placeholder='Nome'
                value={user.name}
                onSubmitEditing={() => { ref_input3.current.focus() }}
                ref={ref_input2}
            />

            <FormInput
                onChange={(e) => handleChangeInput(e, 'phone')}
                placeholder='Telefone com DDD (Apenas números)'
                value={user.phone}
                ref={ref_input3}
            />

            <FormButtonGroup>

                <FormButton onPress={handeLogin} active={true} flat={showOverlay}>
                    <FormButtonLabel active={true}>{edit ? 'Editar perfil' : 'Cadastrar'}</FormButtonLabel>
                </FormButton>

            </FormButtonGroup>
            {error.length !== 0 && (
                <>
                    <FormErrorGroup>
                        <FormButtonError onPress={() => setError([])}>
                            <Icon name="times" size={20} />
                        </FormButtonError>
                        {error.map((e) =>
                            <ErrorLabel>{e.message}</ErrorLabel>
                        )}
                    </FormErrorGroup>
                </>
            )}

        </FormContainer>
    );
}


export default Cadastro