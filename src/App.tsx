import './App.css'
import NotesList from 'src/components/note/NotesList';
import Button from 'src/components/Button';

const App = () => {
  return (
    <div className="App">
      <Button />
      <NotesList />
    </div>
  )
}

export default App;
