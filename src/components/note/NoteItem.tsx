import React from 'react';
import { Note } from 'src/types/NoteType';
import { Link } from 'react-router-dom';

interface Props {
  note: Note;
}

const NoteItem: React.FC<Props> = (props) => {
  const { note } = props;

  return (
    <div className="shadow-md rounded bg-gradient-to-br from-amber-200 to-amber-300 p-4 text-gray-700 h-60 flex flex-col justify-between">
      <div>
        <div className="text-2xl font-bold">
          <Link to={`/note/${note.id}`}>
            {note.title}
          </Link>
        </div>
        <p className="max-h-36 overflow-auto">{note.content}</p>
      </div>
    </div>
  );
};

export default NoteItem;
