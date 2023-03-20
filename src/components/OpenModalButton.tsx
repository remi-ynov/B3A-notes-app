import React, { useState } from 'react';
import Button from 'src/components/Button';
import Modal from 'src/components/Modal';
import NoteForm from 'src/components/note/NoteForm';
import { Note } from 'src/types/NoteType';

interface Props {
  addNote: (note: Note) => void;
}

const OpenModalButton: React.FC<Props> = ({ addNote }) => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShow(true)}
        text="Créer une note"
      />

      <Modal show={show} setShow={setShow}>
        <NoteForm setShow={setShow} addNote={addNote} />
      </Modal>
    </>
  );
};

export default OpenModalButton;
