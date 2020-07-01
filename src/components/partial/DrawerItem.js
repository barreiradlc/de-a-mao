import React from 'react'
import { Alert, Button, TouchableWithoutFeedback, Text, View } from 'react-native';
import { DrawerTouchable, DrawerContainer, DrawerLabel } from '../styled/Geral'
import Icon from 'react-native-vector-icons/FontAwesome';

function DrawerItem({ handleFunction, label, bg, icon }){

    return(
        <DrawerTouchable onPress={() => handleFunction()} style={{ backgroundColor: bg && '#555' }}>
            <DrawerContainer style={{ backgroundColor: bg && '#dedede' }}>

                {icon && 
                    <Icon color='#555' name={icon} size={20} style={{ paddingRight: 15 }}/>
                }                
                <DrawerLabel>{label}</DrawerLabel>

            </DrawerContainer> 
        </DrawerTouchable>
    )
}

export default DrawerItem