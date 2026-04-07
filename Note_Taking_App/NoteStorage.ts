import AsyncStorage from '@react-native-async-storage/async-storage';
import {NOTES_STORAGE_KEY} from './Note';
import type {Note} from './Note';
import {sanitizeNoteInput, validateNoteInput} from './Validation';

const isValidNote = (value: unknown): value is Note => {
  if (!value || typeof value !== 'object') {
    return false;
  }

  const note = value as Record<string, unknown>;

  return (
    typeof note.id === 'string' &&
    typeof note.title === 'string' &&
    typeof note.content === 'string' &&
    typeof note.createdAt === 'number' &&
    typeof note.updatedAt === 'number'
  );
};

const normalizeNotes = (value: unknown): Note[] => {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter(isValidNote).sort((left, right) => right.updatedAt - left.updatedAt);
};

const createUniqueId = (notes: Note[]) => {
  let id = '';

  do {
    id = `note-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
  } while (notes.some(note => note.id === id));

  return id;
};

export const getNotes = async (): Promise<Note[]> => {
  try {
    const rawValue = await AsyncStorage.getItem(NOTES_STORAGE_KEY);

    if (!rawValue) {
      return [];
    }

    const parsed = JSON.parse(rawValue) as unknown;
    return normalizeNotes(parsed);
  } catch (error) {
    console.error('Unable to parse stored notes. Returning an empty list.', error);
    return [];
  }
};

export const getNoteById = async (noteId: string): Promise<Note | null> => {
  const notes = await getNotes();
  return notes.find(note => note.id === noteId) ?? null;
};

export const saveNotes = async (notes: Note[]): Promise<void> => {
  const normalizedNotes = normalizeNotes(notes);
  await AsyncStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(normalizedNotes));
};

export const addNote = async (title: string, content: string): Promise<Note> => {
  const validation = validateNoteInput(title, content);

  if (!validation.isValid) {
    throw new Error(validation.message);
  }

  const notes = await getNotes();
  const now = Date.now();
  const sanitized = sanitizeNoteInput(title, content);
  const newNote: Note = {
    id: createUniqueId(notes),
    title: sanitized.title,
    content: sanitized.content,
    createdAt: now,
    updatedAt: now,
  };

  await saveNotes([newNote, ...notes]);
  return newNote;
};

export const updateNote = async (
  noteId: string,
  title: string,
  content: string,
): Promise<Note | null> => {
  const validation = validateNoteInput(title, content);

  if (!validation.isValid) {
    throw new Error(validation.message);
  }

  const notes = await getNotes();
  const targetNote = notes.find(note => note.id === noteId);

  if (!targetNote) {
    return null;
  }

  const sanitized = sanitizeNoteInput(title, content);
  const updatedNote: Note = {
    ...targetNote,
    title: sanitized.title,
    content: sanitized.content,
    updatedAt: Date.now(),
  };

  const updatedNotes = notes.map(note => (note.id === noteId ? updatedNote : note));
  await saveNotes(updatedNotes);
  return updatedNote;
};

export const deleteAllNotesForDebug = async (): Promise<void> => {
  await AsyncStorage.removeItem(NOTES_STORAGE_KEY);
};
