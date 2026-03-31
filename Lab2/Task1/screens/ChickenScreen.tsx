import React  from "react";
import type { StackScreenProps } from '@react-navigation/stack';
import {Button, Image, View} from "react-native";
import {RootStackParamList} from '../App'

export type Props = StackScreenProps<RootStackParamList, 'Chicken'>;

const App = ( { route, navigation}: Props ) => {
    return(
        <View style={{flex:1, alignSelf:'center', justifyContent:'center'}} >
            <Image style={{ alignSelf:'center', justifyContent:'center', width: 300, height: 300}} source={require('../img/chicken.jpg')}></Image>
            <Button title="Go back" onPress={()=>navigation.goBack()}></Button>
        </View>
    )
}

export default App;