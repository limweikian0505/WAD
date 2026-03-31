import React  from "react";
import type { StackScreenProps } from '@react-navigation/stack';
import {Button, View} from "react-native";
import {RootStackParamList} from '../App'

export type Props = StackScreenProps<RootStackParamList, 'Home'>;

const App = ( { route, navigation}: Props ) => {
    return(
        <View>
            <View style={{ margin:10 }}>
                <Button title="Chicken" onPress={()=>{navigation.navigate('Chicken')}} />
            </View>
            <View style={{ margin:10 }}>
                <Button title="Koala" onPress={()=>{navigation.navigate('Koala')}}/>
            </View>
        </View>
    )
}

export default App;