import styled from 'styled-components/native'
import React from 'react'

import { Dimensions } from 'react-native'

export const screenWidth = Math.round(Dimensions.get('window').width);
export const screenHeight = Math.round(Dimensions.get('window').height);

const cor1 = '#c93b4a'
const cor2 = '#4e1017'
const cor3 = '#dedede'
const cor4 = '#fff'
const cor5 = '#555'
const cor6 = '#999999'
const cor7 = '#000'

export const Container = styled.View`
`

export const FormContainerScroll = styled.ScrollView`
  background-color: #fff
  flex: 1   
  padding:40px
`
    
export const FormContainer = styled.SafeAreaView`
  alignItems: center
  justifyContent: center  
  margin: 20px
  flex:1
`
    
export const FormInput = styled.TextInput`
  textAlign: center
  background: ${cor3}
  width: 100%
  paddingVertical: 15px
  paddingHorizontal: 20px
  marginBottom: 15px
  borderRadius: 15px
  `
  
  export const FormLabel = styled.Text`
  textAlign: center
  width: 100%
  paddingVertical: 15px
  paddingHorizontal: 20px
  marginBottom: 15px
  fontSize: 23
  
  `
  
export const FormButtonGroup = styled.View`
  alignItems: stretch
  flex-direction: row
  justifyContent: space-between
  marginVertical: 20px
`

export const FormErrorGroup = styled.View`
  background: ${cor1}
  border-radius: 5px
  flex-direction: column
  paddingHorizontal: 10px
  paddingBottom: 20px
  paddingTop: 10px
  marginVertical: 20px
`

export const ErrorLabel = styled.Text`
  color: #fff
  textAlign: center
  width: 100%    
  paddingHorizontal: 20px    
  fontSize: 20px
`

export const FormButtonError = styled.TouchableOpacity`    
    padding:5px    
    borderRadius: 10px
    alignSelf: flex-end
  `

  export const FormButtonLabelError = styled.Text`
    fontSize: 20px
    fontWeight: ${props => props.active ? 'bold' : 'normal' }
    color: ${props => props.active ? cor4 : cor5 }
    textAlign: center
    marginVertical: 10px
    width: 100%
    padding: 10px
  `

  export const FormButton = styled.TouchableOpacity`
    textAlign: center
    background: ${props => props.active ? cor5 : cor4 }
    flex: 1
    elevation: ${props => props.flat ? 0 : 5 }
    borderRadius: 10px
  `
    
export const FormButtonLabel = styled.Text`
  fontSize: 20px
  fontWeight: ${props => props.active ? 'bold' : 'normal' }
  color: ${props => props.active ? cor4 : cor5 }
  textAlign: center
  marginVertical: 10px
  width: 100%
  padding: 10px
  `