//import './App.css';
import FileInput from './File-input';
import TextPane from './TextPane';
import RepetitionsTable from './Repetitions';
import './styles.css';

function App() {

  return (
    <div className="App">
      <div className="App-header">
        <FileInput/>
      </div>
      <div className="table">
        <RepetitionsTable/>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-sm-10">
            <div className="editor">
              <TextPane/>
            </div>
          </div>
          <div class="col-sm-2">
            <p>Sed ut perspiciatis...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
