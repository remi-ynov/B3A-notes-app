import React, { FormEvent, useState } from 'react';
import { Note } from 'src/types/NoteType';
import Button from 'src/components/Button';
import { useNavigate } from 'react-router-dom';
import useNote from 'src/hooks/useNote';

interface Props {
  note?: Note;
}

const NoteForm: React.FC<Props> = ({ note }) => {
  const [title, setTitle] = useState(note ? note.title : '');
  const [content, setContent] = useState(note ? note.content : '');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { createNote, editNote } = useNote();

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      setLoading(true);

      // MODE EDITION
      if (note && note.id) {
        await editNote(note.id, title, content);
      } else {
        await createNote(title, content);
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
