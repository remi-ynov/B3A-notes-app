import React from 'react';
import { Link, Outlet } from 'react-router-dom';

interface Props {

}

const NoteLayout: React.FC<Props> = (props) => (
  <div>
    <Link to="/">RETOUR</Link>
    <p>NOTE LAYOUT</p>

    <div>
      <Outlet />
    </div>
  </div>
);

export default NoteLayout;
