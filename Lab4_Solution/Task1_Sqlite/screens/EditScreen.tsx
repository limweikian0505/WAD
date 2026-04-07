import {View, Text, ToastAndroid} from 'react-native';
import {InputWithLabel, AppButton,formatted, DateTimePickerWithLabel} from '../UI';
import {useEffect, useState} from 'react';

let SQLite = require('react-native-sqlite-storage');
let db = SQLite.openDatabase(
  {name: 'myplaces.sqlite', createFromLocation: '~myplaces.sqlite'},
  () => console.log('db success opened '),
  (error: any) => console.log(error),
);





const EditScreen = ( {navigation,route}: any) => {

    const [id, setID] = useState<any>(route.params.id);
    const [placename, setName] = useState<any>();
    const [city, setCity] = useState<any>();
    const [date, setDate] = useState<any>(new Date());

    const _queryById = () => {
        db.executeSql(
          'SELECT * FROM places WHERE id = ?',  
            [id],
            (results:any) => {
              if (results.rows.length > 0) {
                // console.log('Query by ID completed: ', results.rows.raw()[0]);
                setName(results.rows.raw()[0].name);
                setCity(results.rows.raw()[0].city);
                setDate (new Date(results.rows.raw()[0].date));
              }
            }
        );
    };

    useEffect(() => {
        _queryById();
          navigation.setOptions({
      title: placename,
    });
    }, [placename]);

    const _update = () => {
        db.executeSql(
            'UPDATE places SET name = ?, city = ?, date = ? WHERE id = ?',
            [placename, city, date.getTime(), id],  
            (results:any) => {
                if (results.rowsAffected > 0) {
                    console.log('results.rowsAffected');
                    ToastAndroid.show('Place updated successfully', ToastAndroid.SHORT);
                    route.params.refresh();
                    route.params.homeRefresh();
                    navigation.goBack();
                    navigation.goBack();
                }   
            },
            (err:any) => {
                console.log('Error updating place: ', err);
            }
        );}
    return(
        <View style={{flex: 1, backgroundColor: '#F4F6FB', paddingTop: 12}}>
            <InputWithLabel label="Name" value={placename} onChangeText={(text:any)=>setName(text)} />
            <InputWithLabel label="City" value={city} onChangeText={(text:any)=>setCity(text)} />
            <DateTimePickerWithLabel label="Date" value={date} mode="date" onChange={(event:any, selectedDate:any) => setDate(selectedDate)} />
            <AppButton title="Save" color="#6C63FF" onPress={_update} />
        </View>
    )
}

export default EditScreen