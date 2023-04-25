import {
  addDoc, collection, CollectionReference, doc, getDoc, getDocs, updateDoc,
} from 'firebase/firestore';
import { db } from 'src/config/firebase';
import { Note } from 'src/types/NoteType';
import { NoteActionType } from 'src/reducers/noteReducer';
import { useContext } from 'react';
import { NoteContext } from 'src/components/providers/NotesProvider';

const useNote = () => {
  const [, dispatch] = useContext(NoteContext);

  const createNote = async (title: string, content: string) => {
    const docRef = await addDoc<Note>(collection(db, 'notes') as CollectionReference<Note>, {
      title,
      content,
      created_at: new Date(),
    });

    const noteDoc = await getDoc(docRef);
    const data = noteDoc.data();

    if (data) {
      dispatch({
        type: NoteActionType.ADD_NOTES,
        payload: {
          ...data,
          id: docRef.id,
        },
      });
    }
  };

  const editNote = async (noteId: string, title: string, content: string) => {
    const noteRef = doc(db, 'notes', noteId);

    await updateDoc(noteRef, {
      title,
      content,
    });

    const noteDoc = await getDoc(noteRef);
    const data = noteDoc.data();

    if (data) {
      dispatch({
        type: NoteActionType.EDIT_NOTES,
        payload: {
          ...data,
          id: noteRef.id,
        },
      });
    }
  };

  const getNotes = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'notes') as CollectionReference<Note>);

      const docs = querySnapshot.docs.map((document) => ({
        id: document.id,
        ...document.data(),
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

  return {
    createNote,
    editNote,
    getNotes,
  };
};

export default useNote;
