import {Container} from '@mui/material';
import Board from './components/Board/board';
import Result from './components/Result/result';
import { createContext, useState } from 'react';


export const ResultContext = createContext(null);
export const RemainsContext = createContext(null);

function App() {
  const [result, setResult] = useState([]);
  return (
    <Container sx={{
      maxWidth: 'md',
      height: '100vh',
      p: 3,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between'
    }}>
      <ResultContext.Provider value={result}>
          <Board refreshResult={setResult} />
          <Result refreshResult={setResult}/>
      </ResultContext.Provider>
    </Container>
  );
}

export default App;
