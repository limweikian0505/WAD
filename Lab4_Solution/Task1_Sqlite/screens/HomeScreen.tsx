import {useEffect, useState} from 'react';
import {
  TouchableNativeFeedback,
  View,
  Text,
  Image,
  ToastAndroid,
  StyleSheet,
} from 'react-native';
import {FloatingAction} from 'react-native-floating-action';
import {FlatList} from 'react-native-gesture-handler';
import { formatted } from '../UI';

let SQLite = require('react-native-sqlite-storage');
let db = SQLite.openDatabase(
  {name: 'myplaces.sqlite', createFromLocation: '~myplaces.sqlite'},
  () => console.log('db success opened '),
  (error: any) => console.log(error),
);

const HomeScreen = ({ navigation }: any) => {
  const [places, setPlaces] = useState<any>([]);

  useEffect(() => {
    _query();
  }, []);

  const _query = () => {
    db.executeSql(
      'SELECT * FROM places',
      [],
      (results: any) => {
        console.log('Query completed: ', results.rows.raw());
        setPlaces(results.rows.raw());
      },
      (err: any) => {
        console.log('Error executing query: ', err);
      },
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Places</Text>
        <Text style={styles.headerSubtitle}>{places.length} saved locations</Text>
      </View>
      <FlatList
        data={places}
        contentContainerStyle={styles.listContent}
        renderItem={({item}) => (
          <TouchableNativeFeedback onPress={()=>{navigation.navigate('View', { id: item.id , refresh: _query})}}>
            <View style={styles.card}>
              <View style={styles.cardIcon}>
                <Text style={styles.cardIconText}>📍</Text>
              </View>
              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>{item.name}</Text>
                <Text style={styles.cardCity}>{item.city}</Text>
                <Text style={styles.cardDate}>{formatted(new Date(item.date))}</Text>
              </View>
            </View>
          </TouchableNativeFeedback>
        )}
        keyExtractor={(_, index) => index.toString()}
      />
      <FloatingAction
        actions={actions}
        overrideWithAction={true}
        color="#6C63FF"
        onPressItem={() => {
          
            navigation.navigate('Create', { refresh: _query });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F4F6FB',
  },
  header: {
    backgroundColor: '#6C63FF',
    paddingTop: 20,
    paddingBottom: 24,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
    elevation: 6,
    shadowColor: '#6C63FF',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  headerTitle: {
    fontSize: 26,
    fontWeight: '700',
    color: '#fff',
  },
  headerSubtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.75)',
    marginTop: 4,
  },
  listContent: {
    padding: 16,
    paddingBottom: 80,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  cardIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#EEF0FF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  cardIconText: {
    fontSize: 22,
  },
  cardInfo: {
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  cardCity: {
    fontSize: 13,
    color: '#6C63FF',
    marginTop: 2,
  },
  cardDate: {
    fontSize: 12,
    color: '#9E9E9E',
    marginTop: 4,
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 80,
  },
  emptyIcon: {
    fontSize: 60,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1A1A2E',
  },
  emptySubText: {
    fontSize: 13,
    color: '#9E9E9E',
    marginTop: 6,
  },
});

const actions = [
  {
    text: 'Add Place',
    icon: (
      <Image
        style={{width: 50, height: 50}}
        source={require('../icons/add_icon.png')}
      />
    ),
    name: 'bt_add_place',
    position: 1,
  },
];

export default HomeScreen;
