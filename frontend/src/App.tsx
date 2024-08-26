import {useEffect} from 'react';
import "./App.css";
import WebSocketService from './services/websocketSerice';
import * as Comp from './components/index'

const App: React.FC = () => {

  useEffect(() => {
    const ws = new WebSocketService('ws://localhost:3000');

    return () => {
      ws.closeConnection();
    }
  }, []);


  return (
    <div>
      <Comp.TaskList />
    </div>
  );
}

export default App;
