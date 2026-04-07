import type {Note} from './Note';

export type NoteStackParamList = {
  NoteWorkbench: undefined;
  AddNote: undefined;
  EditNote: {
    noteId: string;
    note?: Note;
  };
};
