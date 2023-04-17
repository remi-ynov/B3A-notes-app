import React from 'react';
import NotesList from 'src/components/note/NotesList';
import { Link } from 'react-router-dom';

interface Props {

}

const NotesListPage: React.FC<Props> = (props) => (
  <>
    <Link to="/note/new">Créer une nouvelle note</Link>

    <NotesList />
  </>
);

export default NotesListPage;
