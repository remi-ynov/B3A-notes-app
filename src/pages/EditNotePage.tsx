import React, { useContext } from 'react';
import NoteForm from 'src/components/note/NoteForm';
import { useParams } from 'react-router-dom';
import { NoteContext } from 'src/components/providers/NotesProvider';

interface Props {

}

const EditNotePage: React.FC<Props> = (props) => {
  const { id } = useParams<{ id: string }>();
  const [state, dispatch] = useContext(NoteContext);
  const note = state.notes.find((n) => n.id === id);

  return (
    <>
      <p>EDIT NOTE</p>

      {note === undefined
        ? <p>Note introuvable</p>
        : <NoteForm note={note} />}
    </>
  );
};

export default EditNotePage;
