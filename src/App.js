import NameFinderHistoryContextProvider from './context/NameFinderHistoryContext';
import NameFinder from './Components/NameFinder';
import './App.css';

function App() {
  
  return (
    <div className="App">
      <header className="App-header">
        <p>
          React Name Finder
        </p>
        <div className="app-info">
          <p>Type and search for names with axios from gorest.co</p>
          <p>Type a letter and get the first matching result</p>
          <p>Type FAIL for trigger error boundary fallback component</p>
        </div>
      </header>
        <NameFinderHistoryContextProvider>
          <NameFinder />
        </NameFinderHistoryContextProvider>
    </div>
  );
}

export default App;
