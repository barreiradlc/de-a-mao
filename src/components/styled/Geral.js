import React from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'

const cor1 = '#c93b4a'
const cor2 = '#4e1017'
const cor3 = '#dedede'
const cor4 = '#fff'
const cor5 = '#555'
const cor6 = '#999999'
const cor7 = '#000'

export const screenWidth = Math.round(Dimensions.get('window').width);
export const screenHeight = Math.round(Dimensions.get('window').height);


export const SafeContainer = styled.SafeAreaView`
`

export const MoreIngredient = styled.TouchableOpacity`
`

export const RowContainer = styled.View`
    flexDirection: row
    justifyContent: center
    zIndex: 12121213
    elevation:10
`

export const ColumnContainer = styled.View`
    backgroundColor:#ffffffb3
    elevation:20
    width: ${screenWidth}
    height: ${screenHeight}
    flexDirection: column
    justifyContent: center
    alignItems: center
    position: absolute
    zIndex: 12121212
    `

export const HeaderLabel = styled.Text`
    fontWeight: bold
    padding: 20px
    fontSize: 23px 
`



export const IconsImage = styled.Image`
    paddingHorizontal: 20px
    width: 30px
    height: 30px
    resizeMode: cover
`

export const TabContainer = styled.View`
    flexDirection: row 
    alignItems: center
    justifyContent: center
    width: 100%
    paddingVertical: 20px
    background: ${props => props.active ? props.bg : cor4 };
    borderRadius: 10px
`

export const TabLabel = styled.Text`
    paddingHorizontal: 20px
    color: ${props => props.active ? '#fff' : '#555'}
    fontWeight: ${ props => props.active ? 'bold' : 'normal' }
`

export const Header = styled.Text`
    paddingTop:15px
    paddingHorizontal: 20px
    textAlign: center
    color: ${cor2}
    fontWeight: bold
    fontSize: 25px
`
export const Container = styled.ScrollView`
    marginBottom: 20px
    backgroundColor: ${cor3}
`
export const ContainerView = styled.View`
    height: ${screenHeight - 50}
    marginBottom: 20px
    backgroundColor: ${cor3}
`
export const ContainerDespensa = styled.ScrollView`
    marginBottom: 20px
`

export const CardTouchable = styled.TouchableOpacity`
`

export const FloatTouchable = styled.TouchableWithoutFeedback`
    background: ${props => props.active ? cor1 : cor4 }
`

export const HeaderTouchable = styled.TouchableWithoutFeedback`
`

export const HeaderContainer = styled.View`
`

export const HeaderBadge = styled.View`
    backgroundColor: ${cor1},
    position:absolute
    bottom:15px
    right:15px
    minWidth:10px
    height:10px
    borderRadius:15px
    alignItems: center
    justifyContent: center
    backgroundColor: #FF0000
`

export const Card = styled.View`
    background: #fff
    marginHorizontal: 20px
    marginVertical: 10px
    padding: 25px
    borderRadius: 10px
    elevation:3
`
export const CardCompras = styled.View`
    background: #fff
    marginHorizontal: 20px
    marginVertical: 10px
    paddingVertical: 5px
    paddingHorizontal: 25px
    borderRadius: 10px
    elevation:3
`
export const CardTitle = styled.Text`
    fontSize: 20px
    fontWeight: bold
    marginBottom: 15px
`
export const Float = styled.View`
    alignItems:center
    position:relative
    flexDirection: row
    justifyContent: center
    background: ${cor1}
    padding: 10px
    borderRadius: 10px
    opacity: 1
    opacity: 1
    marginHorizontal: 25px
    marginTop: 15px
    marginBottom: 20px

`
export const FloatHome = styled.View`
    alignItems:center
    position:relative
    flexDirection: row
    justifyContent: center
    background: ${cor1}
    padding: 10px
    borderRadius: 10px
    opacity: 1
    opacity: 1
    marginHorizontal: 25px
    marginBottom: 45px
    `
    export const FloatTitle = styled.Text`
    fontSize: 15px
    color: #fff
    fontWeight: bold
    paddingHorizontal:15px
    textAlign: center
    `
    export const CardBody = styled.Text`
        color: ${props => props.vencimento ? cor1 : cor5 };
        fontWeight: bold
`
export const CardRow = styled.View`
    flexDirection: row
    justifyContent: space-between
    `
    export const CardCol = styled.View`
    flexDirection: column
    justifyContent: space-evenly
    `
export const CardRowItem = styled.View`
    flex:1
    flexDirection: row
    justifyContent: flex-start
    alignItems: center
`

export const ConnectionTab = styled.View`
    position: relative
    justifyContent: center
    opacity: 0.25
    height: 0px
    bottom: 120px
`

export const ConnectionLabel = styled.Text`
    fontWeight: bold
    padding: 20px
    fontSize: 21px 
    textAlign: center
`
export const DrawerLabel = styled.Text`
    

`

export const DrawerScrollContainer = styled.ScrollView`
`

export const DrawerContainer = styled.View`
    justifyContent: flex-start
    alignItems: center
    padding: 25px
    fontWeight: bold 
    fontSize:25px
    flexDirection: row
`

export const DrawerTouchable = styled.TouchableWithoutFeedback`
`

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export const Plus = () => <FontAwesome name="plus" size={30} color="#fff" />;
export const Google = () => <FontAwesome name="google-plus" size={30} color="#fff" />;

export const RemoveReceita = () => <FontAwesome name="times" size={20} color="#fff" style={{ borderRadius:15, paddingHorizontal: 5 }} />;
export const AddReceita = () => <FontAwesome name="plus" size={20} color="#fff" style={{padding:15,borderRadius:15 }} />;
export const PlusItemReceita = () => <FontAwesome name="plus" size={20} color="#fff" style={{paddinng:25}} />;
export const PlusItem = ({color, size}) => <FontAwesome name="plus" size={size || 40} color={color || '#fff'} style={{paddinng:25}} />;
export const MinusItem = ({color, size}) => <FontAwesome name="minus" size={size || 40} color={color || '#fff'}  />;
export const EditItem = () => <FontAwesome name="pencil" size={40} color="#fff" />;
export const DeleteItem = ({color}) => <FontAwesome name="trash-o" size={40} color={color || '#fff'} />;
export const RemoveItem = () => <FontAwesome name="times" size={40} color="#555" />;
export const MenuItem = () => <FontAwesome name="ellipsis-v" size={20} color="#555" style={{paddingRight:20}} />;
export const HomeMenuItem = () => <FontAwesome name="navicon" size={20} color="#555" style={{paddingLeft:20}}/>;
export const HomeNotifications = () => <FontAwesome name="bell-o" size={20} color="#555" style={{paddingRight:20}}/>;

export const UserItem = () => <FontAwesome name="ellipsis-v" size={20} color="#555" style={{paddingRight:20}} />;

export const CheckItem = ({state}) => <FontAwesome name={state} size={30} color="#555" style={{paddingRight:10}} />;