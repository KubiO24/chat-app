import { useRecoilValue } from 'recoil';  
import { usernameState } from './globalState';
import { socket } from './socketConnection';
import SignIn from './SignIn';
import Main from './Chat';
import './App.css'

function App() {
    const username = useRecoilValue(usernameState);

    return (
        <> {username == '' ? <SignIn /> : <Main />} </>
    );
}

export default App;
