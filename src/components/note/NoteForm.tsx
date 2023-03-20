import React, { FormEvent, useState } from 'react';
import {
  collection, addDoc, getDoc, CollectionReference,
} from 'firebase/firestore';
import { db } from 'src/config/firebase';
import { Note } from 'src/types/NoteType';
import Button from 'src/components/Button';

interface Props {
  setShow: (value: boolean) => void
  addNote: (note: Note) => void;
}

const NoteForm: React.FC<Props> = ({ setShow, addNote }) => {
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
        addNote({
          ...data,
          id: docRef.id,
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
