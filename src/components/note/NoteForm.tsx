import React, { FormEvent, useContext, useState } from 'react';
import {
  addDoc, collection, CollectionReference, getDoc,
} from 'firebase/firestore';
import { db } from 'src/config/firebase';
import { Note } from 'src/types/NoteType';
import Button from 'src/components/Button';
import { NoteContext } from 'src/components/providers/NotesProvider';
import { NoteActionType } from 'src/reducers/noteReducer';

interface Props {
  setShow: (value: boolean) => void
}

const NoteForm: React.FC<Props> = ({ setShow }) => {
  const [, dispatch] = useContext(NoteContext);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);
      const docRef = await addDoc<Note>(collection(db, 'notes') as CollectionReference<Note>, {
        title,
        content,
        created_at: new Date(),
      });

      const doc = await getDoc(docRef);
      const data = doc.data();

      if (data) {
        dispatch({
          type: NoteActionType.ADD_NOTES,
          payload: {
            ...data,
            id: docRef.id,
          },
        });
      }

      setTitle('');
      setContent('');
      setShow(false);
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

export default NoteForm;
