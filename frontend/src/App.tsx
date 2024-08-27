import {useEffect} from 'react';
import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import WebSocketService from './services/websocketSerice';
import * as Component from './components/index'

const App: React.FC = () => {

  useEffect(() => {
    const ws = new WebSocketService('ws://localhost:3000');

    return () => {
      ws.closeConnection();
    }
  }, []);


  return (
    <div className='page-container'>
      <Component.Header />
      <Component.TaskList />
    </div>
  );
}

export default App;
