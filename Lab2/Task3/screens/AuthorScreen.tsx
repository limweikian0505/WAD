import React, { useEffect } from "react";
import {Button, Image, View, Text} from "react-native";

const App = ( {route, navigation}: any ) => {

    const {author} = route.params;

    useEffect(()=>{
        navigation.setOptions({headerTitle: author.name});
    },[]);

    return(
        <>
            <View style={{flex:0.9, alignSelf:'center', justifyContent:'center'}} >
                <View>
                    <Image style={{ width: 200, height: 200}} source={author.image}/>
                </View>
                <View>
                    <Text style={{fontSize:25}}>Name: {author.name}</Text>
                    <Text style={{fontSize:25}}>Country: {author.country}</Text>
                </View>
            </View>
            <View style={{flex:0.1, margin: 15}}>
                <Button title="Go back" onPress={()=>navigation.goBack()}/>
            </View>
        </>
    )
}

export default App;