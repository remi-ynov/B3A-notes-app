import './App.css';
import { collection, CollectionReference, getDocs } from 'firebase/firestore';
import { useContext, useEffect } from 'react';
import { Note } from 'src/types/NoteType';
import { db } from 'src/config/firebase';
import { NoteContext } from 'src/components/providers/NotesProvider';
import { NoteActionType } from 'src/reducers/noteReducer';
import Loading, { LoadingColor } from 'src/components/Loading';
import { RouterProvider } from 'react-router-dom';
import router from 'src/config/router';

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

  if (state.isLoading) {
    return <Loading color={LoadingColor.PURPLE} />;
  }

  return (
    <div className="container mx-auto">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
