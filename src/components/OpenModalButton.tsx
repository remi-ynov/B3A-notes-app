import React, { useState } from 'react';
import Button from 'src/components/Button';
import Modal from 'src/components/Modal';
import NoteForm from 'src/components/note/NoteForm';

const OpenModalButton: React.FC = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <Button
        onClick={() => setShow(true)}
        text="Créer une note"
      />

      {/* <Modal show={show} setShow={setShow}> */}
      {/*  <NoteForm setShow={setShow} /> */}
      {/* </Modal> */}
    </>
  );
};

export default OpenModalButton;
