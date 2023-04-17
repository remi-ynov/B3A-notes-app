import React, { FormEvent, useContext, useState } from 'react';
import {
  addDoc, collection, CollectionReference, getDoc, doc, updateDoc,
} from 'firebase/firestore';
import { db } from 'src/config/firebase';
import { Note } from 'src/types/NoteType';
import Button from 'src/components/Button';
import { NoteContext } from 'src/components/providers/NotesProvider';
import { NoteActionType } from 'src/reducers/noteReducer';
import { useNavigate } from 'react-router-dom';

interface Props {
  note?: Note;
}

const NoteForm: React.FC<Props> = ({ note }) => {
  const [, dispatch] = useContext(NoteContext);
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      // MODE EDITION
      if (note && note.id) {
        const noteRef = doc(db, 'notes', note.id);

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
      } else {
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
      }

      setTitle('');
      setContent('');

      navigate('/');
    } catch (e) {
      console.error('Error adding document: ', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={onSubmit} className="flex flex-col">
      <label htmlFor="title">TITRE</label>
      <input
        type="text"
        id="title"
        name="title"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        className="border-2 border-black mb-2 p-2"
      />

      <label htmlFor="content">CONTENU</label>
      <textarea
        name="content"
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="border-2 border-black mb-2 p-2"
      />

      <Button
        type="submit"
        onClick={() => null}
        text={loading ? 'Chargement...' : 'Ajouter'}
        disabled={loading}
      />
    </form>
  );
};

NoteForm.defaultProps = {
  note: undefined,
};

export default NoteForm;
