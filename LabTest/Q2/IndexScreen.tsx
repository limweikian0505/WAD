import {View, Text, FlatList, StyleSheet} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {RootStackParamList} from './App';

export const IndexScreen = ({
  navigation,
  route,
}: StackScreenProps<RootStackParamList, 'Index'>) => {
  const students = [
    {studentID: '220101', name: 'Aiman Hakim', year: 1},
    {studentID: '220203', name: 'Nur Aisyah', year: 2},
    {studentID: '220305', name: 'Daniel Wong', year: 3},
    {studentID: '220412', name: 'Siti Amirah', year: 1},
  ];
  return (
  <View style={styles.container}>
      <FlatList
        data={students}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const yearColors: { [key: number]: string } = {
            1: '#c2e0ec',
            2: '#c8e9c8',
            3: '#e6c3eb',
          };
          return (
            <TouchableOpacity
              style={[styles.card, { backgroundColor: yearColors[item.year] }]}
              onPress={() => navigation.navigate('Profile', {
                name: item.name,
                studentID: item.studentID,
                year: item.year,
              })}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
              </View>
              <View style={styles.info}>
                <Text style={styles.name}>{item.name}</Text>
                <Text>{item.studentID}</Text>
                <Text>Year {item.year}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
      />
    </View>

  )
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 12,
    marginVertical: 6,
    borderRadius: 12,
    elevation: 2,
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30, // perfect circle
    backgroundColor: '#FFD84D',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  info: {
    marginLeft: 16,
  },
  name: {
    fontWeight: '600',
    marginBottom: 4,
  },
});
