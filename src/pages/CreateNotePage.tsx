import React from 'react';
import NoteForm from 'src/components/note/NoteForm';

interface Props {

}

const CreateNotePage: React.FC<Props> = (props) => (
  <>
    <p>CREATE NOTE</p>

    <NoteForm />
  </>
);

export default CreateNotePage;
