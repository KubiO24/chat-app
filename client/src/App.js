import './App.css';
import io from 'socket.io-client'

let socket;
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    socket = io.connect('http://localhost:3001')
} else {
    socket = io('/');
}


function App() {
  return (
    <div className="App">
        Hello World!
    </div>
  );
}

export default App;
