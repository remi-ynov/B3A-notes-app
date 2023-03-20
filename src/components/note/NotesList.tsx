import React from 'react';
import NoteItem from 'src/components/note/NoteItem';
import { Note } from 'src/types/NoteType';

interface Props {
  notes: Note[]
}

const NotesList: React.FC<Props> = ({ notes }) => (
  <div className="grid grid-cols-3 gap-4 my-4">
    {notes.map(
      (item) => <NoteItem note={item} key={item.id} />,
    )}
  </div>
);

export default NotesList;
