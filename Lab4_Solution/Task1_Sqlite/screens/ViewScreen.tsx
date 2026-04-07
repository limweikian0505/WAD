import React, {useEffect, useState} from 'react';
import {View, Text, ToastAndroid, Alert} from 'react-native';
import {InputWithLabel, formatted} from '../UI';
import {FloatingAction} from 'react-native-floating-action';
let SQLite = require('react-native-sqlite-storage');
let db = SQLite.openDatabase(
  {name: 'myplaces.sqlite', createFromLocation: '~myplaces.sqlite'},
  () => console.log('db success opened '),
  (error: any) => console.log(error),
);

const ViewScreen = ({route, navigation}: any) => {
  const [id, setID] = useState<any>();
  const [placename, setName] = useState<any>();
  const [city, setCity] = useState<any>();
  const [date, setDate] = useState<any>();

  const _queryByID = () => {
    db.executeSql(
      'SELECT * FROM places WHERE id = ?',
      [route.params.id],
      (results: any) => {
        console.log('Query by ID completed: ', results.rows.raw()[0]);
        setCity(results.rows.raw()[0].city);
        setName(results.rows.raw()[0].name);
        setDate(results.rows.raw()[0].date);
      },
      (err: any) => {
        console.log('Error executing query by ID: ', err);
      },
    );
  };

 
  const _delete = () => {
    Alert.alert('Are you sure you want to delete this place?', placename, [
      {
        text: 'Cancel',
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => {
          // Proceed with deletion
          db.executeSql(
            'DELETE FROM places WHERE id = ?',
            [route.params.id],
            (results: any) => {
              if (results.rowsAffected > 0) {
                ToastAndroid.show(
                  'Place deleted successfully',
                  ToastAndroid.SHORT,
                );
                setCity('');
                setName('');
                setDate('');
                route.params.refresh();
                navigation.goBack();
              }
            },
            (err: any) => {
              console.log('Error deleting place: ', err);
            },
          );
        },
      },
    ]);
  };

  useEffect(() => {
    _queryByID();
    navigation.setOptions({
      title: placename,
    });
  }, [placename]);
  return (
    <View style={{flex: 1, backgroundColor: '#F4F6FB', paddingTop: 12}}>
      <InputWithLabel label="Place Name" value={placename} editable={false} />
      <InputWithLabel label="City" value={city} editable={false} />
      <InputWithLabel
        label="Date"
        value={formatted(new Date(date))}
        editable={false}
      />
      <FloatingAction
        actions={actions}
        onPressItem={name => {
          if (name == 'bt_edit') {
            navigation.navigate('Edit', { id: route.params.id , refresh:_queryByID, homeRefresh: route.params.refresh});
          } else if (name == 'bt_delete') {
            _delete();
          }
        }}
      />
    </View>
  );
};

const actions = [
  {
    text: 'Edit Place',
    icon: require('../icons/edit_icon.png'),
    name: 'bt_edit',
    position: 2,
  },
  {
    text: 'Delete Place',
    icon: require('../icons/delete_icon.png'),
    name: 'bt_delete',
    position: 1,
  },
];

export default ViewScreen;
