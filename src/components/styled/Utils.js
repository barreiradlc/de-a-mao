import styled from 'styled-components/native'
import React from 'react'

import { Dimensions } from 'react-native'

export const screenWidth = Math.round(Dimensions.get('window').width);
export const screenHeight = Math.round(Dimensions.get('window').height);

export const cor1 = '#c93b4a'
export const cor2 = '#4e1017'
export const cor3 = '#dedede'
export const cor4 = '#fff'
export const cor5 = '#555'
export const cor6 = '#999999'
export const cor7 = '#000'

export const ContainerLoad = styled.View`
    zIndex: 40
    alignItems: center
    justifyContent: flex-start  
    background: ${cor4}
    opacity: 0.8
    width: ${screenWidth}
    height: ${screenHeight}
    position: absolute
    top: 0
`
    
export const LabelLoad = styled.Text`
    zIndex: 45
    fontSize: 35px
    fontWeight: ${props => props.active ? 'bold' : 'normal' }
    color: ${props => props.active ? cor4 : cor5 }
    textAlign: center
    marginVertical: 10px
    width: 100%
    padding: 10px
`

export const SpinnerLoad = styled.ActivityIndicator`
    zIndex: 45
    color: ${cor5}   
`