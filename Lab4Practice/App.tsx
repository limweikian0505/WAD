import { View } from "react-native"
import React, { useEffect } from "react";
import { FlatList, Text, TouchableNativeFeedback, TouchableNativeFeedback } from "react-native-gesture-handler";
let Sqlite = require("react-native-sqlite-storage");

let db = Sqlite.openDatabase(
    (name = "myplaces.sqlite", location: "default"),
    () => {
        console.log("Database opened successfully");
    },
    (error) => {
        console.log("Error opening database: ", error);
    }
);

const App = () => {

    const [places, setPlaces] = React.useState([]);



    const _queryData = () => {
        db.executeSql(
            "SELECT * FROM places",
            [],
            (resultSet: any) => {
                console.log("Query executed successfully");
                console.log(resultSet.rows.raw());
            },
            (error: any) => {
                console.log("Error executing query: ", error);
            }
        );
    };

    useEffect(() => {
        _queryData();
    }, []);

    return <View>
        <FlatList
            data={places}
            renderItem={({ item }) => (
            return(
                <TouchableNativeFeedback>
                    <View
                        style={{
                            padding: 10,
                            borderBottomWidth: 1,
                            borderBottomColor: "#ccc",
                        }}>
                        <Text style={{fontWeight:"bold"}}>{item.name}</Text>
                        <Text>{item.city}</Text>
                        <Text>{item.date}</Text>
                    </View>
                </TouchableNativeFeedback>
            );
        )}
    />

    </View>;
};

export default App;