import './App.css';
import { collection, CollectionReference, getDocs } from 'firebase/firestore';
import NotesList from 'src/components/note/NotesList';
import OpenModalButton from 'src/components/OpenModalButton';
import { useContext, useEffect } from 'react';
import { Note } from 'src/types/NoteType';
import { db } from 'src/config/firebase';
import { NoteContext } from 'src/components/providers/NotesProvider';
import { NoteActionType } from 'src/reducers/noteReducer';

const App = () => {
  const [state, dispatch] = useContext(NoteContext);

  const getNotes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'notes') as CollectionReference<Note>);

      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      dispatch({
        type: NoteActionType.SET_NOTES,
        payload: docs,
      });
    } catch (error) {
      console.error(error);
      dispatch({
        type: NoteActionType.SET_LOADING,
        payload: false,
      });
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

  return (
    <div className="container mx-auto">
      <OpenModalButton />

      {state.isLoading
        ? <div>Chargement...</div>
        : <NotesList notes={state.notes} />}
    </div>
  );
};

export default App;
