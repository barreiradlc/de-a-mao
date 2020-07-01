import React, { useState, useEffect } from 'react'
import { View, StyleSheet, Text, Image, TouchableOpacity, SafeAreaView, Linking } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Feather';
import api from "../services/api";
import AsyncStorage from '@react-native-community/async-storage';

function Detalhes({ route, navigation }) {

    const ALL_NEEDS_ENUM = [
        { value: "MANTIMENTOS", label: "Mantimentos em geral" },
        { value: "HIGIENE", label: 'Produtos de higiene' },
        { value: "COMPRAS", label: 'Auxílio em compras' }
    ]

    navigation.setOptions({
        title: ''
    })
    const [user, setUser] = useState()
    const [data, setData] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getData()
        getUser()
    }, [])

    async function getUser(){
        const u = await AsyncStorage.getItem("@user")

        console.log({u})

        setUser(JSON.parse(u))
    }

    function getData() {
        console.log('route.params')
        console.log(route.params)

        api.get(`alert/${route.params._id}`).then(response => {
            setData(response.data);
            setLoading(false)
        });
    }

    function handleNavigateBack() {
        console.log("AI! AI! Faz cosca")
    }

    function handleWhatsapp() {
        Linking.openURL(`whatsapp://send?phone=${data.user.phone}&text=Olá tenho interesse em ajudar, te encontrei pelo anúncio: ${data.title}`);
      }
    
      function handleComposeMail() {        
        Linking.openURL(`mailto:${data.user.email}?subject=Contato pelo email&body=Olá tenho interesse em ajudar, te encontrei pelo anúncio: ${data.title}`) 
      }

    if (loading) {
        return null
    }

    navigation.setOptions({
        title: data.title
    })

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <View style={styles.container}>

                <View style={styles.address}>
                    <Text style={styles.addressTitle}> {data.description} </Text>
                    <Text style={styles.pointName}> Pode me ajudar com: </Text>
                    {data.needs.map((n) =>
                        <Text style={styles.pointItems}> {ALL_NEEDS_ENUM.filter(a => a.value === n)[0].label} </Text>
                    )}
                </View>

                {data.user._id === user._id ? 
                    <View style={styles.footer}>
                        <RectButton style={styles.button} onPress={handleWhatsapp}>
                            <FontAwesome name="edit" size={20} color="#FFF" />
                            <Text style={styles.buttonText}>Editar</Text>
                        </RectButton>

                        <RectButton style={styles.button} onPress={handleComposeMail}>
                            <Icon name="trash" size={20} color="#FFF" />
                            <Text style={styles.buttonText}>Excluir</Text>
                        </RectButton>
                    </View>
                    :
                    <View style={styles.footer}>
                        <RectButton style={styles.button} onPress={handleWhatsapp}>
                            <FontAwesome name="whatsapp" size={20} color="#FFF" />
                            <Text style={styles.buttonText}>Whatsapp</Text>
                        </RectButton>

                        <RectButton style={styles.button} onPress={handleComposeMail}>
                            <Icon name="mail" size={20} color="#FFF" />
                            <Text style={styles.buttonText}>E-mail</Text>
                        </RectButton>
                    </View>
                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 32,
        paddingTop: 20,
    },

    pointImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 10,
        marginTop: 32,
    },    
    pointName: {
        color: '#322153',
        fontSize: 20,
        fontFamily: 'Ubuntu_700Bold',
        marginTop: 18,
    },

    pointItems: {
        fontFamily: 'Roboto_400Regular',
        fontSize: 16,
        lineHeight: 24,
        marginTop: 8,
        color: '#6C6C80'
    },

    address: {
        marginTop: 32,
    },

    addressTitle: {
        color: '#322153',
        fontFamily: 'Roboto_500Medium',
        fontSize: 16,
    },

    addressContent: {
        fontFamily: 'Roboto_400Regular',
        lineHeight: 24,
        marginTop: 8,
        color: '#6C6C80'
    },

    footer: {
        
        borderColor: '#999',
        paddingVertical: 30,
        
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    button: {
        width: '48%',
        backgroundColor: '#34CB79',
        borderRadius: 10,
        height: 50,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },

    buttonText: {
        marginLeft: 8,
        color: '#FFF',
        fontSize: 16,
        fontFamily: 'Roboto_500Medium',
    },
});

export default Detalhes