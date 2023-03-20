import './App.css';
import NotesList from 'src/components/note/NotesList';
import OpenModalButton from 'src/components/OpenModalButton';
import { useState } from 'react';
import { Note } from 'src/types/NoteType';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);

  const addNote = (note: Note) => {
    setNotes([...notes, note]);
  };

  return (
    <div className="container mx-auto">
      <OpenModalButton addNote={addNote} />

      <NotesList notes={notes} />
    </div>
  );
};

export default App;
