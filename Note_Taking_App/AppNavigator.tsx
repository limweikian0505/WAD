import {useCallback, useState} from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import {NavigationContainer, useFocusEffect} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import AddNoteScreen from './AddNote';
import EditNoteScreen from './EditNote';
import type {Note} from './Note';
import {formatTimestamp} from './Note';
import {deleteAllNotesForDebug, getNotes} from './NoteStorage';
import type {NoteStackParamList} from './Navigation';

const Stack = createNativeStackNavigator<NoteStackParamList>();

type WorkbenchProps = NativeStackScreenProps<NoteStackParamList, 'NoteWorkbench'>;

const NoteWorkbenchScreen = ({navigation}: WorkbenchProps) => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadNotes = useCallback(async () => {
    try {
      setIsLoading(true);
      const storedNotes = await getNotes();
      setNotes(storedNotes);
    } catch (error) {
      console.error('Unable to load notes from storage.', error);
      Alert.alert('Storage Error', 'Unable to read notes from local storage.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadNotes();
    }, [loadNotes]),
  );

  const handleResetStorage = () => {
    Alert.alert('Reset Notes', 'Delete all locally stored notes for testing?', [
      {text: 'Cancel', style: 'cancel'},
      {
        text: 'Delete All',
        style: 'destructive',
        onPress: async () => {
          try {
            await deleteAllNotesForDebug();
            setNotes([]);
            Alert.alert('Storage Reset', 'All local notes were removed.');
          } catch (error) {
            console.error('Unable to reset local notes.', error);
            Alert.alert('Storage Error', 'Unable to clear local note storage.');
          }
        },
      },
    ]);
  };

  const latestNote = notes[0];

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <View style={styles.heroCard}>
          <Text style={styles.heroTitle}>Note Module Workbench</Text>
          <Text style={styles.heroSubtitle}>
            Add/Edit with AsyncStorage wired and ready for teammate integration.
          </Text>
          <Text style={styles.heroMeta}>
            {isLoading ? 'Loading notes...' : `${notes.length} note(s) in storage`}
          </Text>
        </View>

        <View style={styles.actionRow}>
          <Pressable
            style={[styles.primaryButton, styles.flexButton]}
            onPress={() => navigation.navigate('AddNote')}>
            <Text style={styles.primaryButtonText}>Add Note</Text>
          </Pressable>

          <Pressable
            style={[
              styles.secondaryButton,
              styles.flexButton,
              notes.length === 0 && styles.disabledButton,
            ]}
            disabled={notes.length === 0}
            onPress={() =>
              latestNote &&
              navigation.navigate('EditNote', {
                noteId: latestNote.id,
                note: latestNote,
              })
            }>
            <Text style={styles.secondaryButtonText}>Edit Latest</Text>
          </Pressable>
        </View>

        <Pressable style={styles.ghostButton} onPress={handleResetStorage}>
          <Text style={styles.ghostButtonText}>Reset Local Storage</Text>
        </Pressable>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Stored Notes Preview</Text>
          <Text style={styles.sectionCaption}>
            Lightweight preview only. Full list UI can be replaced by teammate integration later.
          </Text>
        </View>

        <FlatList
          data={notes}
          keyExtractor={item => item.id}
          contentContainerStyle={notes.length === 0 ? styles.emptyList : styles.listContent}
          renderItem={({item}) => (
            <Pressable
              style={styles.noteCard}
              onPress={() =>
                navigation.navigate('EditNote', {
                  noteId: item.id,
                  note: item,
                })
              }>
              <Text style={styles.noteTitle}>{item.title}</Text>
              <Text style={styles.noteContent} numberOfLines={2}>
                {item.content}
              </Text>
              <Text style={styles.noteMeta}>
                Updated {formatTimestamp(item.updatedAt)}
              </Text>
            </Pressable>
          )}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Text style={styles.emptyTitle}>No notes stored yet</Text>
              <Text style={styles.emptyText}>
                Save a note from the Add screen to verify persistence and Edit flow.
              </Text>
            </View>
          }
        />
      </View>
    </SafeAreaView>
  );
};

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        id="note-stack"
        initialRouteName="NoteWorkbench"
        screenOptions={{
          headerTitleAlign: 'center',
          contentStyle: styles.navigatorContent,
          headerStyle: styles.header,
          headerTintColor: '#ffffff',
          headerTitleStyle: styles.headerTitle,
        }}>
        <Stack.Screen
          name="NoteWorkbench"
          component={NoteWorkbenchScreen}
          options={{title: 'Notes'}}
        />
        <Stack.Screen
          name="AddNote"
          component={AddNoteScreen}
          options={{title: 'Add Note'}}
        />
        <Stack.Screen
          name="EditNote"
          component={EditNoteScreen}
          options={{title: 'Edit Note'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f4f6fb',
  },
  navigatorContent: {
    backgroundColor: '#f4f6fb',
  },
  header: {
    backgroundColor: '#314c7b',
  },
  headerTitle: {
    fontWeight: '700',
  },
  screen: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  heroCard: {
    backgroundColor: '#314c7b',
    borderRadius: 20,
    padding: 20,
  },
  heroTitle: {
    color: '#ffffff',
    fontSize: 24,
    fontWeight: '700',
  },
  heroSubtitle: {
    color: '#d8e2ff',
    fontSize: 14,
    lineHeight: 21,
    marginTop: 8,
  },
  heroMeta: {
    color: '#ffffff',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 16,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 12,
  },
  flexButton: {
    flex: 1,
  },
  primaryButton: {
    alignItems: 'center',
    backgroundColor: '#ff8a5b',
    borderRadius: 14,
    paddingVertical: 14,
  },
  primaryButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  secondaryButton: {
    alignItems: 'center',
    backgroundColor: '#dfe7f7',
    borderRadius: 14,
    paddingVertical: 14,
  },
  secondaryButtonText: {
    color: '#314c7b',
    fontSize: 16,
    fontWeight: '700',
  },
  disabledButton: {
    opacity: 0.45,
  },
  ghostButton: {
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingHorizontal: 4,
  },
  ghostButtonText: {
    color: '#6a7794',
    fontSize: 13,
    fontWeight: '600',
  },
  sectionHeader: {
    gap: 4,
  },
  sectionTitle: {
    color: '#1b2741',
    fontSize: 18,
    fontWeight: '700',
  },
  sectionCaption: {
    color: '#6a7794',
    fontSize: 13,
    lineHeight: 18,
  },
  listContent: {
    gap: 12,
    paddingBottom: 24,
  },
  emptyList: {
    flexGrow: 1,
  },
  noteCard: {
    backgroundColor: '#ffffff',
    borderRadius: 18,
    padding: 16,
  },
  noteTitle: {
    color: '#1b2741',
    fontSize: 17,
    fontWeight: '700',
  },
  noteContent: {
    color: '#50607d',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 8,
  },
  noteMeta: {
    color: '#7e8cab',
    fontSize: 12,
    fontWeight: '600',
    marginTop: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
    paddingHorizontal: 24,
  },
  emptyTitle: {
    color: '#1b2741',
    fontSize: 20,
    fontWeight: '700',
    textAlign: 'center',
  },
  emptyText: {
    color: '#6a7794',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default AppNavigator;
