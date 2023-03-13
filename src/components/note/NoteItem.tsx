import React from 'react';
import { Note } from 'src/types/NoteType';

interface Props {
  note: Note;
}

const NoteItem: React.FC<Props> = (props) => {
  const { note } = props;

  return (
    <div>
        <div>{note.title}</div>
        <p>{note.content}</p>
    </div>
  );
};

export default NoteItem;