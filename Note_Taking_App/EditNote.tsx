import {Alert} from 'react-native';
import {useEffect, useMemo, useState} from 'react';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import NoteInput from './NoteInput';
import {getNoteById, updateNote} from './NoteStorage';
import {validateNoteInput} from './Validation';
import type {NoteStackParamList} from './Navigation';

type EditNoteProps = NativeStackScreenProps<NoteStackParamList, 'EditNote'>;

const EditNoteScreen = ({navigation, route}: EditNoteProps) => {
  const [title, setTitle] = useState(route.params.note?.title ?? '');
  const [content, setContent] = useState(route.params.note?.content ?? '');
  const [isLoading, setIsLoading] = useState(!route.params.note);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadNote = async () => {
      if (route.params.note) {
        return;
      }

      try {
        setIsLoading(true);
        const storedNote = await getNoteById(route.params.noteId);

        if (!storedNote) {
          Alert.alert('Note Not Found', 'The selected note could not be found.');
          navigation.goBack();
          return;
        }

        if (isMounted) {
          setTitle(storedNote.title);
          setContent(storedNote.content);
        }
      } catch (error) {
        console.error('Unable to load note for editing.', error);
        Alert.alert('Load Failed', 'Unable to load the selected note.');
        navigation.goBack();
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadNote();

    return () => {
      isMounted = false;
    };
  }, [navigation, route.params.note, route.params.noteId]);

  const validation = useMemo(
    () => validateNoteInput(title, content),
    [title, content],
  );

  const handleUpdate = async () => {
    if (!validation.isValid) {
      Alert.alert('Invalid Note', validation.message);
      return;
    }

    try {
      setIsSaving(true);
      const updatedNote = await updateNote(route.params.noteId, title, content);

      if (!updatedNote) {
        Alert.alert('Note Not Found', 'The selected note no longer exists.');
        navigation.goBack();
        return;
      }

      Alert.alert('Note Updated', 'The changes were stored locally.');
      navigation.goBack();
    } catch (error) {
      console.error('Unable to update note.', error);
      Alert.alert('Update Failed', 'Unable to update the note in local storage.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <NoteInput
      screenTitle={isLoading ? 'Loading note...' : 'Update your note'}
      title={title}
      content={content}
      onTitleChange={setTitle}
      onContentChange={setContent}
      onSubmit={handleUpdate}
      submitLabel={isSaving ? 'Updating...' : 'Update Note'}
      disabled={isLoading || !validation.isValid || isSaving}
      helperMessage={validation.message}
    />
  );
};

export default EditNoteScreen;
