import React from 'react'

import { View, Text, ActivityIndicator } from "react-native";
import { ContainerLoad, LabelLoad, SpinnerLoad, cor5 } from '../styled/Utils'

export function LoadingOverlay({text}){
    return (
          <ContainerLoad>
              <LabelLoad>{text || 'Aguarde'}</LabelLoad>
              <SpinnerLoad size={60} color={cor5} />
          </ContainerLoad>
      )
}



export function mailValidate(email) {                
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};
