import './App.css';
import FileInput from './File-input';
import TextPane from './TextPane';
import RepetitionsTable from './Repetitions'

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <FileInput/>
      </header>
      <div className="table">
        <RepetitionsTable/>
      </div>
      <div className="editor">
        <TextPane/>
      </div>
    </div>
  );
}

export default App;
