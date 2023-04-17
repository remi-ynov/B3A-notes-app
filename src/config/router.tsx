import { createBrowserRouter } from 'react-router-dom';
import NotesListPage from 'src/pages/NotesListPage';
import CreateNotePage from 'src/pages/CreateNotePage';
import EditNotePage from 'src/pages/EditNotePage';
import NoteLayout from 'src/components/layout/NoteLayout';

const router = createBrowserRouter([
  {
    path: '/',
    element: <NotesListPage />,
  },
  {
    path: '/note',
    element: <NoteLayout />,
    children: [
      {
        path: 'new',
        element: <CreateNotePage />,
      },
      {
        path: ':id',
        element: <EditNotePage />,
      },
    ],
  },
]);

export default router;
