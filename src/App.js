import {Container} from '@mui/material';
import Board from './components/Board/board';
import Result from './components/Result/result';
import { createContext, useState } from 'react';
import Header from './components/Header/header';

export const ResultContext = createContext(null);

function App() {

  const [result, setResult] = useState([]);
  const [activeTab, setActiveTab] = useState('calculator');

  const tabs = ['calculator', 'wall', 'result'];

  return (
    <>
    <Header tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab}/>
    <Container sx={{
      maxWidth: 'md',
      height: '100vh',
      p: 3,
      pt: 9,
      display: 'flex',
      flexDirection: 'column',
      gap: 2
    }}>
      <ResultContext.Provider value={result}>
          {
            activeTab === 'calculator' && <Board refreshResult={setResult} />
          }
          {
            activeTab === 'wall' && <p>Wall</p>
          }
          {
            activeTab === 'result' && <Result refreshResult={setResult}/>
          }
      </ResultContext.Provider>
    </Container>
    </>
    
  );
}

export default App;
