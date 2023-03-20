import './App.css';
import { collection, CollectionReference, getDocs } from 'firebase/firestore';
import NotesList from 'src/components/note/NotesList';
import OpenModalButton from 'src/components/OpenModalButton';
import { useEffect, useState } from 'react';
import { Note } from 'src/types/NoteType';
import { db } from 'src/config/firebase';

const App = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);

  const getNotes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'notes') as CollectionReference<Note>);

      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setNotes(docs);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Avec une fonction asynchrone
    getNotes();

    // Avec un then/catch

    // getDocs(collection(db, 'notes') as CollectionReference<Note>)
    //   .then((querySnapshot) => {
    //     const docs = querySnapshot.docs.map((doc) => ({
    //       id: doc.id,
    //       ...doc.data(),
    //     }));
    //
    //     setNotes(docs);
    //   })
    //   .catch((error) => console.error(error))
    //   .finally(() => setLoading(false));
  }, []);

  const addNote = (note: Note) => {
    setNotes([...notes, note]);
  };

  return (
    <div className="container mx-auto">
      <OpenModalButton addNote={addNote} />

      {loading
        ? <div>Chargement...</div>
        : <NotesList notes={notes} />}
    </div>
  );
};

export default App;
