import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

// http://www.websocket.org/echo.html
const wsUri = "ws://127.0.0.1/";
const websocket = new WebSocket(wsUri);

function App() {
  const [message, setMessage] = useState('');
  const [output, setOutput] = useState<unknown[]>([]);

  websocket.onopen = (e) => {
    writeToScreen("CONNECTED");
    doSend("WebSocket rocks");
  };

  websocket.onclose = (e) => {
    writeToScreen("DISCONNECTED");
  };

  websocket.onmessage = (e) => {
    writeToScreen(`<span>RESPONSE: ${e.data}</span>`);
  };

  websocket.onerror = (e) => {
    writeToScreen(`<span class="error">ERROR:</span> ${e}`);
  };

  function doSend(message: string) {
    writeToScreen(`SENT: ${message}`);
    websocket.send(message);
  }

  function writeToScreen(message: string) {
    setOutput([...output, message]);
  }

  function onClickButton() {
    const text = message;
    text && doSend(text);
    setMessage('');
  }
  

  return (
    <div className="App">
      <h2>WebSocket Test</h2>
      <textarea cols={60} rows={6} value={message} onChange={(e) => setMessage(e.target.value)}></textarea>
      <button onClick={onClickButton}>send</button>
      <div id="output">
        {output.map((item, index) => <p key={index}>{JSON.stringify(item)}</p>)}
      </div>
    </div>
  )
}

export default App
