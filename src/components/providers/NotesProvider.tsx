import React, {
  createContext, PropsWithChildren, useReducer, Dispatch,
} from 'react';
import noteReducer, { initialState, NoteActionType, NoteState } from 'src/reducers/noteReducer';
import { Action } from 'src/types/ActionType';

export const NoteContext = createContext<[NoteState, Dispatch<Action<NoteActionType>>]>([
  initialState,
  () => null,
]);

const NotesProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = useReducer(noteReducer, initialState);

  return (
    <NoteContext.Provider value={[state, dispatch]}>
      {children}
    </NoteContext.Provider>
  );
};

export default NotesProvider;
