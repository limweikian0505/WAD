import React, { useEffect } from "react";
import {Button, Image, View, Text} from "react-native";

const App = ( {route, navigation}: any ) => {

    const {article} = route.params;

    useEffect(()=>{
        navigation.setOptions({headerTitle: article.name});
    },[]);

    return(
        <>
            <View style={{flex:0.9, alignSelf:'center', justifyContent:'center'}} >
                <View>
                    <Text style={{fontSize:30, fontWeight:'bold'}}>{article.name}</Text>
                    <Text style={{fontSize:15}}>{article.details}</Text>
                </View>
            </View>
            <View style={{flex:0.1, margin: 15}}>
                <Button title="Go back" onPress={()=>navigation.goBack()}/>
            </View>
        </>
    )
}

export default App;