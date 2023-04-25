import './App.css';
import { useContext, useEffect } from 'react';
import { NoteContext } from 'src/components/providers/NotesProvider';
import Loading, { LoadingColor } from 'src/components/Loading';
import { RouterProvider } from 'react-router-dom';
import router from 'src/config/router';
import useNote from 'src/hooks/useNote';

const App = () => {
  const [state] = useContext(NoteContext);
  const { getNotes } = useNote();

  useEffect(() => {
    getNotes();
  }, []);

  if (state.isLoading) {
    return <Loading color={LoadingColor.PURPLE} />;
  }

  return (
    <div className="container mx-auto">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
