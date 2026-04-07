import App from '../App';
import {AppButton, InputWithLabel, DateTimePickerWithLabel} from '../UI';
import {View, Text, ToastAndroid} from 'react-native';
import {useState} from 'react';
let SQLite = require('react-native-sqlite-storage');
let db = SQLite.openDatabase(
  {name: 'myplaces.sqlite', createFromLocation: '~myplaces.sqlite'},
  () => console.log('db success opened '),
  (error: any) => console.log(error),
);

const CreateScreen = ({navigation, route}: any) => {
  const [newplace, setNewPlace] = useState<any>('');
  const [newcity, setNewCity] = useState<any>('');
  const [newdate, setNewDate] = useState<any>(new Date());

  const _create = () => {
    db.executeSql(
      'INSERT INTO places (name, city, date) VALUES (?, ?, ?)',
      [newplace, newcity, newdate.getTime()],
      (results: any) => {
        if (results.rowsAffected > 0) {
          ToastAndroid.show('Place created successfully', ToastAndroid.SHORT);

          route.params.refresh();
          navigation.goBack();
        }
      },
      (err: any) => {
        console.log('Error creating place: ', err);
      },
    );
  };

  console.log(newdate);
  return (
    <View style={{flex: 1, backgroundColor: '#F4F6FB', paddingTop: 12}}>
      <InputWithLabel
        label="Place Name"
        placeholder="Enter place name"
        onChangeText={(input: any) => setNewPlace(input)}
      />
      <InputWithLabel
        label="City"
        placeholder="Enter city"
        onChangeText={(input: any) => setNewCity(input)}
      />

      <DateTimePickerWithLabel
        value={newdate}
        onChange={(event: any, date: any) => setNewDate(date)}
      />
      <AppButton title="Save Place" onPress={_create} />
    </View>
  );
};
export default CreateScreen;
