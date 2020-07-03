/* eslint-disable prettier/prettier */
import React, { useState, useRef, useEffect } from 'react';
import { Alert, TextInput, View, TouchableOpacity, Text, StyleSheet, ScrollView } from 'react-native';
import { FormButtonError, FormButtonLabelError, FormErrorGroup, ErrorLabel, FormContainer, FormInput, FormButtonGroup, FormButton, FormButtonLabel, FormLabel, FormContainerScroll } from '../components/styled/Form';
import Icon from 'react-native-vector-icons/FontAwesome';
import api from '../services/api'
import { LoadingOverlay } from '../components/utils/Utils'
import AsyncStorage from '@react-native-community/async-storage';
import MaterialIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Geolocation from '@react-native-community/geolocation';

function FormAlerta({ navigation, route }) {



    const iconsize = 50

    const ALL_NEEDS = [
        "MANTIMENTOS",
        "HIGIENE",
        "COMPRAS"
    ]

    const ALL_NEEDS_ENUM = [
        { value: "MANTIMENTOS", label: "Mantimentos em geral" },
        { value: "HIGIENE", label: 'Produtos de higiene' },
        { value: "COMPRAS", label: 'Auxílio em compras' }
    ]

    const INITIAL_VALUES =
    {
        title: '',
        description: ''
    }


    const [edit, setEdit] = React.useState(route.params.edit)
    function handleOpenDrawer() {
        navigation.openDrawer()
    }

    navigation.setOptions({
        title: `${edit ? 'Editar' : 'Novo'} alerta`,
        headerLeft: () => null,
        headerRight: () => (
            <TouchableOpacity style={{ paddingHorizontal: 20 }}
                onPress={handleOpenDrawer}
            >
                <Icon name="bars" size={25} />
            </TouchableOpacity>
        )
    })


    function handleSelectItem(item) {
        return needSelected.filter(n => n === item)[0]
    }


    async function handleSetCategoria(cat) {
        setNeedSelected([])
        // console.log('------------------------ INICIO', cat)

        let needSelectedAtual = needSelected.filter(n => n === cat)

        console.log({ needSelectedAtual })

        if (needSelectedAtual.length !== 0) {
            const filtered = needSelected.filter((n) => n !== cat)

            setNeedSelected(filtered)

        } else {
            setNeedSelected([...needSelected, cat])

            // needs.push(cat)      
        }

        // console.log('---------------------- FIM')
        // console.log({needs})


    }


    function ItemNecessidade({ necessidade, icone, pkg, msg }) {

        const [load, setLoad] = React.useState(true)

        const select = handleSelectItem(necessidade)

        return (
            <TouchableOpacity style={[styles.item, select ? styles.selectedItem : {}]} onPress={() => handleSetCategoria(necessidade)}>

                {pkg == "fa" &&
                    <Icon name={icone} size={iconsize} style={select ? styles.selectedIcon : styles.icon} />
                }

                {pkg == "mi" &&
                    <MaterialIcon name={icone} size={iconsize} style={select ? styles.selectedIcon : styles.icon} />
                }
                <Text style={styles.itemTitle}>{msg}</Text>

            </TouchableOpacity>
        )
    }


    const ref_input = useRef();
    const ref_input2 = useRef();
    const ref_input3 = useRef();

    const [user, setUser] = useState(INITIAL_VALUES)
    const [needSelected, setNeedSelected] = React.useState([])
    const [position, setPosition] = React.useState()
    const [error, setError] = useState([])
    const [showOverlay, setShowOverlay] = useState(false)

    useEffect(() => {
        Geolocation.getCurrentPosition(info => { setPosition(info.coords) });
        // if (__DEV__) {
        //     setUser({
        //         username: "Barreiro",
        //         email: "barreira266@hotmail.com",
        //         name: "Arnaldo",
        //         phone: "61995115261",
        //     })
        // }

    }, [])

    useEffect(() => {
        if(route.params){
            const { data } = route.params
            if(data){
                setUser(data)
                setNeedSelected(data.needs)
                
            }
        }
    }, [route.params])

    async function handeSubmit() {
        const u = await AsyncStorage.getItem("@user")
        const user_id = JSON.parse(u)

        console.log({ user_id })

        let data = {
            _id: user._id && user._id,
            title: user.title,
            description: user.description,
            needs: needSelected,
            latitude: position.latitude,
            longitude: position.longitude,
            // user: user_id
        }

        // console.log({data})

        setShowOverlay(true)

        if (edit) {
            api.put('alerts', data, {
                headers: {
                    user_id: user_id._id
                }
            }).then(res => {
                console.log('res.data')
                console.log(res.data)
                if (res.data) {
                    return navigation.navigate('Mapa', { refresh: true })
                }
                Alert.alert('Erro', "Houve algum erro ao cadastrar o alerta")
            })
        } else {
            api.post('alerts', data, {
                headers: {
                    user_id: user_id._id
                }
            }).then(res => {
                console.log('res.data')
                console.log(res.data)
                if (res.data) {
                    return navigation.navigate('Mapa', { refresh: true })                
                }
                Alert.alert('Erro', "Houve algum erro ao cadastrar o alerta")
            })
        }

        setShowOverlay(false)
    }

    function handleGetUserName(username) {
        return api.post('username', { username }).then(res => res.data._id)
    }

    function handleGetEmail(email) {
        return api.post('email', { email }).then(res => res.data._id)
    }

    function handleGetPhone(phone) {
        return api.post('phone', { phone }).then(res => res.data._id)
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

        <View style={styles.container}>

            {showOverlay &&
                <LoadingOverlay />
            }

            <FormInput
                autoFocus


                onChange={(e) => handleChangeInput(e, 'title')}
                placeholder='Titulo'
                value={user.title}
                onSubmitEditing={() => { ref_input.current.focus() }}
            />

            <FormInput

                onChange={(e) => handleChangeInput(e, 'description')}
                placeholder='Descrição'
                multiline
                numberOfLines={4}
                value={user.description}
                ref={ref_input}
            // onSubmitEditing={() => { ref_input2.current.focus() }}
            />

            <Text style={{ padding: 0, marginTop: 20, fontSize: 20 }}>Preciso de:</Text>

            <View style={styles.itemsContainer}>
                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >

                    <ItemNecessidade necessidade="COMPRAS" icone='shopping-basket' pkg="fa" msg="Compras" />

                    <ItemNecessidade necessidade="HIGIENE" icone='shower' pkg="fa" msg="Higiene" />

                    <ItemNecessidade necessidade="MANTIMENTOS" icone='fridge' pkg="mi" msg="Mantimentos" />

                </ScrollView>
            </View>

            <FormButtonGroup>

                <FormButton onPress={handeSubmit} active={true} flat={showOverlay}>
                    <FormButtonLabel active={true}>Registar</FormButtonLabel>
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

        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 32,
        paddingTop: 20
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
        borderColor: '#fff',
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
        backgroundColor: '#fff',
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
    icon: {
        margin: 5,
        padding: 15,
        alignSelf: 'center',
        color: '#555'
    },
    selectedIcon: {
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


export default FormAlerta