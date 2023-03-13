import React from 'react';
import NoteItem from 'src/components/note/NoteItem';
import { Note } from 'src/types/NoteType';

const data: Note[] = [
  {
    id: 1,
    title: 'TEST 1',
    content: 'Content 1',
  },
  {
    id: 2,
    title: 'TEST 2',
    content: 'Content 2',
  },
  {
    id: 3,
    title: 'TEST 3',
    content: 'Content 3',
  },
  {
    id: 4,
    title: 'TEST 4',
    content: 'Content 4',
  }
]

const NotesList: React.FC = () => {
  return (
    <div>
        {data.map(
          (item) => <NoteItem note={item} key={item.id} />
        )}
    </div>
  );
};

export default NotesList;