import { Note } from 'src/types/NoteType';
import { Action } from 'src/types/ActionType';

export enum NoteActionType {
  SET_NOTES = 'SET_NOTES',
  ADD_NOTES = 'ADD_NOTES',
  EDIT_NOTES = 'EDIT_NOTES',
  SET_LOADING = 'SET_LOADING',
}

export interface NoteState {
  notes: Note[];
  isLoading: boolean;
}

export const initialState: NoteState = {
  notes: [],
  isLoading: true,
};

const noteReducer = (state: NoteState, action: Action<NoteActionType>) => {
  switch (action.type) {
    case NoteActionType.SET_NOTES:
      return {
        ...state,
        notes: action.payload,
        isLoading: false,
      };
    case NoteActionType.ADD_NOTES:
      return {
        ...state,
        notes: [action.payload, ...state.notes],
      };
    case NoteActionType.EDIT_NOTES:
      return {
        ...state,
        notes: [
          action.payload,
          ...state.notes.filter((note) => note.id !== action.payload.id),
        ],
      };
    case NoteActionType.SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    default:
      return state;
  }
};

export default noteReducer;
