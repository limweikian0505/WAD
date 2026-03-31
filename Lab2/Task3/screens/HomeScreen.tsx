import React  from "react";
import {Button, View, StyleSheet } from "react-native";
import { RootStackParamList } from "../App";
import { StackScreenProps } from "@react-navigation/stack";

const authorAndArticle = {
    Author: {
      name: 'Author Aloha',
      country: 'Malaysia',
      image: require ('../img/author.jpg'),
    },
    Article: {
      name: 'Article A',
      details: 'this is the article details \n One the author has spend three years to compose such .... \n Then ...' ,
    },
}

const App = ( {route, navigation}: StackScreenProps<RootStackParamList,'Home'> ) => {
    return(
        <View>
            <View style={styles.button}>
                <Button color="#31396e" title="Author" onPress={()=>{navigation.navigate('Author', 
                    { author: authorAndArticle.Author }
                )}} />
            </View>
            <View style={styles.button}>
                <Button color="#31396e" title="Article" onPress={()=>{navigation.navigate('Article',
                    { article: authorAndArticle.Article }
                )}}/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    button:{
        margin:20,
        backgroundColor: 'red'
    }
})

export default App;