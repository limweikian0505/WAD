import {Alert} from 'react-native';
import {useState} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import NoteInput from './NoteInput';
import {addNote} from './NoteStorage';
import {validateNoteInput} from './Validation';
import type {NoteStackParamList} from './Navigation';

type AddNoteProps = NativeStackScreenProps<NoteStackParamList, 'AddNote'>;

const AddNoteScreen = ({navigation}: AddNoteProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const validation = validateNoteInput(title, content);

  const handleSave = async () => {
    if (!validation.isValid) {
      Alert.alert('Invalid Note', validation.message);
      return;
    }

    try {
      setIsSaving(true);
      await addNote(title, content);
      Alert.alert('Note Saved', 'The note was stored locally.');
      navigation.goBack();
    } catch (error) {
      console.error('Unable to save note.', error);
      Alert.alert('Save Failed', 'Unable to save the note to local storage.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <NoteInput
      screenTitle="Create a new note"
      title={title}
      content={content}
      onTitleChange={setTitle}
      onContentChange={setContent}
      onSubmit={handleSave}
      submitLabel={isSaving ? 'Saving...' : 'Save Note'}
      disabled={!validation.isValid || isSaving}
      helperMessage={validation.message}
    />
  );
};

export default AddNoteScreen;
