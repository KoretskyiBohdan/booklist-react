import { ModalProvider } from 'components/Modal';
import Books from 'components/Books';

function App() {
  return (
    <div className="App">
      <ModalProvider>
        <Books />
      </ModalProvider>
    </div>
  );
}

export default App;
