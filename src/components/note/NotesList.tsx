import React, { useContext } from 'react';
import NoteItem from 'src/components/note/NoteItem';
import { NoteContext } from 'src/components/providers/NotesProvider';

const NotesList: React.FC = () => {
  const [state] = useContext(NoteContext);

  return (
    <div className="grid grid-cols-3 gap-4 my-4">
      {state.notes.map(
        (item) => <NoteItem note={item} key={item.id} />,
      )}
    </div>
  );
};

export default NotesList;
